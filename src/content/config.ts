import { defineCollection, z } from "astro:content";

const pages = defineCollection({
	type: "content",
	schema: z.object({
		title: z.string(),
		description: z.string().min(50),
		heroSubtitle: z.string().optional(),
		published: z.coerce.date().optional(),
		updated: z.coerce.date().optional(),
		author: z.string().optional(),
		tags: z.array(z.string()).default([]),
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

export const collections = { pages, blog };
