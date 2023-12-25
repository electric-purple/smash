<script lang="ts">
	import { CollisionGroups } from '@threlte/rapier'
	import { useFrame } from '@threlte/core'
	import type { Position } from '@threlte/core'

  import { useRevoluteJoint, RigidBody, Collider } from '@threlte/rapier'
	import { AutoColliders, BasicPlayerController } from '@threlte/rapier'
	import type { RigidBody as RapierRigidBody } from '@dimforge/rapier3d-compat'
	import {
		BoxGeometry,
		Mesh,
		MeshPhongMaterial,
		Vector3
	} from 'three'


  const { joint: neckJoint, rigidBodyA: neckA, rigidBodyB: neckB } = useRevoluteJoint({ x: 1 }, {}, { y: 1 });

  const { joint, rigidBodyA, rigidBodyB } = useRevoluteJoint({ x: 1 }, {}, { y: 1 });
	$: if (head) rigidBodyA.set(head);
	$: if (chest) rigidBodyB.set(chest);
	$: $joint?.setContactsEnabled(false);


	export let position: Position | undefined = undefined
	let rigidBody : RapierRigidBody


	function Box(sizeX = 1, sizeY = 1, sizeZ = 1, color = 0xffffff) {
		const geometry = new BoxGeometry(sizeX, sizeY, sizeZ);
		const material = new MeshPhongMaterial({ color });
		return new Mesh(geometry, material);
	}

	useFrame(() => {
		if (!playerMesh || !rigidBody) return

		playerMesh.getWorldPosition(playerPos)

		const diff = playerPos.sub(ballPos).divideScalar(2000)
		diff.y = 0

		const f = diff.clamp(min, max)

		rigidBody.applyImpulse(f, true)
	})
</script>

<!--
	All physically interactive stuff should be on group 0
-->
<!-- <CollisionGroups groups={[0]}> -->
<Group {position} {rotation}>

  <!-- HEAD -->
  <Box
		size={{ ... }}
		position={{ x: -1.2, z: 0.8, y: -0.4 }}
		anchor={{ x: -1.2, z: 0.8, y: -0.4 }}
  />


	<!-- HEAD -->
	<RigidBody bind:rigidBody={$head}>
		<Collider shape="cuboid" args={[1, 1, 1]} />
	</RigidBody>

	<!-- CHEST -->
	<RigidBody bind:rigidBody={$chest}>
		<Collider shape="cuboid" args={[1, 1, 1]} />
	</RigidBody>


</Group>











// BOX.svelte
export let position: Position | undefined = undefined
export let parentRigidBody: RapierRigidBody | undefined = undefined
export let anchor: Position

const { joint, rigidBodyA, rigidBodyB } = useFixedJoint(anchor, {}, {}, {})
$: if (parentRigidBody) rigidBodyA.set(parentRigidBody)
$: if (axleRigidBody) rigidBodyB.set(axleRigidBody)
$: $joint?.setContactsEnabled(false)

<Group {position}>
	<RigidBody bind:rigidBody={axleRigidBody}>
		<Collider mass={1} shape={'cuboid'} args={[0.03, 0.03, 0.03]} />
	</RigidBody>

	<T.Mesh>
		<T.BoxGeometry attach="geometry" />
		<T.MeshBasicMaterial attach="material" />
	</T.Mesh>

</Group>