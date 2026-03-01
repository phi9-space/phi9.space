import { defineCollection, z } from "astro:content";

const pages = defineCollection({
	type: "content",
	schema: z.object({
		title: z.string(),
		description: z.string().min(50),
		heroSubtitle: z.string().optional(),
		updated: z.coerce.date().optional(),
		navTitle: z.string().optional(),
	}),
});

const blog = defineCollection({
	type: "content",
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		tags: z.array(z.string()).default([]),
		heroImage: z.string().optional(),
		draft: z.boolean().default(false),
		author: z.string().optional(),
	}),
});

const vault = defineCollection({
	type: "content",
	schema: z.object({
		title: z.string(),
		description: z.string().optional().default(""),
		publish: z.boolean().default(false),
		type: z.enum(["note", "dataset", "product"]),
		category: z.string(),
		datasetKind: z.enum(["model-card", "catalog", "other"]).optional().default("other"),
		tags: z.array(z.string()).default([]),
		aliases: z.array(z.string()).default([]),
		status: z.enum(["draft", "review", "published"]).optional().default("published"),
		featured: z.boolean().optional().default(false),
		series: z.string().optional(),
		date: z.coerce.date().optional(),
		updated: z.coerce.date().optional(),
		cover: z.string().optional(),
		video: z.string().optional(),
		sourcePath: z.string().optional(),
		// HuggingFace integration
		hfRepoId: z.string().optional(),
		hfDownloads: z.number().optional(),
		hfLikes: z.number().optional(),
		hfLastModified: z.string().optional(),
		access: z.enum(["public", "request", "private"]).optional().default("public"),
		tier: z.number().optional().default(2),
		domain: z.string().optional().default("tabletop"),
		taskType: z.string().optional().default("pick-place"),
		episodes: z.number().optional(),
		totalHours: z.number().optional(),
		formats: z.array(z.string()).optional(),
	}),
});

export const collections = { pages, blog, vault };
