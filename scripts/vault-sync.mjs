import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

async function loadEnvFile(filePath) {
	try {
		const raw = await fs.readFile(filePath, "utf8");
		const lines = raw.split(/\r?\n/);
		for (const line of lines) {
			const trimmed = line.trim();
			if (!trimmed || trimmed.startsWith("#")) continue;
			const envLine = trimmed.startsWith("export ") ? trimmed.slice(7).trim() : trimmed;
			const separatorIndex = envLine.indexOf("=");
			if (separatorIndex <= 0) continue;

			const key = envLine.slice(0, separatorIndex).trim();
			if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(key)) continue;
			if (process.env[key] !== undefined) continue;

			let value = envLine.slice(separatorIndex + 1).trim();
			if (
				(value.startsWith('"') && value.endsWith('"')) ||
				(value.startsWith("'") && value.endsWith("'"))
			) {
				value = value.slice(1, -1);
			}
			process.env[key] = value.replace(/\\n/g, "\n");
		}
	} catch (error) {
		if (error?.code === "ENOENT") {
			return;
		}
		throw error;
	}
}

const repoRoot = process.cwd();
await loadEnvFile(path.join(repoRoot, ".env"));
await loadEnvFile(path.join(repoRoot, ".env.local"));
const vaultPath = process.env.PHI9_VAULT_PATH
	? path.resolve(process.env.PHI9_VAULT_PATH)
	: path.resolve(repoRoot, ".vault");
const vaultNotesDir = path.join(vaultPath, "5 - Full Notes");
const outputNotesDir = path.join(repoRoot, "src/content/vault");
const outputMediaDir = path.join(repoRoot, "public/vault-media");
const outputGeneratedDir = path.join(repoRoot, "src/generated");
const manifestPath = path.join(outputGeneratedDir, "vault-manifest.json");

const IMAGE_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".gif", ".webp", ".svg", ".avif"]);
const VIDEO_EXTENSIONS = new Set([".mp4", ".webm", ".mov", ".m4v", ".ogg"]);
const DOCUMENT_EXTENSIONS = new Set([".pdf"]);
const NOTE_EXTENSIONS = new Set([".md", ".markdown"]);
const ALLOWED_STATUS = new Set(["draft", "review", "published"]);
const ALLOWED_TYPES = new Set(["note", "dataset", "product"]);
const ALLOWED_DATASET_KIND = new Set(["model-card", "catalog", "other"]);

function toPosix(input) {
	return input.split(path.sep).join("/");
}

function slugifySegment(input) {
	return input
		.toLowerCase()
		.trim()
		.replace(/\.(md|markdown)$/i, "")
		.replace(/&/g, " and ")
		.replace(/[^a-z0-9\s-]/g, "")
		.replace(/\s+/g, "-")
		.replace(/-+/g, "-")
		.replace(/^-|-$/g, "");
}

function sanitizeSlug(rawSlug, fallback = "note") {
	const cleaned = String(rawSlug || "")
		.trim()
		.replace(/^\/+|\/+$/g, "");
	const segments = cleaned
		.split(/[\\/]/)
		.map((segment) => slugifySegment(segment))
		.filter(Boolean);
	if (segments.length === 0) {
		return slugifySegment(fallback) || "note";
	}
	return segments.join("/");
}

function slugifyHeading(heading) {
	return heading
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9\s-]/g, "")
		.replace(/\s+/g, "-")
		.replace(/-+/g, "-")
		.replace(/^-|-$/g, "");
}

function normalizeLookupKey(input) {
	return String(input || "")
		.trim()
		.toLowerCase()
		.replace(/\.(md|markdown)$/i, "")
		.replace(/[_-]+/g, " ")
		.replace(/\s+/g, " ");
}

function parseDate(input) {
	if (!input) return undefined;
	const date = new Date(input);
	if (Number.isNaN(date.valueOf())) return undefined;
	return date.toISOString();
}

function asStringArray(input) {
	if (Array.isArray(input)) {
		return input.map((item) => String(item)).filter(Boolean);
	}
	if (typeof input === "string") {
		return input
			.split(",")
			.map((item) => item.trim())
			.filter(Boolean);
	}
	return [];
}

