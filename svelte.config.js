import path from 'path';
// import adapter from '@sveltejs/adapter-vercel';
import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';


/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess({
		postcss: true,
	}),

	kit: {
		adapter: adapter(),

		alias: {
			$stores: path.resolve("./src/stores"),
			$components: path.resolve("./src/lib/components"),
		},

		files: {
			// assets: "static",
			// lib: "src/lib",
		},
	}
};

export default config;
