<script>
	import Navigation from './Navigation.svelte';
	import Debug from './Debug.svelte';

	$:isOpen = false;
</script>


<header>
	<button on:click={() => isOpen = !isOpen}>
		<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
		</svg>
	</button>

	<Navigation {isOpen} />
	<Debug />

</header>


<style>
	header {
		position: absolute;
		z-index: var(--layer-5);
	}

	button {
		padding: var(--size-4);
		/* margin-left: auto; */
		 /* focus:outline-none" */
		z-index: var(--layer-important);
	}

	svg {
		width: var(--size-8);
		height: var(--size-8);
		/* object-fit: contain; */
	}
</style>