function firstHeadingFromBody(body) {
	const match = body.match(/^\s*#\s+(.+)$/m);
	return match ? match[1].trim() : undefined;
}

function extractFirstParagraph(body) {
	const withoutCode = body.replace(/```[\s\S]*?```/g, "");
	const blocks = withoutCode
		.split(/\n\s*\n/)
		.map((block) => block.trim())
		.filter(Boolean);

	for (const block of blocks) {
		if (/^(#|>|-|\*|\d+\.|\|)/.test(block)) continue;
		const clean = block
			.replace(/!\[[^\]]*\]\([^\)]*\)/g, "")
			.replace(/\[[^\]]+\]\([^\)]*\)/g, "$1")
			.replace(/[*_`>#-]/g, "")
			.replace(/\s+/g, " ")
			.trim();
		if (clean.length > 0) {
			return clean.slice(0, 220);
		}
	}

	return "";
}

function parseWikiLink(content) {
	const pipeIndex = content.indexOf("|");
	const rawTarget = pipeIndex >= 0 ? content.slice(0, pipeIndex).trim() : content.trim();
	const rawLabel = pipeIndex >= 0 ? content.slice(pipeIndex + 1).trim() : "";
	const hashIndex = rawTarget.indexOf("#");
	const target = hashIndex >= 0 ? rawTarget.slice(0, hashIndex).trim() : rawTarget;
	const heading = hashIndex >= 0 ? rawTarget.slice(hashIndex + 1).trim() : "";
	return {
		target,
		heading,
		label: rawLabel,
		rawTarget,
	};
}

function isUrl(input) {
	return /^https?:\/\//i.test(input || "");
}

function getExtension(input) {
	return path.extname(String(input || "").split("?")[0].split("#")[0]).toLowerCase();
}

function isMediaReference(target) {
	const extension = getExtension(target);
	return (
		IMAGE_EXTENSIONS.has(extension) ||
		VIDEO_EXTENSIONS.has(extension) ||
		DOCUMENT_EXTENSIONS.has(extension)
	);
}

function isSafeEmbedUrl(inputUrl) {
	try {
		const url = new URL(inputUrl);
		const host = url.hostname.toLowerCase();
		return (
			host === "youtube.com" ||
			host === "www.youtube.com" ||
			host === "youtu.be" ||
			host === "vimeo.com" ||
			host === "www.vimeo.com" ||
			host === "player.vimeo.com"
		);
	} catch {
		return false;
	}
}

function extractYouTubeId(inputUrl) {
	try {
		const url = new URL(inputUrl);
		if (url.hostname.includes("youtu.be")) {
			return url.pathname.split("/").filter(Boolean)[0] || null;
		}
		if (url.searchParams.get("v")) {
			return url.searchParams.get("v");
		}
		const parts = url.pathname.split("/").filter(Boolean);
		const embedIndex = parts.findIndex((part) => part === "embed");
		if (embedIndex >= 0 && parts[embedIndex + 1]) {
			return parts[embedIndex + 1];
		}
		return null;
	} catch {
		return null;
	}
}

function extractVimeoId(inputUrl) {
	try {
		const url = new URL(inputUrl);
		const segments = url.pathname.split("/").filter(Boolean);
		const candidate = segments.reverse().find((segment) => /^\d+$/.test(segment));
		return candidate || null;
	} catch {
		return null;
	}
}

function embedHtmlFromUrl(inputUrl) {
	if (!isSafeEmbedUrl(inputUrl)) {
		return null;
	}
	if (/youtu\.be|youtube\.com/i.test(inputUrl)) {
		const id = extractYouTubeId(inputUrl);
		if (!id) return null;
		return `<div class="external-embed"><iframe src="https://www.youtube.com/embed/${id}" title="Embedded video" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>`;
	}
	if (/vimeo\.com/i.test(inputUrl)) {
		const id = extractVimeoId(inputUrl);
		if (!id) return null;
		return `<div class="external-embed"><iframe src="https://player.vimeo.com/video/${id}" title="Embedded video" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe></div>`;
	}
	return null;
}

function markdownEscape(input) {
	return String(input).replace(/[\[\]()`*_]/g, "\\$&");
}

function htmlEscape(input) {
	return String(input)
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#39;");
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
	const entries = await fs.readdir(startDir, { withFileTypes: true });
	const files = [];
	for (const entry of entries) {
		const absolutePath = path.join(startDir, entry.name);
		if (entry.isDirectory()) {
			files.push(...(await walkMarkdownFiles(absolutePath)));
			continue;
		}
		if (entry.isFile() && NOTE_EXTENSIONS.has(path.extname(entry.name).toLowerCase())) {
			files.push(absolutePath);
		}
	}
	return files;
}

