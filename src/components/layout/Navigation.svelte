<script>
	import { page } from '$app/stores';

	let isOpen = false;
</script>

<!-- ### -->

<button on:click={() => isOpen = !isOpen}>
	<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
		<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
	</svg>
</button>

<nav class:isOpen={isOpen}>
	<ul>
		<li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
			<a href="/">Home</a>
		</li>
		<li aria-current={$page.url.pathname.startsWith('/about') ? 'page' : undefined}>
			<a href="/about">about</a>
		</li>
		<li aria-current={$page.url.pathname === '/smash' ? 'page' : undefined}>
			<a href="/smash">smash</a>
		</li>
		<li aria-current={$page.url.pathname.startsWith('/editor') ? 'page' : undefined}>
			<a href="/smash/editor">EDIT</a>
		</li>
		<li aria-current={$page.url.pathname.startsWith('/editor') ? 'page' : undefined}>
			<a href="/smash/level/1">LEVEL</a>
		</li>
	</ul>
</nav>

<!-- ### -->

<style>
	button {
		padding: var(--size-2);
		/* z-index: var(--layer-important); */
		/* position: relative; */
		position: fixed;
		right: 0;
		top:0;
		z-index: var(--layer-5);
	}

	svg {
		width: var(--size-5);
		height: var(--size-5);
	}

	nav {
		background-color: hsl(var(--gray-9-hsl) / 30%);
		width: var(--size-14);
		height: 100vh;
		padding: var(--size-7) var(--size-2);
		position: absolute;
		/* left: 0; */
		right: 0;
		top: 0;
		display: flex;
		flex-direction: column;
		justify-content: center;

    animation: var(--animation-slide-out-right) forwards;
	}

	ul {
		padding: 0;
		/* display: flex; */
		/* justify-content: center; */
		list-style: none;
	}

	li {
		padding: 0 1em;
	}

	.isOpen {
		animation: var(--animation-slide-in-left) forwards;
	}
</style>
