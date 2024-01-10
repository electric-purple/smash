<div clss="tooltip">
	<slot />
</div>

<style>
		/* class="hidden group-hover:flex absolute pr-[10px] left-0 top-0 -translate-x-full text-orange font-mono text-[0.6em] leading-[1em] h-full items-center w-auto whitespace-nowrap" */

	div {
		display: none;
		position: absolute;
		padding-right: 10px;
		left: 0;
		top: 0;
		transform: translateX(100%);
		color: orange;
		height: 100%;
		/* group-hover:flex  ... items-center w-auto whitespace-nowrap" */
	}


</style>