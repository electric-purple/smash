<!-- RANDOM DEMO SCENE -->
<!-- THREE COLOURED BLOCKS -->

<script lang="ts">
	import { DirectionalLight, Mesh, Object3DInstance, OrbitControls, PerspectiveCamera } from '@threlte/core'
	import { Environment, GLTF } from '@threlte/extras'
	import { AutoColliders, CollisionGroups, RigidBody } from '@threlte/rapier'
	import { BoxGeometry, GridHelper, MeshStandardMaterial } from 'three'
	// import Ground from '../Ground.svelte'


// import { inflate } from 'zlib.es';
// const rawData = inflate(compressedData);


/*   import { useGltf } from '@threlte/extras';

  const { gltf } = useGltf('/models/LandRover.glb', {
    // useDraco: true
  });
 */


	const geometry = new BoxGeometry(1, 1, 1)
	let resetCounter = 0
	export const reset = () => { resetCounter += 1 }
</script>

<Environment path="/hdr/" files="shanghai_riverside_1k.hdr" />

<!-- {#if $gltf}
  <Object3DInstance object={$gltf.nodes['node-name']} />
{/if} -->

<!-- <GLTF
  url="/models/LandRover/scene.gltf"
	scale={0.01}
  interactive
  on:click={() => {
    console.log('User clicked!')
  }}
/> -->


<PerspectiveCamera position={{ y: 13, x: 12 }} fov={40}>
	<OrbitControls target={{ x: 2.5 }} />
</PerspectiveCamera>

<DirectionalLight shadow position={{ y: 20, x: 8, z: -3 }} />

{#key resetCounter}
	<!-- Collider A -->
	<CollisionGroups groups={[0]}>
		<RigidBody position={{ y: 1.5, z: 1 - Math.random() * 2 }}>
			<AutoColliders shape={'cuboid'}>
				<Mesh
					castShadow
					{geometry}
					material={new MeshStandardMaterial({
						color: 'red'
					})}
				/>
			</AutoColliders>
		</RigidBody>
	</CollisionGroups>

	<!-- Collider B -->
	<CollisionGroups groups={[0]}>
		<RigidBody position={{ y: 4.5, z: 1 - Math.random() * 2 }}>
			<AutoColliders shape={'cuboid'}>
				<Mesh
					castShadow
					{geometry}
					material={new MeshStandardMaterial({
						color: 'green'
					})}
				/>
			</AutoColliders>
		</RigidBody>
	</CollisionGroups>

	<!-- Collider C -->
  <!--
	  NOTE:
	memberships={[3]} -- the group(s) that this collider belongs to
	filter={[2]}      -- this'll be the group(s) that this collider will interact with
	  OR
	groups={[3]}      -- is the short hand to set memberships and filter to the same value
	-->
	<CollisionGroups groups={[0]}>
		<RigidBody position={{ y: 3, z: 1 - Math.random() * 2 }}>
			<AutoColliders shape={'cuboid'}>
				<Mesh
					castShadow
					{geometry}
					material={new MeshStandardMaterial({
						color: 'blue'
					})}
				/>
			</AutoColliders>
		</RigidBody>
	</CollisionGroups>
{/key}

<Object3DInstance object={new GridHelper(50)} />

<!-- <CollisionGroups groups={[1, 2, 3]}>
	<Ground />
</CollisionGroups> -->