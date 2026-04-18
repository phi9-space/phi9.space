export interface SiteLink {
	label: string;
	href: string;
	external?: boolean;
}

export const siteBrandCopy = "Humane research institution";

export const contactEmail = "research@phi9.space";
export const contactMailto = `mailto:${contactEmail}`;

export const communityLinks = {
	discord: {
		label: "Discord",
		href: "https://discord.gg/2ErmfxmmvB",
		external: true,
	},
	github: {
		label: "GitHub",
		href: "https://github.com/phi9-space",
		external: true,
	},
	huggingFace: {
		label: "Hugging Face",
		href: "https://huggingface.co/phi-9",
		external: true,
	},
	linkedIn: {
		label: "LinkedIn",
		href: "https://www.linkedin.com/company/phi9",
		external: true,
	},
} satisfies Record<string, SiteLink>;

export const primaryNavLinks: SiteLink[] = [
	{ href: "/lab", label: "Lab" },
	{ href: "/research", label: "Research" },
	{ href: "/data", label: "Data" },
	{ href: "/manifesto", label: "Manifesto" },
];

export const utilityLinks: SiteLink[] = [
	{ href: "/about", label: "About" },
	{ href: contactMailto, label: "Get in touch" },
];

export const legalLinks: SiteLink[] = [
	{ href: "/privacy", label: "Privacy" },
	{ href: "/terms", label: "Terms" },
];

export const footerLinkGroups = [
	{ title: "Explore", links: primaryNavLinks },
	{ title: "Utility", links: utilityLinks },
	{ title: "Community", links: Object.values(communityLinks) },
	{ title: "Legal", links: legalLinks },
];

const longDateFormatter = new Intl.DateTimeFormat("en-US", {
	month: "long",
	day: "numeric",
	year: "numeric",
});

export function formatLongDate(date: Date) {
	return longDateFormatter.format(date);
}

export function getReadingTime(body: string, wordsPerMinute = 200) {
	const words = body.trim().split(/\s+/).filter(Boolean).length;
	return Math.max(1, Math.ceil(words / wordsPerMinute));
}
