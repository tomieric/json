import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import solid from '@astrojs/solid-js'

// https://astro.build/config
export default defineConfig({
	integrations: [
		base: '/json',
		site: 'https://tomieric.github.io',
		tailwind(),
		solid(),
	]
});
