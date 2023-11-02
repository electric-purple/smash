import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
// import type { UserConfig } from 'vite';

// const config: UserConfig = {
export default defineConfig({
	plugins: [
		sveltekit()
	],

	ssr: {
    noExternal: ['three']
	}
});

// export default config;
