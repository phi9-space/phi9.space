import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";

const prettyCodeOptions = {
	theme: {
		dark: "github-dark-dimmed",
		light: "github-light",
	},
	keepBackground: false,
};

export default defineConfig({
	site: "https://phi9.space",
	integrations: [
		tailwind({
			applyBaseStyles: false,
		}),
		react(),
		sitemap(),
	],
	markdown: {
		remarkPlugins: [remarkGfm],
		rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]],
	},
});
