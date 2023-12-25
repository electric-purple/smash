<script lang="ts">
	import { Canvas } from '@threlte/core'
	import { AudioListener, Suspense, HTML } from '@threlte/extras';
  import { Debug, World, CollisionGroups } from '@threlte/rapier';

	import { page } from '$app/stores';
	import { dev } from  '$app/environment';
	import { appState } from '$stores/app';

	import Ground from             '$components/+common/Ground.svelte';
	import Renderer from           '$components/Renderer.svelte';
	import KeyboardNavigation from '$components/+UI/KeyboardNavigation.svelte';
	import LoadingUi from          '$components/+UI/LoadingUi.svelte';
	import AudioProvider from      '$components/+utils/AudioProvider.svelte';


	const { visibility, options } = appState;
	const { debug } = options;

	console.log('routes/smash/layout.svelte');

	const onVisibilityChange = () => {
		if (document.hidden || document.visibilityState === 'hidden') {
			visibility.set('hidden')
		} else {
			visibility.set('visible')
		}
	}

</script>

<svelte:window on:visibilitychange={onVisibilityChange} />


	<Canvas
		rendererParameters={{
			powerPreference: 'high-performance',
			alpha: true,
			preserveDrawingBuffer: true
		}}
	>
		<World order={-999}>
			{#if $debug}
				<Debug depthTest={false} depthWrite={false} />
			{/if}

      <Suspense final>
				<LoadingUi slot="fallback" />

				<AudioListener />
				<AudioProvider>
					<KeyboardNavigation>
            <slot />
					</KeyboardNavigation>
				</AudioProvider>
			</Suspense>

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
          I'm sorry.!!
        </p>
      </HTML>

		</World>

		<Renderer />
	</Canvas>

	<div
		class="leading-tight absolute top-0 left-0 w-full h-full z-10 text-[22px] lg:text-[26px] xl:text-[28px] 2xl:text-[30px] [&_button]:pointer-events-auto [&_a]:pointer-events-auto p-[15px] pointer-events-none select-none"
		id="car-ui-portal-target"
	/>
