<script lang="ts">
	import { Canvas } from '@threlte/core'
	import { Debug, World } from '@threlte/rapier'
	import { HTML } from '@threlte/extras'
	import { current } from '$stores/level';
	import Scene from './Scene.svelte'
	import Scene2 from './Scene2.svelte'
	import Scene3 from './Scene3.svelte'

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

		{#if $current == 0 }
		<Scene />
		{:else if $current == 1 }
		<Scene2 />
		{:else if $current == 2 }
		<Scene3 />
		{/if }

		<HTML slot="fallback" transform>
			<p>
				It seems your browser<br />
				doesn't support WASM.<br />
				I'm sorry.
			</p>
		</HTML>
	</World>
</Canvas>

