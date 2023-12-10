import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {

	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter(),
		alias: {
			$components: './src/lib/components',
			$stores: './src/stores',
			$hooks: './src/hooks',
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
