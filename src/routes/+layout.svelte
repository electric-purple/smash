<!-- THIS IS THE LAYOUT FOR '/' -->
<!-- IT'S INHERITED BY OTHER ROUTES -->

<script lang="ts">
	import Navigation from '$components/layout/Navigation.svelte';
	import '$src/app.css';
</script>


<!-- ############################################################# -->


<header>
	<Navigation />
	<slot name="xxxx" />
</header>

<main class="cover">
	<!-- <slot name="canvas" /> -->
	<slot />
</main>

<div class="portal cover" id="portal-target">
	<slot name="ui" />
</div>


<!-- ############################################################# -->


<style>
	header {
		position: absolute;
		z-index: var(--layer-5);
	}
</style>
