import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';
import unoCSS from 'unocss/vite';

export default defineConfig({
	plugins: [unoCSS(), sveltekit()],
	ssr: {
    noExternal: ['three']
	}
});
