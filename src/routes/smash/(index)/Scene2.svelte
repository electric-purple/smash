<script>
	import { BoxGeometry, MeshStandardMaterial } from 'three'
	import { T } from '@threlte/core'
	import { AutoColliders, CollisionGroups } from '@threlte/rapier'
	import Player from '$components/RagDoll/RagDoll.svelte'
</script>



<!--
	All physically interactive stuff should be on group 0
	All non-interactive stuff should be on group 15 (ground)
-->

<!--
<CollisionGroups groups={[0, 15]}>
  // ...
</CollisionGroups>
-->


<CollisionGroups groups={[0]}>

	<!-- RAGDOLL -->
	<Player />

	<!-- WALLS -->
	<AutoColliders shape={'cuboid'}>
		<T.Group position={[30 + 0.7 + 0.15, 1.275, 0]}>
			<T.Mesh
				receiveShadow
				castShadow
				geometry={new BoxGeometry(60, 2.55, 0.15)}
				material={new MeshStandardMaterial({
					transparent: true,
					opacity: 0.5,
					color: 0x333333
				})}
			/>
		</T.Group>
		<T.Group position={[-30 - 0.7 - 0.15, 1.275, 0]}>
			<T.Mesh
				receiveShadow
				castShadow
				geometry={new BoxGeometry(60, 2.55, 0.15)}
				material={new MeshStandardMaterial({
					transparent: true,
					opacity: 0.5,
					color: 0x333333
				})}
			/>
		</T.Group>
	</AutoColliders>

</CollisionGroups>
