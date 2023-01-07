<!-- THIS IS THE LAYOUT FOR '/' -->
<!-- IT _MIGHT_ ALSO BE INHERITED BY OTHER ROUTES ...?  -->

<script>
	import Header from '$lib/components/Header.svelte';
	import '../app.css';
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
