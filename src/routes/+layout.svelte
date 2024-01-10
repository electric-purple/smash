<!-- THIS IS THE LAYOUT FOR '/' -->
<!-- IT'S INHERITED BY OTHER ROUTES -->

<script lang="ts">
	import Header from '$src/components/layout/Header.svelte';
	import '$src/app.css';
</script>

<!-- ### -->

<Header />

<main class="cover">
	<!-- <slot name="canvas" /> -->
	<slot />
</main>

<div class="portal cover" id="portal-target">
	<slot name="ui" />
</div>
