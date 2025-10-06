import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import remarkGfm from 'remark-gfm';
import rehypePrettyCode from 'rehype-pretty-code';

const prettyCodeOptions = {
  theme: {
    dark: 'github-dark-dimmed',
    light: 'github-light'
  },
  keepBackground: false
};

export default defineConfig({
  site: 'https://phi9.space',
  integrations: [
    tailwind({
      applyBaseStyles: false
    }),
    sitemap()
  ],
  markdown: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]]
  }
});
