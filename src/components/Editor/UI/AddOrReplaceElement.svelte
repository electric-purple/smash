<script lang="ts">
	import { c } from '$lib/utils/classes'
	import { trackElementPrototypes} from '$components/TrackElements/elements'
	import Button from                    '$components/+UI/components/Button.svelte';
	import { useTrackEditor } from '../context'
	import type { TrackElementCategory, TrackElementPrototypeType } from '$components/TrackElements/elements';


	type Category = {
		name: TrackElementCategory
		previewImage: string
		elements: TrackElementPrototypeType[]
	}

	let selectedCategory: Category | undefined = undefined
	const categories: Category[] = [];
	const { trackData, currentlySelectedElement } = useTrackEditor();

	Object.entries(trackElementPrototypes).forEach(([key, value]) => {
		const category = categories.find((category) => category.name === value.category)

		if (category) {
			category.elements.push(key as any)
		} else {
			categories.push({
				name: value.category,
				previewImage: `/images/${key}.png`,
				elements: [key as any]
			})
		}
	});


	function handleClick(element: any) {
		if ($currentlySelectedElement) {
			trackData.setTrackElementType($currentlySelectedElement.id, element)
		} else {
			const newTrackElement = trackData.addTrackElement(element)
			currentlySelectedElement.set(newTrackElement)
		}
	}

	function toggle(category: any) {
		if (selectedCategory === category) {
			selectedCategory = undefined
		} else {
			selectedCategory = category
		}
	}

</script>



<div class={c('xxxxx flex flex-row items-end gap-5')}>
	{#each categories as category}
		{@const isSelected = selectedCategory === category}
		<div class="flex flex-col gap-0">


			{#if isSelected }
				{#each category.elements as element}
					<Button on:click={() => handleClick(element)}>
						<img
							src="/images/{element}.png"
							alt={element}
							class="!h-[56px] !w-[56px]"
						/>
					</Button>
				{/each}
			{/if}


			<Button
				on:click={() => toggle(category)}
				class={ isSelected ? 'isSelected' : '' }
			>
				<!-- class={c('border-orange p2 border-2 rounded-md bg-blue-950', isSelected ? 'isSelected' : '')} -->
				<img src={category.previewImage} alt={category.name} class="!h-[56px] !w-[56px]" />
			</Button>




		</div>
	{/each}
</div>



<style>
	:global(.isSelected) {
		background:red;
		border: var(--border-size-2) solid var(--blue-9);
		border-radius: var(--radius-1);
	}
  .xxxxx {
		display: flex;
		align-items: end;
	/* flex flex-row items-end gap-5 */
	}

</style>