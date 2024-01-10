
<div class="flex flex-col relative gap-[15px]   cover">
	<div class="flex flex-row items-start">  <!-- relative w-full top-0 left-0 -->
		<div class="xxx justify-start">
			<slot name="topbar-left" />
		</div>

		<div class="xxx justify-end">
			<slot name="topbar-right" />
		</div>
	</div>

	<!-- <div class="relative w-full h-full min-h-0"> -->
		<!-- where everythig thats not a named slot goes: -->
		<slot />
	<!-- </div> -->
</div>

<style>
	.xxx {
		display: flex;
		flex-direction: row;
		/* flex-1 flex flex-row */
	}
</style>