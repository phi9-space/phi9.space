import fs from "node:fs";
import path from "node:path";
import { visit } from "unist-util-visit";

const manifestFilePath = path.resolve(process.cwd(), "src/generated/vault-manifest.json");

function slugifyHeading(heading) {
	return heading
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9\s-]/g, "")
		.replace(/\s+/g, "-")
		.replace(/-+/g, "-")
		.replace(/^-|-$/g, "");
}

function normalize(input) {
	return String(input || "")
		.toLowerCase()
		.trim()
		.replace(/\.(md|markdown)$/i, "")
		.replace(/[_-]+/g, " ")
		.replace(/\s+/g, " ");
}

function parseWiki(content) {
	const [left, right] = content.split("|");
	const rawTarget = (left || "").trim();
	const label = (right || "").trim();
	const hashIndex = rawTarget.indexOf("#");
	const target = hashIndex >= 0 ? rawTarget.slice(0, hashIndex).trim() : rawTarget;
	const heading = hashIndex >= 0 ? rawTarget.slice(hashIndex + 1).trim() : "";
	return {
		target,
		heading,
		label,
	};
}

function safeEmbed(url) {
	try {
		const parsed = new URL(url);
		const host = parsed.hostname.toLowerCase();
		if (["youtube.com", "www.youtube.com", "youtu.be"].includes(host)) {
			let videoId = parsed.searchParams.get("v");
			if (!videoId) {
				const parts = parsed.pathname.split("/").filter(Boolean);
				videoId = parts.at(-1) || null;
			}
			if (!videoId) return null;
			return `<div class="external-embed"><iframe src="https://www.youtube.com/embed/${videoId}" title="Embedded video" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>`;
		}
		if (["vimeo.com", "www.vimeo.com", "player.vimeo.com"].includes(host)) {
			const parts = parsed.pathname.split("/").filter(Boolean);
			const videoId = [...parts].reverse().find((part) => /^\d+$/.test(part));
			if (!videoId) return null;
			return `<div class="external-embed"><iframe src="https://player.vimeo.com/video/${videoId}" title="Embedded video" loading="lazy" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe></div>`;
		}
		return null;
	} catch {
		return null;
	}
}

function loadManifest() {
	try {
		const raw = fs.readFileSync(manifestFilePath, "utf8");
		return JSON.parse(raw);
	} catch {
		return { nodes: [] };
	}
}

export default function remarkObsidian() {
	const manifest = loadManifest();
	const nodeByKey = new Map();
	for (const node of manifest.nodes || []) {
		nodeByKey.set(normalize(node.slug), node);
		nodeByKey.set(normalize(node.title), node);
	}

	return (tree) => {
		visit(tree, "text", (node, index, parent) => {
			if (!parent || typeof index !== "number") return;
			if (!/\[\[[^\]]+\]\]/.test(node.value)) return;

			const pieces = [];
			let cursor = 0;
			const regex = /(!)?\[\[([^\]]+)\]\]/g;
			for (const match of node.value.matchAll(regex)) {
				const [full, isEmbed, content] = match;
				const start = match.index || 0;
				if (start > cursor) {
					pieces.push({ type: "text", value: node.value.slice(cursor, start) });
				}
				const parsed = parseWiki(content);
				const label = parsed.label || parsed.heading || parsed.target || "link";
				if (isEmbed) {
					if (/^https?:\/\//i.test(parsed.target)) {
						const embed = safeEmbed(parsed.target);
						pieces.push({
							type: "html",
							value: embed || '<div class="embed-blocked">Blocked external embed.</div>',
						});
					} else {
						pieces.push({
							type: "html",
							value: `<span class="wikilink wikilink--unresolved">${label}</span>`,
						});
					}
				} else if (!parsed.target && parsed.heading) {
					pieces.push({
						type: "link",
						url: `#${slugifyHeading(parsed.heading)}`,
						children: [{ type: "text", value: label }],
					});
				} else {
					const resolved = nodeByKey.get(normalize(parsed.target));
					if (resolved) {
						const hash = parsed.heading ? `#${slugifyHeading(parsed.heading)}` : "";
						const baseUrl = typeof resolved.url === "string" ? resolved.url : `/vault/${resolved.slug}/`;
						pieces.push({
							type: "link",
							url: `${baseUrl}${hash}`,
							children: [{ type: "text", value: label }],
						});
					} else {
						pieces.push({
							type: "html",
							value: `<span class="wikilink wikilink--unresolved">${label}</span>`,
						});
					}
				}
				cursor = start + full.length;
			}
			if (cursor < node.value.length) {
				pieces.push({ type: "text", value: node.value.slice(cursor) });
			}
			parent.children.splice(index, 1, ...pieces);
			return index + pieces.length;
		});

		visit(tree, "html", (node) => {
			if (!/<iframe[\s\S]*?<\/iframe>/i.test(node.value)) return;
			const srcMatch = node.value.match(/src=["']([^"']+)["']/i);
			if (!srcMatch) {
				node.value = '<div class="embed-blocked">Blocked iframe embed.</div>';
				return;
			}
			const embed = safeEmbed(srcMatch[1]);
			node.value = embed || '<div class="embed-blocked">Blocked iframe embed (allowed: YouTube, Vimeo).</div>';
		});
	};
}
