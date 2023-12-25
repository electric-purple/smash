<script>
	import { T } from '@threlte/core'
	import { AutoColliders, CollisionGroups } from '@threlte/rapier'
	import { BoxGeometry, MeshStandardMaterial } from 'three'
	import Player from '$components/RagDoll/RagDoll.svelte'
</script>

<T.DirectionalLight shadow position={{ y: 20, x: 8, z: -3 }} />
<T.AmbientLight intensity={0.2} />

<!--
	All physically interactive stuff should be on group 0
	All non-interactive stuff should be on group 15 (ground)
-->
<CollisionGroups groups={[0, 15]}>
	<AutoColliders shape={'cuboid'} position={{ y: -0.5 }}>
		<T.Mesh
			receiveShadow
			geometry={new BoxGeometry(100, 1, 100)}
			material={new MeshStandardMaterial()}
		/>
	</AutoColliders>
</CollisionGroups>

<!--
	All physically interactive stuff should be on group 0
-->
<CollisionGroups groups={[0]}>
	<!-- position={{ x: 2 }} -->
	<Player />

	<!-- WALLS -->
	<AutoColliders shape={'cuboid'}>
		<T.Mesh
			receiveShadow
			castShadow
			position={{ y: 1.275, x: 30 + 0.7 + 0.15 }}
			geometry={new BoxGeometry(60, 2.55, 0.15)}
			material={new MeshStandardMaterial({
				transparent: true,
				opacity: 0.5,
				color: 0x333333
			})}
		/>
		<T.Mesh
			receiveShadow
			castShadow
			position={{ y: 1.275, x: -30 - 0.7 - 0.15 }}
			geometry={new BoxGeometry(60, 2.55, 0.15)}
			material={new MeshStandardMaterial({
				transparent: true,
				opacity: 0.5,
				color: 0x333333
			})}
		/>
	</AutoColliders>
</CollisionGroups>