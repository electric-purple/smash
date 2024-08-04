<script lang="ts">
	import { useAudioProvider } from '$components/+utils/AudioProvider.svelte'
	import { c } from '$lib/utils/classes'
	import { appState } from '$stores/app'
	import { useKeyboardNavigation } from '../KeyboardNavigation.svelte'

	export let disabled = false
	export let audioCues = true
	export let preventFocusOnFocusLost = false
	export let forceFocusOnMount = false
	export let style: 'regular' | 'inverted' | 'grey' | 'green' | 'red' = 'regular'

	const styles: Record<typeof style, string> = {
		regular:	'bg-blue-darkest text-orange hover:bg-blue-darker focus:bg-blue-darker disabled:!bg-[#e8e8e8] disabled:!text-black',
		inverted: 'bg-black text-white hover:bg-[#e8e8e8] hover:text-black focus:bg-[#e8e8e8] focus:text-black disabled:!bg-[#505050] disabled:!text-[#e8e8e8]',
		grey:			'bg-[#e8e8e8] hover:bg-[#d6d6d6] focus:bg-[#d6d6d6] text-black disabled:!bg-[#e8e8e8] disabled:!text-[#505050]',
		green:		'bg-green-500 text-black hover:bg-green-400 focus:bg-green-400 disabled:!bg-green-600 disabled:!text-[#505050]',
		red:			'bg-red-500 text-blue-950 hover:text-blue-900 focus:text-blue-900 disabled:!bg-red-600 disabled:!text-[#505050]'
	}

	const { sfx } = appState.options.audio

	let _class = ''
	export { _class as class }

	const { playAudio } = useAudioProvider()

	const onPointerEnter = async () => {
		if (disabled) return
		if (!$sfx) return
		if (!audioCues) return
		playAudio('buttonHover', {
			detune: -300,
			volume: 0.23
		})
	}

	const onClick = async () => {
		if (disabled) return
		if (!$sfx) return
		if (!audioCues) return
		playAudio('buttonHover', {
			detune: 300,
			volume: 0.8
		})
	}

	const { keyboardNavigationAction } = useKeyboardNavigation()
</script>

<button
	{disabled}
	use:keyboardNavigationAction={{
		forceFocus: forceFocusOnMount,
		preventFocusOnFocusLost: preventFocusOnFocusLost
	}}
	on:pointerenter={onPointerEnter}
	on:click={onClick}
	on:click
	class={c('button',
		// 'pointer-events-auto group',
		// 'text-sm text-center rounded-xl border-3 border-current normal-case flex flex-row gap-2 items-center justify-center [&_img]:block [&_img]:p-[2px] outline-none px-3 py-1 leading-none',
		// '[&_img]:h-[1em] [&_img]:w-[1em]',
		'[&_svg]:!fill-current [&_svg]:h-[1em] [&_svg]:w-[1em]',
		styles[style],
		_class
	)}
>
	<slot />
</button>

<style>

	.button {
		font-size: var(-font-size-2);
		text-align: center;
		/* outline-none px-3 py-1 leading-none', */
		/* normal-case  */
		/* border: rounded-xl border-3 border-current  */
		border: var(--border-size-1) solid var(--gray-1);
		border-radius: var(--radius-1);

		display: flex;
		flex-direction: row;
		gap: var(--size-2 );
		align-items: center;
		justify-content: center;
	}

  button {
		pointer-events: auto;
	}

	button :global(img) {
		display: block;
		/* padding: var(--size-2); */
		height: var(--size-8); /* //1em; */
		width: var(--size-8); /*1em;*/
	}

	button :global(svg) {
		fill: currentColor !important;
		height: 1em;
		width: 1em;
	}
</style>
