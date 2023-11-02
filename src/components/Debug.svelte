<script>
	import { current, go, level } from '$stores/level';
	const debug = true;


/*

...you can serialize the scene like so:
const json = scene.toJSON();


...and load it via ObjectLoader (if previously loaded as per above):
const scene = new THREE.ObjectLoader().parse( json );

...else, from file:
const loader = new THREE.ObjectLoader();
loader.load(
	// resource URL
	"models/json/example.json",

	// onLoad callback
	// Here the loaded data is assumed to be an object
	function ( obj ) {
		// Add the loaded object to the scene
		scene.add( obj );
	},

	// onProgress callback
	function ( xhr ) {
		console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
	},

	// onError callback
	function ( err ) {
		console.error( 'An error happened' );
	}
);



 */
</script>



	{#if debug}
	<div>
		<button>save</button>
		<button on:click={go.prev}>-</button>
		<button on:click={go.next}>++</button>
		<h2>{$current}</h2>
		<pre>{JSON.stringify($level)}</pre>
	</div>
  {/if}

<style>
	button {
		padding: var(--size-4);
		z-index: var(--layer-important);
	}

	div {
		position: absolute;
		display: flex;
		gap: 1em;
		left: 20vw;
		width: 80vw;
	}
</style>
