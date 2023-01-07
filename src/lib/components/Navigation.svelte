<script>
	import { page } from '$app/stores';

	export let isOpen = false;
</script>


<nav class:isOpen={isOpen}>
	<ul>
		<li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
			<a href="/">Home</a>
		</li>
		<li aria-current={$page.url.pathname === '/smash' ? 'page' : undefined}>
			<a href="/smash">smash</a>
		</li>
		<li aria-current={$page.url.pathname.startsWith('/about') ? 'page' : undefined}>
			<a href="/about">about</a>
		</li>
	</ul>
</nav>


<style>
	nav {
		background-color: hsl(var(--gray-9-hsl) / 30%);
		width: var(--size-14);
		height: 100vh;
		padding: var(--size-7) var(--size-2);
		position: absolute;
		/* left: 0; */
		display: flex;
		flex-direction: column;
		justify-content: center;

    animation: var(--animation-slide-out-left) forwards;
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
		animation: var(--animation-slide-in-right) forwards;
	}
</style>
