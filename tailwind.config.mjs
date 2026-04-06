export default {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		extend: {
			colors: {
				background: "var(--color-bg)",
				surface: "var(--color-surface)",
				accent: "var(--color-accent)",
				muted: "var(--color-muted)",
				primary: "var(--color-text)",
				border: "var(--color-border)",
			},
			fontFamily: {
				heading: ["var(--font-heading)"],
				body: ["var(--font-body)"],
				mono: ["var(--font-mono)"],
			},
			maxWidth: {
				prose: "65ch",
				site: "var(--max-width)",
			},
			boxShadow: {
				sm: "var(--shadow-sm)",
				md: "var(--shadow-md)",
				lg: "var(--shadow-lg)",
			},
			borderRadius: {
				sm: "var(--radius-sm)",
				md: "var(--radius-md)",
				lg: "var(--radius-lg)",
				xl: "var(--radius-xl)",
			},
		},
	},
	plugins: [],
};
