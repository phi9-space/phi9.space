import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const repoRoot = process.cwd();
const notesDir = path.join(repoRoot, "src/content/vault");
const manifestPath = path.join(repoRoot, "src/generated/vault-manifest.json");

const CRITICAL_UNRESOLVED_REASONS = new Set(["missing-note", "missing-asset", "ambiguous-note"]);
const ALLOWED_STATUS = new Set(["draft", "review", "published"]);
const ALLOWED_TYPES = new Set(["note", "dataset", "product"]);
const ALLOWED_DATASET_KIND = new Set(["model-card", "catalog", "other"]);
const SAFE_IFRAME_HOSTS = new Set([
	"youtube.com",
	"www.youtube.com",
	"youtu.be",
	"vimeo.com",
	"www.vimeo.com",
	"player.vimeo.com",
]);

function toPosix(input) {
	return input.split(path.sep).join("/");
}

async function pathExists(inputPath) {
	try {
		await fs.access(inputPath);
		return true;
	} catch {
		return false;
	}
}

async function walkMarkdownFiles(startDir) {
	if (!(await pathExists(startDir))) {
		return [];
	}
	const entries = await fs.readdir(startDir, { withFileTypes: true });
	const files = [];
	for (const entry of entries) {
		const absolutePath = path.join(startDir, entry.name);
		if (entry.isDirectory()) {
			files.push(...(await walkMarkdownFiles(absolutePath)));
			continue;
		}
		if (entry.isFile() && /\.(md|markdown)$/i.test(entry.name)) {
			files.push(absolutePath);
		}
	}
	return files;
}

async function main() {
	if (!(await pathExists(manifestPath))) {
		throw new Error("src/generated/vault-manifest.json is missing. Run npm run vault:sync.");
	}

	const manifest = JSON.parse(await fs.readFile(manifestPath, "utf8"));
	const markdownFiles = await walkMarkdownFiles(notesDir);

	const notes = [];
	for (const filePath of markdownFiles) {
		const relativePath = toPosix(path.relative(notesDir, filePath));
		const parsed = matter(await fs.readFile(filePath, "utf8"));
		const slugFromPath = relativePath.replace(/\.(md|markdown)$/i, "");
		const slug = typeof parsed.data.slug === "string" ? parsed.data.slug : slugFromPath;
		notes.push({
			filePath,
			relativePath,
			slug,
			data: parsed.data,
			content: parsed.content,
		});
	}

	const failures = [];
	const publishableNotes = notes.filter((note) => note.data.sourcePath !== "__placeholder__");

	const slugSet = new Set();
	const slugFirstPath = new Map();
	for (const note of notes) {
		if (note.data.sourcePath === "__placeholder__") {
			if (note.data.publish !== false) {
				failures.push(`Placeholder note ${note.relativePath} must keep publish: false.`);
			}
			continue;
		}

		if (slugSet.has(note.slug)) {
			failures.push(
				`Duplicate slug in synced content: ${note.slug} (${slugFirstPath.get(note.slug)} and ${note.relativePath})`,
			);
		}
		slugSet.add(note.slug);
		if (!slugFirstPath.has(note.slug)) {
			slugFirstPath.set(note.slug, note.relativePath);
		}

		if (note.data.publish !== true) {
			failures.push(`Synced note ${note.relativePath} must keep publish: true.`);
		}
		if (!ALLOWED_TYPES.has(String(note.data.type ?? "").toLowerCase())) {
			failures.push(`Synced note ${note.relativePath} has invalid type (${note.data.type ?? "missing"}).`);
		}
		if (!ALLOWED_DATASET_KIND.has(String(note.data.datasetKind ?? "").toLowerCase())) {
			failures.push(
				`Synced note ${note.relativePath} has invalid datasetKind (${note.data.datasetKind ?? "missing"}).`,
			);
		}
		if (!ALLOWED_STATUS.has(String(note.data.status ?? "").toLowerCase())) {
			failures.push(
				`Synced note ${note.relativePath} has invalid status (${note.data.status ?? "missing"}).`,
			);
		}
		if (typeof note.data.featured !== "boolean") {
			failures.push(
				`Synced note ${note.relativePath} must set featured as boolean.`,
			);
		}
		if (!note.data.category || typeof note.data.category !== "string") {
			failures.push(`Synced note ${note.relativePath} must define category.`);
		}
		if (/\[\[[^\]]+\]\]/.test(note.content)) {
			failures.push(`Synced note ${note.relativePath} still contains raw Obsidian wikilinks.`);
		}
		const iframes = Array.from(note.content.matchAll(/<iframe[\s\S]*?<\/iframe>/gi));
		for (const iframe of iframes) {
			const srcMatch = iframe[0].match(/src=["']([^"']+)["']/i);
			if (!srcMatch) {
				failures.push(`Synced note ${note.relativePath} contains iframe without src.`);
				continue;
			}
			try {
				const srcUrl = new URL(srcMatch[1]);
				if (!SAFE_IFRAME_HOSTS.has(srcUrl.hostname.toLowerCase())) {
					failures.push(
						`Synced note ${note.relativePath} contains iframe from non-approved host: ${srcUrl.hostname}.`,
					);
				}
			} catch {
				failures.push(`Synced note ${note.relativePath} contains malformed iframe src.`);
			}
		}
	}

	const nodeSlugs = new Set((manifest.nodes || []).map((node) => node.slug));
	if (nodeSlugs.size !== publishableNotes.length) {
		failures.push(
			`Manifest node count (${nodeSlugs.size}) does not match synced note count (${publishableNotes.length}).`,
		);
	}

	for (const note of publishableNotes) {
		if (!nodeSlugs.has(note.slug)) {
			failures.push(`Manifest missing node for slug: ${note.slug}`);
		}
	}

	for (const edge of manifest.edges || []) {
		if (!slugSet.has(edge.source)) {
			failures.push(`Edge source does not exist: ${edge.source}`);
		}
		if (!slugSet.has(edge.target)) {
			failures.push(`Edge target does not exist: ${edge.target}`);
		}
		if (edge.relation !== "wikilink") {
			failures.push(`Unsupported edge relation for ${edge.source} -> ${edge.target}: ${edge.relation}`);
		}
	}

	for (const item of manifest.unresolved || []) {
		if (CRITICAL_UNRESOLVED_REASONS.has(item.reason)) {
			failures.push(
				`Critical unresolved reference (${item.reason}) in ${item.source}: ${item.target}`,
			);
		}
	}

	if (failures.length > 0) {
		console.error("[vault:check] failed:\n");
		for (const failure of failures) {
			console.error(`- ${failure}`);
		}
		process.exit(1);
	}

	console.log(
		`[vault:check] ok (${publishableNotes.length} note(s), ${(manifest.edges || []).length} edge(s), ${(manifest.unresolved || []).length} unresolved reference(s)).`,
	);
}

main().catch((error) => {
	console.error(`[vault:check] ${error.message}`);
	process.exit(1);
});
