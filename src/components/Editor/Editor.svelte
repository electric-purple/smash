<script lang="ts">
	import { Euler } from 'three'
	import { DEG2RAD } from 'three/src/math/MathUtils'
	import { T, currentWritable } from '@threlte/core'
	import { interactivity } from '@threlte/extras';
	import CC from 'camera-controls'; // TODO could use better / consolidated camera stuffs

	import { appState } from   '$stores/app'
	import { useKeyDown } from '$lib/hooks/useKeyDown';
	import { useKeyUp } from   '$lib/hooks/useKeyUp'
	import { useEvent } from   '$lib/hooks/useEvents';

	import Car from              '$components/RagDoll/RagDoll.svelte'; // TODO using this as a stand-in for now
	import { trackElementPrototypes } from '$components/TrackElements/elements'
	import TrackElement from     '$components/TrackViewer/TrackElement.svelte'
	import TrackElTransform from '$components/TrackViewer/TrackElementTransform.svelte'
	import TrackViewer from      '$components/TrackViewer/TrackViewer.svelte'
	import TopBarLayout from     '$components/layout/TopBarLayout.svelte'
	import Card from             '$components/+UI/components/Card.svelte'
	import Button from           '$components/+UI/components/Button.svelte'
	import Wireframe from        '$components/+common/Wireframe.svelte'
	import SolidBackground from  '$components/+common/SolidBackground.svelte'
	import CameraControls from   '$components/+utils/CameraControls/CameraControls.svelte'

	import TrackEditorElementTransformControls from './TrackEditorElementTransformControls.svelte'
	import TrackEditorElementSelection from './TrackEditorElementSelection.svelte'
	import TrackEditorElementSelector from './TrackEditorElementSelector.svelte'
	import DuplicateElement from './UI/DuplicateElement.svelte'
	import AddElement from './UI/AddOrReplaceElement.svelte'
	import ElementDetails from './UI/ElementDetails.svelte'
	import RemoveElement from './UI/RemoveElement.svelte'
	import RotateElement from './UI/RotateElement.svelte'

	import DomPortal from '$components/+utils/DomPortal.svelte'         // stupid

	import { createTrackEditorContext } from './context'
	import ToolTip from './ToolTip.svelte'


	// import type { TrackData } from './LevelData';
	// export let trackData: TrackData;
	import { TrackData } from '$src/levels/LevelData';
	export let trackData = new TrackData();

