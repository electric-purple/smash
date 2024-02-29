<script lang="ts">
	import Editor from '$components/Editor/Editor.svelte'

	export let data: { trackData: any };
</script>

<!-- ### -->

<!-- this goes into the (default) slot in /routes/+layout.svelte -->
<Editor trackData={data.trackData} />
