<script lang="ts">
	import { useAudioProvider } from '$components/+utils/AudioProvider.svelte'
	import { c } from '$lib/utils/classes'
	import { appState } from '$stores/app'
	import { useKeyboardNavigation } from '../KeyboardNavigation.svelte'

	export let href: string | undefined = undefined
	export let disabled = false
	export let audioCues = true
	export let preventFocusOnFocusLost = false
	export let forceFocusOnMount = false

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
	};

	const { keyboardNavigationAction } = useKeyboardNavigation()
</script>

<svelte:element
	this={href ? 'a' : 'button'}
	role="button"
	{href}
	{disabled}
	use:keyboardNavigationAction={{
		forceFocus: forceFocusOnMount,
		preventFocusOnFocusLost
	}}
	on:pointerenter={onPointerEnter}
	on:click={onClick}
	on:click
	class={c('outline-none leading-none', _class)}
>
	<slot />
</svelte:element>
