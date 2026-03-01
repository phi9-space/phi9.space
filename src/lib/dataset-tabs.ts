export type DatasetTabId = "overview" | "data-card" | "files" | "metrics" | "usage" | "changelog";

export interface DatasetTab {
	id: DatasetTabId;
	label: string;
	content: string;
}

interface Section {
	heading: string;
	content: string;
}

const TAB_ORDER: Array<{ id: DatasetTabId; label: string }> = [
	{ id: "overview", label: "Overview" },
	{ id: "data-card", label: "Data Card" },
	{ id: "files", label: "Files" },
	{ id: "metrics", label: "Metrics" },
	{ id: "usage", label: "Usage" },
	{ id: "changelog", label: "Changelog" },
];

const TAB_ALIASES: Record<DatasetTabId, string[]> = {
	overview: ["overview", "summary", "intro", "introduction", "abstract"],
	"data-card": ["data card", "model card", "dataset card", "card"],
	files: ["files", "file structure", "downloads", "data files"],
	metrics: ["metrics", "benchmark", "evaluation", "quality"],
	usage: ["usage", "how to use", "getting started", "examples"],
	changelog: ["changelog", "updates", "release notes", "version history"],
};

function normalizeHeading(input: string): string {
	return input
		.toLowerCase()
		.replace(/[`*_~]/g, "")
		.replace(/\[[^\]]+\]\([^\)]+\)/g, "")
		.replace(/[^a-z0-9\s-]/g, " ")
		.replace(/\s+/g, " ")
		.trim();
}

function classifyHeading(heading: string): DatasetTabId | null {
	const normalized = normalizeHeading(heading);
	for (const { id } of TAB_ORDER) {
		for (const alias of TAB_ALIASES[id]) {
			if (normalized === alias || normalized.includes(alias)) {
				return id;
			}
		}
	}
	return null;
}

function splitSections(markdown: string): { preamble: string; sections: Section[] } {
	const lines = markdown.replace(/\r\n/g, "\n").split("\n");
	const preambleLines: string[] = [];
	const sections: Section[] = [];
	let currentHeading = "";
	let currentBody: string[] = [];

	const flushCurrentSection = () => {
		if (!currentHeading) return;
		const sectionBody = currentBody.join("\n").trim();
		const content = sectionBody.length > 0 ? `## ${currentHeading}\n\n${sectionBody}` : `## ${currentHeading}`;
		sections.push({ heading: currentHeading, content });
	};

	for (const line of lines) {
		const headingMatch = line.match(/^##\s+(.+)\s*$/);
		if (headingMatch) {
			flushCurrentSection();
			currentHeading = headingMatch[1].trim();
			currentBody = [];
			continue;
		}

		if (currentHeading) {
			currentBody.push(line);
		} else {
			preambleLines.push(line);
		}
	}

	flushCurrentSection();

	return {
		preamble: preambleLines.join("\n").trim(),
		sections,
	};
}

export function buildDatasetTabs(markdown: string): DatasetTab[] {
	const { preamble, sections } = splitSections(markdown);
	const buckets: Record<DatasetTabId, string[]> = {
		overview: [],
		"data-card": [],
		files: [],
		metrics: [],
		usage: [],
		changelog: [],
	};
	const unmappedSections: string[] = [];

	if (preamble.length > 0) {
		buckets.overview.push(preamble);
	}

	for (const section of sections) {
		const tabId = classifyHeading(section.heading);
		if (tabId) {
			buckets[tabId].push(section.content);
		} else {
			unmappedSections.push(section.content);
		}
	}

	if (unmappedSections.length > 0) {
		buckets.overview.push(...unmappedSections);
	}

	return TAB_ORDER.map(({ id, label }) => {
		const content = buckets[id]
			.map((chunk) => chunk.trim())
			.filter(Boolean)
			.join("\n\n");
		return {
			id,
			label,
			content,
		};
	}).filter((tab) => tab.content.length > 0);
}
