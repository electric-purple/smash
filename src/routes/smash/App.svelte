<script lang="ts">
	import { Canvas } from '@threlte/core'
	import { Debug, World } from '@threlte/rapier'
	import { HTML } from '@threlte/extras'
	import { current } from '$stores/level';
	import type { ComponentType } from "svelte";

  // const load: Promise<ComponentType> = async (x: string) => (await import(x)).default;
	// const scenes = [
	// 	{
	// 		load: async () => (await import('./Scene.svelte')).default,
	// 		thing: () => load('./Scene.svelte')
	// 	},
	// 	{
	// 		// ...,
	// 	}
	// ];



  // const load = async (name: string) => (await import(name)).default;
	// const scenes = {
	// 	() => load('./Scene.svelte'),
	// 	() => load('./Scene2.svelte'),
	// 	() => load('./Scene3.svelte'),
	// ];
	// let scene = scenes[$current];


	interface Scenes {
		[key: number]: () => Promise<ComponentType>;
	}
	// interface Scenes {};
	const scenes: Scenes = {
		0: () => import('./Scene.svelte'),
		1: () => import('./Scene2.svelte'),
		2: () => import('./Scene3.svelte')
	};
	// let curren: string = 'a';


	// import { useTweakpane } from '$lib/utils/gui'
	// const { pane, action } = useTweakpane()
	// pane.addBlade({
	// 	view: 'text',
	// 	text: 'Use the arrow keys to move around',
	// 	lineCount: 3
	// })


	// const x = Scene.toJSON();
</script>

<!-- "DAT.GUI" -->
<!-- <div use:action /> -->
<Canvas>
	<World>
		<Debug depthTest={false} depthWrite={false} />

		{#await scenes[$current]() then module}
			<svelte:component this={module.default}/>
		{/await}

		<!-- {#if $current == 0 }
		<Scene>
		{:else if $current == 1 }
		<Scene2 />
		{:else if $current == 2 }
		<Scene3 />
		{/if } -->

		<HTML slot="fallback" transform>
			<p>
				It seems your browser<br />
				doesn't support WASM.<br />
				I'm sorry.
			</p>
		</HTML>
	</World>
</Canvas>

