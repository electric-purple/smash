import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite'
// import preprocess from 'svelte-preprocess'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [
		vitePreprocess(),
		// preprocess({
		// 	postcss: true
		// })
	],

  ssr: {
    noExternal: ['three']
  },

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