function buildLookup(notes) {
	const byKey = new Map();
	const bySlug = new Map();

	for (const note of notes) {
		bySlug.set(note.slug, note);
		const candidates = new Set([
			note.title,
			note.slug,
			note.baseName,
			note.relativeNoExt,
			path.basename(note.slug),
			...note.aliases,
		]);
		for (const candidate of candidates) {
			const key = normalizeLookupKey(candidate);
			if (!key) continue;
			if (!byKey.has(key)) {
				byKey.set(key, []);
			}
			byKey.get(key).push(note);
		}
	}

	return { byKey, bySlug };
}

function resolveNoteTarget(target, currentNote, lookup) {
	if (!target && currentNote) {
		return { status: "published", note: currentNote };
	}

	const cleaned = String(target || "").trim();
	const normalizedKey = normalizeLookupKey(cleaned);
	const directSlug = sanitizeSlug(cleaned || "", cleaned || "note");
	const byDirectSlug = lookup.bySlug.get(directSlug);
	if (byDirectSlug) {
		return byDirectSlug.publish
			? { status: "published", note: byDirectSlug }
			: { status: "private", note: byDirectSlug };
	}

	const candidates = lookup.byKey.get(normalizedKey) || [];
	if (candidates.length === 0) {
		return { status: "missing" };
	}
	if (candidates.length === 1) {
		const [note] = candidates;
		return note.publish ? { status: "published", note } : { status: "private", note };
	}
	const published = candidates.filter((candidate) => candidate.publish);
	if (published.length === 1) {
		return { status: "published", note: published[0] };
	}
	return { status: "ambiguous" };
}

async function replaceAsync(input, regex, replace) {
	const matches = Array.from(input.matchAll(regex));
	if (matches.length === 0) {
		return input;
	}
	let cursor = 0;
	let output = "";
	for (const match of matches) {
		const matchIndex = match.index ?? 0;
		output += input.slice(cursor, matchIndex);
		output += await replace(...match);
		cursor = matchIndex + match[0].length;
	}
	output += input.slice(cursor);
	return output;
}

function uniqueBy(items, keyFn) {
	const seen = new Set();
	const result = [];
	for (const item of items) {
		const key = keyFn(item);
		if (seen.has(key)) continue;
		seen.add(key);
		result.push(item);
	}
	return result;
}

function noteCanonicalUrl(note) {
	if (note.type === "dataset") {
		return `/datasets/${note.slug}/`;
	}
	return `/vault/${note.slug}/`;
}

