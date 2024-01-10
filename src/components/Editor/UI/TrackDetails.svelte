<script lang="ts">
	import TextInput from     '$components/+UI/components/TextInput.svelte';
	import Button from '$components/+UI/components/Button.svelte';
	import { useTrackEditor } from '../context'

	const { trackData } = useTrackEditor()

	let trackName = trackData.trackName.current
</script>

<div class="flex flex-row items-end text-[0.8em]">
	<TextInput
		label="Track Name"
		id="track-name"
		inputClass="!rounded-r-none !border-r-0 h-[46px]"
		preventFocusOnFocusLost
		bind:value={trackName}
	/>

	<Button
		disabled={!trackName.length}
		class="h-[46px] !rounded-l-none"
		on:click={() => {
			if (!trackName.length) return
			trackData.trackName.set(trackName)
			trackData.toLocalStorage(0)
		}}
	>
		Save
	</Button>
</div>
