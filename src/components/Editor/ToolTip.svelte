
<div class="tooltip">
	<slot />
</div>

<style>
	.tooltip {
		display: none;
		font-size: 0.875rem;
		pointer-events: none;
		position: absolute;
		padding-right: 10px;
		left: 0;
		top: 0;
		/* transform: translateY(100%); */
		color: orange;
		height: 100%;
	}

	:global(button:hover) .tooltip {
		display: block;
	}
</style>