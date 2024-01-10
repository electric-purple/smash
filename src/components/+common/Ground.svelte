<script lang="ts">
  import { T } from '@threlte/core'
	import { AutoColliders } from '@threlte/rapier'
	import { BoxGeometry, MeshStandardMaterial } from 'three'

	const WIDTH = 100;
	const HEIGHT = 100;
</script>

<T.Group position={[0, -1, 0]}>
	<AutoColliders shape={'cuboid'}>
		<T.Mesh
			receiveShadow
			geometry={new BoxGeometry(WIDTH, 1, HEIGHT)}
			material={new MeshStandardMaterial()}
		/>
    <!--

		<T.Mesh receiveShadow>
      <T.BoxGeometry args={[100, 1, 100]} />
      <T.MeshStandardMaterial />
    </T.Mesh> -->
	</AutoColliders>
</T.Group>
