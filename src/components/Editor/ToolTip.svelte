<div
	class="hidden group-hover:flex absolute pr-[10px] left-0 top-0 -translate-x-full text-orange font-mono text-[0.6em] leading-[1em] h-full items-center w-auto whitespace-nowrap"
>
	<slot />
</div>

<style>
	div {
		display: hidden;
		position: absolute;
		padding: 10px;
		left: 0;
		top: 0;
		-translate-x: full;
		color: orange;
		height: 100%;
		/* items-center w-auto whitespace-nowrap" */
	}

	div:hover {
		display: flex
	}
</style>