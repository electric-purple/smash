import { currentWritable } from '@threlte/core'


// import { persist } from './utils'
import type { CurrentWritable } from '@threlte/core'
import type { Updater } from 'svelte/store'


export const persist = <T>(store: CurrentWritable<T>, key: string) => {

  if (typeof window === 'undefined') return
	// const localStorage = window.localStorage;

	const s = {
		subscribe: store.subscribe,
		current: store.current
	} as any
	const save = () => {
		localStorage.setItem(key, JSON.stringify({ value: store.current }))
	}
	const set = (v: T) => {
		store.set(v)
		s.current = store.current
		save()
	}
	const update = (fn: Updater<T>) => {
		store.update(fn)
		s.current = store.current
		save()
	}
	s.set = set
	s.update = update
	const localStorageValue = localStorage.getItem(key)
	if (localStorageValue) {
		const { value } = JSON.parse(localStorageValue)
		set(value)
	}
	return s as CurrentWritable<T>
}














export const appState = {
	visibility: currentWritable<'visible' | 'hidden'>('visible'),
	options: {
		debug: persist(currentWritable(false), 'tm-options-debug'),
		player: {
			name: persist(currentWritable(''), 'tm-options-player-name')
		},
		audio: {
			music: persist(currentWritable(true), 'tm-options-audio-music'),
			sfx: persist(currentWritable(true), 'tm-options-audio-sfx')
		},
		video: {
			shadows: persist(currentWritable(true), 'tm-options-video-shadows'),
			postprocessing: persist(currentWritable(true), 'tm-options-video-postprocessing')
		}
	}
}
