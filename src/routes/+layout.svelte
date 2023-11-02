<!-- THIS IS THE LAYOUT FOR '/' -->
<!-- IT _MIGHT_ ALSO BE INHERITED BY OTHER ROUTES ...?  -->

<script lang="ts">
	import Header from '$src/components/Header.svelte';
	import '$src/app.css';


	// import KeyboardNavigation from '$components/UI/KeyboardNavigation.svelte'
	// import AudioProvider from '$components/Utilities/AudioProvider.svelte'
	// import { appState } from '$stores/app'
	// import { Canvas } from '@threlte/core'
	// import { AudioListener, Suspense } from '@threlte/extras'
	// import { Debug, World } from '@threlte/rapier'
	// import '../app.postcss'
	// import StartPrompt from '../components/UI/StartPrompt.svelte'
	// import Renderer from '../components/Renderer.svelte'
	// import LoadingUi from '../components/UI/LoadingUi.svelte'
	// import { page } from '$app/stores'
	// import { dev } from '$app/environment'
</script>


<Header />
<main>
	<slot />
</main>


<style>
	main {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
</style>
