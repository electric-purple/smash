<script lang="ts">
	import DomPortal from '$components/+utils/DomPortal.svelte'
</script>

<DomPortal target="#portal-target">
	<slot />
</DomPortal>
