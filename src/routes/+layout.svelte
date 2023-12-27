<!-- THIS IS THE LAYOUT FOR '/' -->
<!-- IT'S INHERITED BY OTHER ROUTES -->

<script lang="ts">
	import Header from '$src/components/layout/Header.svelte';
	import '$src/app.css';
</script>

<!-- ### -->

<Header />
<main>
	<slot />
</main>

<!-- ### -->

<style>
	main {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
</style>
