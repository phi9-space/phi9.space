#!/usr/bin/env node
/**
 * Sync datasets from HuggingFace Hub to local vault
 * Usage: npm run sync:hf or node scripts/sync-from-hf.mjs
 */

import { HfHub, listDatasets, listModels } from "@huggingface/hub";
import fs from "fs/promises";
import yaml from "js-yaml";
import path from "path";

const HF_ORG = "phi-9";
const VAULT_DIR = "./src/content/vault";
const MANIFEST_PATH = "./src/generated/vault-manifest.json";

// HF Dataset metadata to vault frontmatter mapping
function mapHfToVault(hfDataset) {
	const { id, author, tags, downloads, likes, lastModified, cardData } = hfDataset;

	// Parse phi-9 card data if available
	const phi9Data = cardData?.phi9 || {};

	return {
		title: cardData?.title || id.split("/")[1],
		description: cardData?.description || hfDataset.description || "",
		publish: true,
		type: "dataset",
		category: "datasets",
		datasetKind: "model-card",
		tags: [
			"dataset",
			...(tags || []),
			...(phi9Data.domain ? [phi9Data.domain] : []),
			...(phi9Data.taskType ? [phi9Data.taskType] : []),
		],
		status: phi9Data.status || "published",
		featured: phi9Data.featured || false,
		slug: id.split("/")[1],
		hfRepoId: id,
		hfDownloads: downloads || 0,
		hfLikes: likes || 0,
		hfLastModified: lastModified,
		access: phi9Data.access || "public", // public | request | private
		tier: phi9Data.tier || 2,
		domain: phi9Data.domain || "tabletop",
		taskType: phi9Data.taskType || "pick-place",
		episodes: phi9Data.episodes,
		totalHours: phi9Data.totalHours,
		formats: phi9Data.formats || ["lerobot", "hdf5"],
		date: new Date().toISOString(),
		updated: lastModified || new Date().toISOString(),
		aliases: [],
		sourcePath: `${id.split("/")[1]}.md`,
	};
}

// Generate vault markdown from HF dataset
function generateVaultMarkdown(hfDataset, cardContent) {
	const vaultData = mapHfToVault(hfDataset);

	const frontmatter = yaml.dump(vaultData, {
		lineWidth: -1,
		quotingType: '"',
	});

	// Add HF attribution and link at top
	const hfHeader = `> **HuggingFace Dataset**: [${hfDataset.id}](https://huggingface.co/datasets/${hfDataset.id})
> - ⬇️ ${hfDataset.downloads?.toLocaleString() || 0} downloads
> - ❤️ ${hfDataset.likes || 0} likes
> - 🔄 Last updated: ${new Date(hfDataset.lastModified).toLocaleDateString()}

`;

	// Use HF card content or create placeholder
	const body = cardContent || generatePlaceholderContent(vaultData);

	return `---\n${frontmatter}---\n\n${hfHeader}${body}`;
}

function generatePlaceholderContent(data) {
	return `# ${data.title}

## Overview

${data.description}

## Data Card

| Attribute | Value |
|-----------|-------|
| **Dataset ID** | ${data.hfRepoId} |
| **Fidelity Tier** | ${data.tier} |
| **Domain** | ${data.domain} |
| **Task Type** | ${data.taskType} |
| **Access** | ${data.access === "public" ? "Public" : "Request Access"} |

## Files

This dataset is available on HuggingFace Hub.

## Usage

### Loading with LeRobot

\`\`\`python
from lerobot.datasets import LeRobotDataset

dataset = LeRobotDataset(
    repo_id="${data.hfRepoId}",
    root="./data"
)
\`\`\`

${
	data.access === "request"
		? `
## Access

This dataset requires approval. [Request access on HuggingFace →](https://huggingface.co/datasets/${data.hfRepoId})
`
		: ""
}

---
*Synced from HuggingFace Hub* | [View on HF →](https://huggingface.co/datasets/${data.hfRepoId})
`;
}

async function syncFromHF() {
	console.log("🔍 Fetching datasets from HuggingFace Hub...");
	console.log(`   Organization: ${HF_ORG}`);

	try {
		// List all datasets from phi-9 org
		const datasets = [];
		for await (const dataset of listDatasets({
			search: { owner: HF_ORG },
		})) {
			datasets.push(dataset);
		}

		console.log(`✅ Found ${datasets.length} datasets`);

		// Process each dataset
		const syncedSlugs = [];

		for (const dataset of datasets) {
			const slug = dataset.id.split("/")[1];
			console.log(`\n📦 Processing: ${dataset.id}`);

			try {
				// Try to fetch the README/model card
				let cardContent = "";
				try {
					const response = await fetch(
						`https://huggingface.co/datasets/${dataset.id}/raw/main/README.md`,
					);
					if (response.ok) {
						cardContent = await response.text();
					}
				} catch (e) {
					console.log(`   ⚠️ Could not fetch README for ${dataset.id}`);
				}

				// Generate vault markdown
				const vaultMarkdown = generateVaultMarkdown(dataset, cardContent);

				// Write to vault
				const vaultPath = path.join(VAULT_DIR, `${slug}.md`);
				await fs.writeFile(vaultPath, vaultMarkdown, "utf-8");

				console.log(`   ✓ Synced to ${vaultPath}`);
				syncedSlugs.push(slug);
			} catch (error) {
				console.error(`   ✗ Error processing ${dataset.id}:`, error.message);
			}
		}

		console.log(`\n🎉 Sync complete! Updated ${syncedSlugs.length} datasets.`);
		console.log("\nNext steps:");
		console.log("  1. Review synced files in src/content/vault/");
		console.log("  2. Run: npm run build (to regenerate manifest)");
		console.log("  3. Preview changes: npm run dev");

		return syncedSlugs;
	} catch (error) {
		console.error("❌ Sync failed:", error.message);
		process.exit(1);
	}
}

// Run sync
syncFromHF();
