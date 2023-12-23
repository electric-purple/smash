<script lang="ts">
	import { Canvas } from '@threlte/core'
	import { Debug, World, CollisionGroups } from '@threlte/rapier'
	import { HTML } from '@threlte/extras'
	import { current } from '$stores/level';
	import Ground from './Ground.svelte'

	import LevelDebug from '$components/Debug.svelte';
	import type { ComponentType } from "svelte";


	interface Scenes {
	  // Promise is for the dynamic import (ie. "await")
		// Record is b/c ES modules export key / value pairs, while 'default' is the one of interest, here (afaik it's how Svelte exports its components)
		// ComponentType is the known type of the Svelte component format
		[key: number]: () => Promise<Record<'default', ComponentType>>;
	}

	const scenes: Scenes = {
		0: () => import('./test'),
		// 1: () => import('./_scene1'),
		// 2: () => import('./_scene3')
		1: () => import('./test'), // just re-import the same scene for now.
		2: () => import('./test'), // ... prob a better way to handle this, but leaving
		                           // this way here / commented for now, for ref
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
<LevelDebug />

<Canvas>
	<World>
		<Debug depthTest={false} depthWrite={false} />

		{#await scenes[$current]() then module}
			<svelte:component this={module.default}/>
		{/await}

		<!--
			The ground needs to be on both group 15 which is the group
			to detect the groundedness of the player as well as on group
			0 which is the group that the player is actually physically
			interacting with.
		-->
		<CollisionGroups groups={[0, 15]}>
			<Ground />
		</CollisionGroups>


		<HTML slot="fallback" transform>
			<p>
				It seems your browser<br />
				doesn't support WASM.<br />
				I'm sorry.
			</p>
		</HTML>
	</World>
</Canvas>

