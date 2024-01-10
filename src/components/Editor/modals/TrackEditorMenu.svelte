<script lang="ts">
	import { createEventDispatcher } from 'svelte'
	import TopBarLayout from  '$components/layout/TopBarLayout.svelte';
	import Card from          '$components/+UI/components/Card.svelte';
	import BlurryCard from    '$components/+UI/components/BlurryCard.svelte';
	import Button from '$components/+UI/components/Button.svelte';

	import SaveTrack from '../UI/SaveTrack.svelte'
	import StartTrackValidation from '../UI/StartTrackValidation.svelte'
	import TrackDetails from '../UI/TrackDetails.svelte'

	const dispatch = createEventDispatcher<{
		close: undefined
	}>()
</script>

	<!-- Prevent user interaction on canvas -->
	<div class="absolute top-0 left-0 w-full h-full pointer-events-auto" />

	<TopBarLayout>
		<Button
			slot="topbar-left"
			on:click={() => {
				dispatch('close')
			}}
		>
			CLOSE
		</Button>

		<Button slot="topbar-right" href="/menu/main">Main Menu</Button>

		<BlurryCard class="h-full grid grid-cols-2 gap-[15px]">
			<Card class="flex flex-col gap-[15px]">
				<div class="font-headline">Track details</div>
				<TrackDetails />
			</Card>

			<Card class="flex flex-col gap-[15px]">
				<div class="font-headline">TRACK VALIDATION</div>
				<div class="text-[0.8em]">
					A track must be validated before it can be played. To validate a track, it must be
					completed from start to finish.
				</div>
				<StartTrackValidation />
			</Card>

			<Card class="flex flex-col gap-[15px]">
				<div class="font-headline">Track export</div>
				<div class="text-[0.8em]">Share your track with your friends.</div>
				<SaveTrack />
			</Card>
		</BlurryCard>
	</TopBarLayout>
