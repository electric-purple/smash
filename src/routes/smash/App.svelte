<script lang="ts">
	import { Canvas } from '@threlte/core'
	import { Debug, World } from '@threlte/rapier'
	import { HTML } from '@threlte/extras'
	import { current } from '$stores/level';
	import type { ComponentType } from "svelte";

	interface Scenes {
	  // Promise is for the dynamic import (ie. "await")
		// Record is b/c ES modules export key / value pairs, while 'default' is the one of interest, here (afaik it's how Svelte exports its components)
		// ComponentType is the known type of the Svelte component format
		[key: number]: () => Promise<Record<'default', ComponentType>>;
	}

	const scenes: Scenes = {
		0: () => import('./Scene.svelte'),
		1: () => import('./Scene2.svelte'),
		2: () => import('./Scene3.svelte')
	};

	// import { useTweakpane } from '$lib/utils/gui'
	// const { pane, action } = useTweakpane()
	// pane.addBlade({
	// 	view: 'text',
	// 	text: 'Use the arrow keys to move around',
	// 	lineCount: 3
	// })

// const json = scene.toJSON();
// const scene = new THREE.ObjectLoader().parse( json );

</script>

<!-- "DAT.GUI" -->
<!-- <div use:action /> -->
<Canvas>
	<World>
		<Debug depthTest={false} depthWrite={false} />

		{#await scenes[$current]() then module}
			<svelte:component this={module.default}/>
		{/await}

		<HTML slot="fallback" transform>
			<p>
				It seems your browser<br />
				doesn't support WASM.<br />
				I'm sorry.
			</p>
		</HTML>
	</World>
</Canvas>

