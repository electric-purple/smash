<script lang="ts">
	import { Canvas } from '@threlte/core'
	import { Debug, World, CollisionGroups } from '@threlte/rapier'
	import { HTML } from '@threlte/extras'
	import { current } from '$stores/level';

	import Ground from     '$components/+common/Ground.svelte';
	import LevelDebug from '$components/Debug.svelte';
	import type { ComponentType } from "svelte";


	interface Scenes {
	  // Promise is for the dynamic import (ie. "await")
		// Record is b/c ES modules export key / value pairs, while 'default' is the one of interest, here (afaik it's how Svelte exports its components)
		// ComponentType is the known type of the Svelte component format
		[key: number]: () => Promise<Record<'default', ComponentType>>;
	}

	const scenes: Scenes = {
    0: () => import('./Scene2.svelte'),
		1: () => import('./Scene2.svelte'), // just re-import the same scene for now.
		2: () => import('./Scene2.svelte'), // ... prob a better way to handle this, but leaving
		                           // this way here / commented for now, for ref
	};
</script>

<!-- ### -->

<LevelDebug />

{#await scenes[$current]() then module}
	<svelte:component this={module.default}/>
{/await}