async function main() {
	if (!(await pathExists(vaultNotesDir))) {
		throw new Error(
			`Vault folder not found at ${vaultNotesDir}. Set PHI9_VAULT_PATH or add a .vault symlink in repo root.`,
		);
	}

	const markdownFiles = await walkMarkdownFiles(vaultNotesDir);
	const notes = [];

	for (const filePath of markdownFiles) {
		const raw = await fs.readFile(filePath, "utf8");
		const parsed = matter(raw);
		const relativePath = toPosix(path.relative(vaultNotesDir, filePath));
		const relativeNoExt = relativePath.replace(/\.(md|markdown)$/i, "");
		const baseName = path.basename(filePath).replace(/\.(md|markdown)$/i, "");
		const fallbackTitle = firstHeadingFromBody(parsed.content) || baseName;
		const title = typeof parsed.data.title === "string" && parsed.data.title.trim()
			? parsed.data.title.trim()
			: fallbackTitle;
		const description =
			typeof parsed.data.description === "string" && parsed.data.description.trim()
				? parsed.data.description.trim()
				: extractFirstParagraph(parsed.content);
		const slugSource =
			typeof parsed.data.slug === "string" && parsed.data.slug.trim()
				? parsed.data.slug
				: relativeNoExt;
		const slug = sanitizeSlug(slugSource, baseName);
		const aliases = asStringArray(parsed.data.aliases);
		const tags = asStringArray(parsed.data.tags);
		const rawType =
			typeof parsed.data.type === "string" ? parsed.data.type.trim().toLowerCase() : "";
		const type = ALLOWED_TYPES.has(rawType) ? rawType : "";
		const rawDatasetKind =
			typeof parsed.data.datasetKind === "string"
				? parsed.data.datasetKind.trim().toLowerCase()
				: "";
		const datasetKind = ALLOWED_DATASET_KIND.has(rawDatasetKind)
			? rawDatasetKind
			: type === "dataset"
				? "catalog"
				: "other";
		const rawStatus =
			typeof parsed.data.status === "string" ? parsed.data.status.trim().toLowerCase() : "";
		const status = ALLOWED_STATUS.has(rawStatus)
			? rawStatus
			: parsed.data.publish === true
				? "published"
				: "draft";
		const note = {
			filePath,
			relativePath,
			relativeNoExt,
			baseName,
			data: parsed.data,
			body: parsed.content,
			title,
			description,
			slug,
			publish: parsed.data.publish === true,
			type,
			category: typeof parsed.data.category === "string" ? parsed.data.category.trim() : "",
			datasetKind,
			tags,
			aliases,
			status,
			featured: parsed.data.featured === true,
			series: typeof parsed.data.series === "string" ? parsed.data.series.trim() : "",
			date: parseDate(parsed.data.date),
			updated: parseDate(parsed.data.updated),
			cover: typeof parsed.data.cover === "string" ? parsed.data.cover.trim() : "",
			video: typeof parsed.data.video === "string" ? parsed.data.video.trim() : "",
		};
		notes.push(note);
	}

	const published = notes.filter((note) => note.publish);
	const slugToNotes = new Map();
	for (const note of published) {
		if (!slugToNotes.has(note.slug)) {
			slugToNotes.set(note.slug, []);
		}
		slugToNotes.get(note.slug).push(note);
	}
	const duplicates = Array.from(slugToNotes.entries()).filter(([, entries]) => entries.length > 1);
	if (duplicates.length > 0) {
		const detail = duplicates
			.map(
				([slug, entries]) =>
					`${slug}: ${entries.map((entry) => entry.relativePath).join(", ")}`,
			)
			.join("\n");
		throw new Error(`Duplicate published slugs detected:\n${detail}`);
	}

	for (const note of published) {
		if (!ALLOWED_TYPES.has(note.type)) {
			throw new Error(`Published note ${note.relativePath} must set type to note, dataset, or product.`);
		}
		if (!note.category) {
			throw new Error(`Published note ${note.relativePath} must set category.`);
		}
		if (note.type === "dataset" && !ALLOWED_DATASET_KIND.has(note.datasetKind)) {
			throw new Error(
				`Published dataset ${note.relativePath} has invalid datasetKind (${note.datasetKind}).`,
			);
		}
	}

	const lookup = buildLookup(notes);
	const copiedAssets = new Map();
	const warnings = [];

	async function copyAsset(reference, fromFile) {
		const cleanReference = String(reference || "").trim();
		if (!cleanReference) return null;

		const localCandidatePaths = [];
		if (cleanReference.startsWith("/")) {
			localCandidatePaths.push(path.resolve(vaultPath, cleanReference.slice(1)));
		} else {
			localCandidatePaths.push(path.resolve(path.dirname(fromFile), cleanReference));
			localCandidatePaths.push(path.resolve(vaultPath, cleanReference));
		}

		let sourcePath = null;
		for (const candidate of localCandidatePaths) {
			if (await pathExists(candidate)) {
				sourcePath = candidate;
				break;
			}
		}
		if (!sourcePath) {
			return null;
		}

		const existing = copiedAssets.get(sourcePath);
		if (existing) {
			return existing;
		}

		const relativeToVault = toPosix(path.relative(vaultPath, sourcePath));
		if (relativeToVault.startsWith("..")) {
			return null;
		}

		const destinationPath = path.join(outputMediaDir, relativeToVault);
		await fs.mkdir(path.dirname(destinationPath), { recursive: true });
		await fs.copyFile(sourcePath, destinationPath);
		const urlPath =
			"/vault-media/" + relativeToVault.split("/").map((segment) => encodeURIComponent(segment)).join("/");
		const asset = {
			sourcePath,
			relativeToVault,
			urlPath,
		};
		copiedAssets.set(sourcePath, asset);
		return asset;
	}

	await fs.rm(outputNotesDir, { recursive: true, force: true });
	await fs.rm(outputMediaDir, { recursive: true, force: true });
	await fs.mkdir(outputNotesDir, { recursive: true });
	await fs.mkdir(outputMediaDir, { recursive: true });
	await fs.mkdir(outputGeneratedDir, { recursive: true });

	const nodes = [];
	const edges = [];
	const unresolved = [];

	for (const note of published) {
		let transformed = note.body.replace(/\r\n/g, "\n");

		const unresolvedForNote = [];
		const edgesForNote = [];

		if (note.cover && !isUrl(note.cover)) {
			const copied = await copyAsset(note.cover, note.filePath);
			if (copied) {
				note.cover = copied.urlPath;
			} else {
				warnings.push(`Missing cover asset: ${note.cover} in ${note.relativePath}`);
				note.cover = "";
			}
		}
		if (note.video && !isUrl(note.video)) {
			const copied = await copyAsset(note.video, note.filePath);
			if (copied) {
				note.video = copied.urlPath;
			} else {
				warnings.push(`Missing video asset: ${note.video} in ${note.relativePath}`);
				note.video = "";
			}
		}
		if (note.video && isUrl(note.video) && !isSafeEmbedUrl(note.video)) {
			warnings.push(`Blocked non-approved video URL in ${note.relativePath}: ${note.video}`);
			note.video = "";
		}

		transformed = transformed.replace(/\{\{\s*video:\s*(https?:\/\/[^\s}]+)\s*\}\}/gi, (match, url) => {
			const embed = embedHtmlFromUrl(url);
			return embed || '<div class="embed-blocked">Blocked external video provider.</div>';
		});

		transformed = transformed.replace(/<iframe[\s\S]*?<\/iframe>/gi, (iframeHtml) => {
			const srcMatch = iframeHtml.match(/src=["']([^"']+)["']/i);
			if (!srcMatch) {
				return '<div class="embed-blocked">Blocked iframe embed.</div>';
			}
			const embed = embedHtmlFromUrl(srcMatch[1]);
			if (!embed) {
				return '<div class="embed-blocked">Blocked iframe embed (allowed: YouTube, Vimeo).</div>';
			}
			return embed;
		});

		transformed = transformed.replace(/<script[\s\S]*?<\/script>/gi, "");

		transformed = await replaceAsync(transformed, /!\[\[([^\]]+)\]\]/g, async (fullMatch, inner) => {
			const parsed = parseWikiLink(inner);
			const label = parsed.label || parsed.target || parsed.heading || "embedded note";

			if (isUrl(parsed.target)) {
				const embed = embedHtmlFromUrl(parsed.target);
				if (embed) {
					return embed;
				}
				unresolvedForNote.push({
					source: note.slug,
					target: parsed.target,
					reason: "blocked-external-embed",
				});
				return `<span class="wikilink wikilink--unresolved">${htmlEscape(label)}</span>`;
			}

			if (isMediaReference(parsed.target)) {
				const copied = await copyAsset(parsed.target, note.filePath);
				if (!copied) {
					unresolvedForNote.push({
						source: note.slug,
						target: parsed.target,
						reason: "missing-asset",
					});
					return `<span class="wikilink wikilink--unresolved">${htmlEscape(label)}</span>`;
				}
				const extension = getExtension(parsed.target);
				if (IMAGE_EXTENSIONS.has(extension)) {
					return `<figure class="vault-media vault-media--image"><img src="${copied.urlPath}" alt="${htmlEscape(label)}" loading="lazy" /></figure>`;
				}
				if (VIDEO_EXTENSIONS.has(extension)) {
					return `<figure class="vault-media vault-media--video"><video controls preload="metadata" src="${copied.urlPath}"></video></figure>`;
				}
				return `<p class="vault-media vault-media--file"><a href="${copied.urlPath}" target="_blank" rel="noopener">${htmlEscape(label)}</a></p>`;
			}

			const resolved = resolveNoteTarget(parsed.target, note, lookup);
			if (resolved.status === "published" && resolved.note) {
				const targetUrl = `${noteCanonicalUrl(resolved.note)}${parsed.heading ? `#${slugifyHeading(parsed.heading)}` : ""}`;
				edgesForNote.push({
					source: note.slug,
					target: resolved.note.slug,
					relation: "wikilink",
				});
				const excerpt = htmlEscape(resolved.note.description || "");
				return `<aside class="note-embed"><p class="note-embed__title"><a href="${targetUrl}">${htmlEscape(parsed.label || resolved.note.title)}</a></p>${excerpt ? `<p class="note-embed__excerpt">${excerpt}</p>` : ""}</aside>`;
			}

			const reason =
				resolved.status === "private"
					? "private-note"
					: resolved.status === "ambiguous"
						? "ambiguous-note"
						: "missing-note";
			unresolvedForNote.push({ source: note.slug, target: parsed.target, reason });
			return `<span class="wikilink wikilink--unresolved">${htmlEscape(label)}</span>`;
		});

		transformed = await replaceAsync(transformed, /(?<!!)\[\[([^\]]+)\]\]/g, async (fullMatch, inner) => {
			const parsed = parseWikiLink(inner);
			const label = parsed.label || parsed.heading || parsed.target;

			if (!parsed.target && parsed.heading) {
				return `[${markdownEscape(label)}](#${slugifyHeading(parsed.heading)})`;
			}

			if (isMediaReference(parsed.target)) {
				const copied = await copyAsset(parsed.target, note.filePath);
				if (!copied) {
					unresolvedForNote.push({
						source: note.slug,
						target: parsed.target,
						reason: "missing-asset",
					});
					return `<span class="wikilink wikilink--unresolved">${htmlEscape(label || parsed.target)}</span>`;
				}
				return `[${markdownEscape(label || parsed.target)}](${copied.urlPath})`;
			}

			const resolved = resolveNoteTarget(parsed.target, note, lookup);
			if (resolved.status === "published" && resolved.note) {
				const href = `${noteCanonicalUrl(resolved.note)}${parsed.heading ? `#${slugifyHeading(parsed.heading)}` : ""}`;
				edgesForNote.push({
					source: note.slug,
					target: resolved.note.slug,
					relation: "wikilink",
				});
				return `[${markdownEscape(label || resolved.note.title)}](${href})`;
			}

			const reason =
				resolved.status === "private"
					? "private-note"
					: resolved.status === "ambiguous"
						? "ambiguous-note"
						: "missing-note";
			unresolvedForNote.push({ source: note.slug, target: parsed.target, reason });
			return `<span class="wikilink wikilink--unresolved">${htmlEscape(label || parsed.target)}</span>`;
		});

		const outputFilePath = path.join(outputNotesDir, `${note.slug}.md`);
		await fs.mkdir(path.dirname(outputFilePath), { recursive: true });
		const frontmatter = {
			title: note.title,
			description: note.description,
			publish: true,
			type: note.type,
			category: note.category,
			datasetKind: note.datasetKind,
			tags: note.tags,
			status: note.status,
			featured: note.featured,
			slug: note.slug,
			aliases: note.aliases,
			sourcePath: note.relativePath,
		};
		if (note.series) frontmatter.series = note.series;
		if (note.date) frontmatter.date = note.date;
		if (note.updated) frontmatter.updated = note.updated;
		if (note.cover) frontmatter.cover = note.cover;
		if (note.video) frontmatter.video = note.video;

		const serialized = matter.stringify(transformed.trim() + "\n", frontmatter);
		await fs.writeFile(outputFilePath, serialized, "utf8");

		nodes.push({
			id: note.slug,
			slug: note.slug,
			url: noteCanonicalUrl(note),
			title: note.title,
			type: note.type,
			category: note.category,
			datasetKind: note.datasetKind,
			tags: note.tags,
			status: note.status,
			featured: note.featured,
			series: note.series || null,
			updated: note.updated || note.date || null,
			excerpt: note.description,
			sourcePath: note.relativePath,
		});

		edges.push(...edgesForNote);
		unresolved.push(...unresolvedForNote);
	}

	if (published.length === 0) {
		const placeholderPath = path.join(outputNotesDir, "vault-placeholder.md");
		const placeholder = matter.stringify(
			"Vault sync placeholder file. Add `publish: true` notes in Obsidian to publish content.\n",
			{
				title: "Vault Placeholder",
				description: "Generated placeholder to keep Astro collection initialized.",
				publish: false,
				type: "note",
				category: "internal",
				datasetKind: "other",
				tags: [],
				status: "draft",
				featured: false,
				slug: "vault-placeholder",
				aliases: [],
				sourcePath: "__placeholder__",
			},
		);
		await fs.writeFile(placeholderPath, placeholder, "utf8");
	}

	const manifest = {
		generatedAt: null,
		vaultPath: null,
		nodes: uniqueBy(nodes, (node) => node.slug),
		edges: uniqueBy(edges, (edge) => `${edge.source}->${edge.target}:${edge.relation}`),
		unresolved: uniqueBy(
			unresolved,
			(item) => `${item.source}->${item.target}:${item.reason}`,
		),
	};

	await fs.writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");

	if (warnings.length > 0) {
		console.warn("[vault:sync] completed with warnings:");
		for (const warning of warnings) {
			console.warn(`- ${warning}`);
		}
	}

	console.log(
		`[vault:sync] exported ${manifest.nodes.length} note(s), ${manifest.edges.length} edge(s), ${manifest.unresolved.length} unresolved reference(s).`,
	);
}

main().catch((error) => {
	console.error(`[vault:sync] ${error.message}`);
	process.exit(1);
});