/////////////////////////////////////////////////////////////////////////////////////////////////

	const {
		currentlySelectedElement,
		transformMode,
		transformSpace,
		transformSnap,
		cameraControls,
		activeCameraControls
	} = createTrackEditorContext(trackData);

	const angles: Record<
		Exclude<typeof $editView, 'orbit'>,
		{ azimuthAngle: number; polarAngle: number }
	> = {
		'x': { azimuthAngle: 90 * DEG2RAD, polarAngle: 90 * DEG2RAD },
		'y': { azimuthAngle: 90 * DEG2RAD, polarAngle: 0 },
		'z': { azimuthAngle: 0, polarAngle: 90 * DEG2RAD },
		'x-inverse': { azimuthAngle: 270 * DEG2RAD, polarAngle: 90 * DEG2RAD },
		'y-inverse': { azimuthAngle: 90 * DEG2RAD, polarAngle: 180 * DEG2RAD },
		'z-inverse': { azimuthAngle: 180 * DEG2RAD, polarAngle: 90 * DEG2RAD }
	};


	const { visibility } = appState;
	let cameraControlsActive = true;
	let shiftState = false;
	let wireframe = false;
	let permanentSnap = false;
	let temporarySnap = false;

	const showInfo = currentWritable(false);
	const view = currentWritable<'car' | 'edit'>('edit');
	const editView = currentWritable<'orbit' | 'x' | 'x-inverse' | 'y' | 'y-inverse' | 'z' | 'z-inverse'>('orbit');
	const respawnCar = useEvent('respawn-car');
	const resetTrackViewer = useEvent('reset-track-viewer');

	$: useSnap = (permanentSnap && !temporarySnap) || (!permanentSnap && temporarySnap);
	$: transformSnap.set(useSnap)
	$: carActive = $view === 'car' && !$showInfo && $visibility === 'visible'
	$: carFrozen = $view === 'edit' || $showInfo || $visibility === 'hidden'
	$: useOrthoCam = $view === 'edit' && ['x', 'y', 'z', 'x-inverse', 'y-inverse', 'z-inverse'].includes($editView);
	$: $activeCameraControls = useOrthoCam ? $cameraControls[1] : $cameraControls[0]
	$: currentlySelectedElementType = $currentlySelectedElement?.type
	$: if ($currentlySelectedElement) setOrbitPoint($currentlySelectedElement)
	$: if ($editView !== 'orbit') setOrthoView($editView);


	interactivity();


	function setOrbitPoint(currentlySelectedElement: typeof $currentlySelectedElement) {
		$activeCameraControls?.setOrbitPoint(
			$currentlySelectedElement!.position.current[0],
			$currentlySelectedElement!.position.current[1],
			$currentlySelectedElement!.position.current[2]
		)
	}

	function setOrthoView(editView: Exclude<typeof $editView, 'orbit'>) {
		cameraControls.current[1].azimuthAngle = angles[editView].azimuthAngle
		cameraControls.current[1].polarAngle = angles[editView].polarAngle
	}

	function focusCurrentlySelectedElement() {
		if (!$activeCameraControls || !$currentlySelectedElement) return;
		$activeCameraControls.moveTo(...$currentlySelectedElement!.position.current, true)
		$activeCameraControls.dollyTo(50, true)
		$activeCameraControls.setFocalOffset(0, 0, 0, true)
	}

	function setEditView(view: 'x' | 'y' | 'z') {
		editView.update((currentView) => {
			if (currentView === 'x' && view === 'x') return 'x-inverse'
			else if (view === 'x') return 'x'
			else if (currentView === 'y' && view === 'y') return 'y-inverse'
			else if (view === 'y') return 'y'
			else if (currentView === 'z' && view === 'z') return 'z-inverse'
			else if (view === 'z') return 'z'
			else return currentView
		})
	};


	useKeyDown('Shift', () => {
		temporarySnap = true;
		shiftState = true;
	});

	useKeyUp('Shift', () => {
		temporarySnap = false;
		shiftState = false;
	});

	useKeyDown('t', () => {
		transformMode.set('translate')
	});

	useKeyDown('r', () => {
		transformMode.set('rotate')
	});

	useKeyDown('g', () => {
		transformSpace.update((space) => {
			if (space === 'local') {
				return 'world'
			} else {
				return 'local'
			}
		})
	});

	useKeyDown('v', () => {
		if ($view === 'car') {
			view.set('edit')
		} else {
			view.set('car')
		}
	});

	useKeyDown('Escape', () => {
		if ($view === 'car') {
			view.set('edit')
		}
	});

	// selected
	useKeyDown('Shift+R', () => {
		if (!$currentlySelectedElement) return;

		const euler = new Euler().set(...$currentlySelectedElement.rotation.current)
		// snap to the next 90 degree rotation on the y axis
		euler.y += 90 * DEG2RAD
		// modulo 360
		euler.y = euler.y % (Math.PI * 2)
		const newRotation = euler.toArray()
		trackData.setTrackElementRotation($currentlySelectedElement.id, newRotation as any)
	});

	useKeyDown('Shift+D', () => {
		if (!$currentlySelectedElement) return
		const newElement = trackData.duplicateTrackElement($currentlySelectedElement.id)
		currentlySelectedElement.set(newElement)
	});

	useKeyDown('Shift+F', () => {
		focusCurrentlySelectedElement()
	});

	useKeyDown('Control+Backspace', () => {
		if (!$currentlySelectedElement) return
		trackData.removeTrackElement($currentlySelectedElement.id)
		currentlySelectedElement.set(undefined)
	})

	// edit view
	useKeyDown('x', () => {
		if ($view !== 'edit') return
		setEditView('x')
	});

	useKeyDown('y', () => {
		if ($view !== 'edit') return
		setEditView('y')
	});

	useKeyDown('z', () => {
		if ($view !== 'edit') return
		setEditView('z')
	});

	useKeyDown('o', () => {
		if ($view !== 'edit') return
		editView.set('orbit')
	});

	useKeyDown('w', () => {
		if ($view !== 'edit') return
		wireframe = !wireframe
	});

	useKeyDown('Enter', () => {
		if ($view === 'car') {
			respawnCar()
			resetTrackViewer()
		}
	})
