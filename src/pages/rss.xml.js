import rss from "@astrojs/rss";
import manifest from "@generated/vault-manifest.json";

export async function GET(context) {
	const items = (manifest.nodes || [])
		.filter((node) => node.type === "note")
		.slice()
		.sort((a, b) => {
			const aDate = a.updated ? new Date(a.updated) : new Date(0);
			const bDate = b.updated ? new Date(b.updated) : new Date(0);
			return bDate.valueOf() - aDate.valueOf();
		})
		.map((node) => ({
			title: node.title,
			description: node.excerpt || "",
			pubDate: node.updated ? new Date(node.updated) : new Date(),
			link: node.url,
		}));

	return rss({
		title: "phi9.space research feed",
		description: "Research notes and public lab updates from phi9.space.",
		site: context.site ?? "https://phi9.space",
		items,
	});
}
