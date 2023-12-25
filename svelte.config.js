// I _think_ this is req'd to deal with TS classes
// import preprocess from 'svelte-preprocess';

import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {

	// https://kit.svelte.dev/docs/integrations#preprocessors
	// preprocess: [vitePreprocess()],
	preprocess: [
		vitePreprocess(),
		// preprocess({ postcss: true })
	],

  onwarn: (warning, handler) => {
    if (warning.code.startsWith('a11y-')) return;
    handler(warning);
  },

	kit: {
		adapter: adapter(),
		alias: {
			$components: './src/components',
			$stores: './src/stores',
			$lib: './src/lib',
			$src: './src'
		},

		files: {
			// assets: "static",
			// lib: "src/lib",
		},
	}
};

export default config;
