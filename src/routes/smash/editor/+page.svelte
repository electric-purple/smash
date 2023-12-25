<script lang="ts">
	import Editor from '$components/Editor/Editor.svelte'

	export let data
</script>

<!-- ### -->

<article>
	<section>
    <h3>EDIT?</h3>
	</section>
</article>


<Editor trackData={data.trackData} />