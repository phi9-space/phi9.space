export default {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		extend: {
			colors: {
				background: "var(--color-background)",
				surface: "var(--color-surface)",
				accent: "var(--color-accent)",
				muted: "var(--color-muted)",
				primary: "var(--color-primary)",
				border: "var(--color-border)",
			},
			fontFamily: {
				sans: ['"Paper Mono"', '"JetBrains Mono"', "ui-monospace", "SFMono-Regular", "monospace"],
				mono: ['"Paper Mono"', '"JetBrains Mono"', "ui-monospace", "SFMono-Regular", "monospace"],
			},
			maxWidth: {
				prose: "65ch",
			},
			boxShadow: {
				soft: "0 20px 35px rgba(0, 0, 0, 0.12)",
			},
		},
	},
	plugins: [],
};