</script>


<!-- ############################################################# -->
	{#if $$slots.ui}
		<div>ui from child</div>
		<slot name="ui" />
	{/if}


<!-- UI -->
<DomPortal target="#portal-target">

	{#if $view === 'edit'}

			<Button on:click={() => view.set('car')}>Play</Button>

			<!-- EDITOR SETTINGS -->
			<div>
				<!-- Wireframe -->
				<Button	on:click={() => (wireframe = !wireframe)}>
					<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="#000000" viewBox="0 0 256 256">
						<path d="M224.5,95.53v0l-64-64A12,12,0,0,0,152,28H40A12,12,0,0,0,28,40V152a11.94,11.94,0,0,0,3,7.93c.15.18.31.36.5.56l64,64h0A12,12,0,0,0,104,228H216a12,12,0,0,0,12-12V104A12,12,0,0,0,224.5,95.53ZM164,69l23,23H164ZM92,187,69,164H92Zm0-47H52V69l40,40ZM69,52h71V92H109Zm71,64v24H116V116Zm-24,88V164h31l40,40Zm88-17-40-40V116h40Z" />
					</svg>
					<ToolTip>Wireframe</ToolTip>
				</Button>

				<!-- Snap -->
				<Button on:click={() => (permanentSnap = !permanentSnap)}>
					<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="#000000" viewBox="0 0 256 256">
						<path d="M76,60A16,16,0,1,1,60,44,16,16,0,0,1,76,60Zm52-16a16,16,0,1,0,16,16A16,16,0,0,0,128,44Zm68,32a16,16,0,1,0-16-16A16,16,0,0,0,196,76ZM60,112a16,16,0,1,0,16,16A16,16,0,0,0,60,112Zm68,0a16,16,0,1,0,16,16A16,16,0,0,0,128,112Zm68,0a16,16,0,1,0,16,16A16,16,0,0,0,196,112ZM60,180a16,16,0,1,0,16,16A16,16,0,0,0,60,180Zm68,0a16,16,0,1,0,16,16A16,16,0,0,0,128,180Zm68,0a16,16,0,1,0,16,16A16,16,0,0,0,196,180Z" />
					</svg>
					<ToolTip>Snap</ToolTip>
				</Button>

				<!-- Focus -->
				<Button on:click={focusCurrentlySelectedElement}>
					<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="#000000" viewBox="0 0 256 256">
						<path d="M196,157.43V98.57a17,17,0,0,0-8.42-14.71L136.24,54.21a16.55,16.55,0,0,0-16.48,0L68.43,83.86A17,17,0,0,0,60,98.57v58.86a17,17,0,0,0,8.42,14.71l51.34,29.65a16.53,16.53,0,0,0,16.48,0l51.33-29.65A17,17,0,0,0,196,157.43ZM128,77.17,160.59,96,128,114.81,95.41,96Zm-44,40,32,18.48v36.3L84,153.42Zm56,54.78V135.6l32-18.48v36.3ZM236,48V88a12,12,0,0,1-24,0V60H184a12,12,0,0,1,0-24h40A12,12,0,0,1,236,48ZM84,208a12,12,0,0,1-12,12H32a12,12,0,0,1-12-12V168a12,12,0,0,1,24,0v28H72A12,12,0,0,1,84,208Zm152-40v40a12,12,0,0,1-12,12H184a12,12,0,0,1,0-24h28V168a12,12,0,0,1,24,0ZM20,88V48A12,12,0,0,1,32,36H72a12,12,0,0,1,0,24H44V88a12,12,0,0,1-24,0Z" />
					</svg>
					<ToolTip>Focus Element</ToolTip>
				</Button>

				<!-- Orbit -->
				<Button on:click={() => ($editView = 'orbit')}>
					<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="#000000" viewBox="0 0 256 256">
						<path d="M244,56v48a12,12,0,0,1-12,12H184a12,12,0,1,1,0-24H201.1l-19-17.38c-.13-.12-.26-.24-.38-.37A76,76,0,1,0,127,204h1a75.53,75.53,0,0,0,52.15-20.72,12,12,0,0,1,16.49,17.45A99.45,99.45,0,0,1,128,228h-1.37A100,100,0,1,1,198.51,57.06L220,76.72V56a12,12,0,0,1,24,0Z" />
					</svg>
					<ToolTip>Orbit</ToolTip>
				</Button>
			</div>

			<div class="absolute bottom-0 left-0">
				<AddElement />
			</div>






			{#if $currentlySelectedElement && $currentlySelectedElementType}
				<div class="absolute bottom-0 right-0">
					<Card>
						<div class="mb-[10px] font-headline">
							{trackElementPrototypes[$currentlySelectedElementType].buttonLabel}
						</div>
						<div class="mb-[20px]">
							{#key $currentlySelectedElement.id}
								<ElementDetails currentlySelectedTrackElement={$currentlySelectedElement} />
							{/key}
						</div>
						<div class="flex flex-row justify-between gap-[2px] text-[0.65em] pb-[2px]">
							<div class="flex flex-row gap-[5px]">
								<DuplicateElement />
								<RotateElement />
							</div>
							<RemoveElement />
						</div>
					</Card>
				</div>
			{/if}






	{:else if $view === 'car'}
		<TopBarLayout>
			<Button
				slot="topbar-left"
				on:click={() => view.set('edit')}
			>
				Edit
			</Button>

			<Button
				slot="topbar-right"
				forceFocusOnMount
				on:click={() => {
					respawnCar()
					resetTrackViewer()
				}}
			>
				Reset
			</Button>
		</TopBarLayout>
	{/if}

</DomPortal>













<!-- 3D -->
<TrackViewer {trackData} let:trackElement>
	<TrackEditorElementTransformControls
		{trackElement}
		on:mouseDown={() => (cameraControlsActive = false)}
		on:mouseUp={() => (cameraControlsActive = true)}
	/>

	<TrackElTransform reactive {trackElement}>
		<TrackEditorElementSelector {trackElement} let:selected>
			<TrackElement {trackElement}>
				<svelte:fragment slot="track-element-selection">
					{#if selected}
						<TrackEditorElementSelection />
					{/if}
				</svelte:fragment>
			</TrackElement>
		</TrackEditorElementSelector>
	</TrackElTransform>
</TrackViewer>

<Car freeze={carFrozen} active={carActive} useCarCamera={carActive} volume={carActive ? 1 : 0} />

<T.PerspectiveCamera
	makeDefault={$view === 'edit' && $editView === 'orbit'}
	position={[50, 50, 50]}
>
	<CameraControls
		enabled={cameraControlsActive && !useOrthoCam}
		smoothTime={0.1}
		dollyToCursor
		infinityDolly
		draggingSmoothTime={0.05}
		mouseButtons.left={shiftState ? CC.ACTION.TRUCK : CC.ACTION.ROTATE}
		dollySpeed={shiftState ? 0.1 : 1}
		maxDistance={1000}
		bind:ref={$cameraControls[0]}
	/>
</T.PerspectiveCamera>

<T.OrthographicCamera makeDefault={useOrthoCam} position.x={40} zoom={50}>
	<CameraControls
		enabled={cameraControlsActive && useOrthoCam}
		smoothTime={0.1}
		dollyToCursor
		draggingSmoothTime={0.05}
		mouseButtons.left={CC.ACTION.TRUCK}
		bind:ref={$cameraControls[1]}
	/>
</T.OrthographicCamera>

{#if useOrthoCam || ($view === 'edit' && wireframe)}
	<SolidBackground />
{/if}

{#if $view === 'edit' && wireframe}
	<Wireframe />
{/if}
