<!-- THIS IS THE LAYOUT FOR '/' -->
<!-- IT'S INHERITED BY OTHER ROUTES -->

<script lang="ts">
	import Navigation from '$components/layout/Navigation.svelte';
	import TrackEditorInfo from '$components/Editor/modals/TrackEditorInfo.svelte'
	import { page } from '$app/stores';
	import '$src/app.css';
</script>


<!-- ############################################################# -->


<header>
  <!-- <TrackEditorInfo /> -->
	<Navigation />
</header>

<main class="cover">
	<!-- <slot name="canvas" /> -->
	<slot />
</main>


<!--
<div class="portal cover" id="portal-target">
	<slot name="xxx" />
</div>
-->
<footer id="portal-target">
	{#if $page.data.component}
		<!-- <svelte:component this={$page.data.component} /> -->
		it's {$page.data.component}
	{:else}
		<p>$page.data.component is undefined</p>
	{/if}

  <!-- <div slot="ui"> -->
		<slot name="ui" />
	<!-- </div> -->
</footer>


<!-- ############################################################# -->


<style>
	header, footer {

		position: absolute;
		z-index: var(--layer-5);
		width: 100%;
	}

	footer {
		/* background-color: var(); */
    background-color: hsl(var(--gray-9-hsl) / 30%);
    line-height: 1;
    font-size: 22px;
    /* pointer-events: none; */

		bottom: 0;
	}

  /* .ui {
		flex: 1;
	} */
</style>
