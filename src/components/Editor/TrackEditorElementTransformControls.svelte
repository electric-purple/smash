<script lang="ts" context="module">
	let isDraggingTimeout: ReturnType<typeof setTimeout>
</script>

<script lang="ts">
	import { T } from '@threlte/core'
	import { TransformControls } from '@threlte/extras'
	import { derived } from 'svelte/store'
	import type { Group } from 'three'
	import { useTrackEditor } from './context'
	import { onDestroy } from 'svelte'
	import type { TrackElement } from '$lib/TrackData/TrackData';
	import { useKeyDown } from '$lib/hooks/useKeyDown';
	import { useKeyUp } from '$lib/hooks/useKeyUp';

	export let trackElement: TrackElement

	const {
		currentlySelectedElement,
		trackData,
		transformMode,
		transformSpace,
		transformSnap,
		isDragging
	} = useTrackEditor()

	$: position = $currentlySelectedElement?.position
	$: rotation = $currentlySelectedElement?.rotation

	const selected = derived(currentlySelectedElement, (currentlySelectedElement) => {
		return currentlySelectedElement?.id === trackElement.id
	})

	const onChange = (ref: Group) => {
		trackData.setTrackElementPosition(trackElement.id, ref.position.toArray())
		const rotation = ref.rotation.toArray() as TrackElement['rotation']['current']
		trackData.setTrackElementRotation(trackElement.id, rotation)
	}

	let altIsDown = false
	useKeyDown('Alt', () => {
		altIsDown = true
	})
	useKeyUp('Alt', () => {
		altIsDown = false
	})

	const onMouseDown = () => {
		if (altIsDown) {
			trackData.duplicateTrackElement(trackElement.id)
		}
		clearTimeout(isDraggingTimeout)
		isDragging.set(true)
	}

	const onMouseUp = () => {
		clearTimeout(isDraggingTimeout)
		// we're delaying this a bit so that the click event on the track element selector
		// doesn't get triggered. this is a bit of a hack, but it works for now.
		isDraggingTimeout = setTimeout(() => {
			isDragging.set(false)
		}, 150)
	}
	onDestroy(() => {
		clearTimeout(isDraggingTimeout)
	})
</script>

{#if $selected && $position && $rotation}
	<T.Group position={$position} rotation={$rotation} let:ref>
		<TransformControls
			raycast={() => {
				return false
			}}
			object={ref}
			space={$transformSpace}
			mode={$transformMode}
			translationSnap={$transformSnap ? 1 : null}
			rotationSnap={$transformSnap ? (5 * Math.PI) / 180 : null}
			on:change={() => {
				onChange(ref)
			}}
			on:mouseDown={onMouseDown}
			on:mouseUp={onMouseUp}
			on:mouseDown
			on:mouseUp
		/>
	</T.Group>
{/if}
