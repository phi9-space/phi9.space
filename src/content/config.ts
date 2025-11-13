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
	}),
});

export const collections = { pages, blog };
