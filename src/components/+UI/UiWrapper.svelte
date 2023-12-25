<script lang="ts">
	import DomPortal from '$components/+utils/DomPortal.svelte'
</script>

<DomPortal target="#car-ui-portal-target">
	<slot />
</DomPortal>
