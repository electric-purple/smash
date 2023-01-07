// player settings
// -------
// ...
// TBD



import { writable } from 'svelte/store';

export const player = writable(0);


// THEN __could__ do:
  // import { player } from store/player
	// let playerValue;
	// player.subscribe(value => {
	// 	playerValue = value;
	// });

// ...but shortcut is:
  // import { player } from store/player
  // { $player }; // this "automatically" instantiates store, as per above


// then has:
// player.set(...)
// player.update((curr) => ...)

