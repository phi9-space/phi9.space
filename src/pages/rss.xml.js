import { getCollection } from "astro:content";
import rss from "@astrojs/rss";

export async function GET(context) {
	const posts = await getCollection("blog", (entry) => !entry.data.draft);

	return rss({
		title: "phi9.space blog",
		description: "Dispatches from the phi9.space engineering team.",
		site: context.site ?? "https://phi9.space",
		items: posts.map((post) => ({
			title: post.data.title,
			description: post.data.description,
			pubDate: post.data.pubDate,
			link: `/blog/${post.slug}/`,
		})),
	});
}
