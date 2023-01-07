import { sveltekit } from '@sveltejs/kit/vite';
// import { threeMinifier } from "@yushijinhun/three-minifier-rollup";
// import prune from 'postcss-jit-props';
// import OpenProps from 'open-props';
import type { UserConfig } from 'vite';


const config: UserConfig = {

	plugins: [
		// { ...threeMinifier(), enforce: "pre" },
		sveltekit()
	],
  // css: {
  //   postcss: {
	// 		plugins: [
	// 			prune(OpenProps),
	// 		]
	// 	}
	// },

	ssr: {
		noExternal: ['three', 'troika-three-text']
	}
};

export default config;
