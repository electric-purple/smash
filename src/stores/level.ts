// level settings
// -------
// level
// scores

// import { readable, derived, writable, type Writable } from "svelte/store";
import { derived, readable, writable } from "svelte/store";
import type { Readable, Writable } from "svelte/store";

interface Level {
  xxx: number;
  objects?: any;
};

const xlevel = writable<{
  name:string;
  src:any;
  price: any;
  coords: object[]; // starting coords of all objects in the level
}>({
  name: 'Sticker',
  src: 'https://cdn.shopify.com/s/files/1/0434/0285/4564/products/Sticker-mock.png?v=1623256356',
  price: '$8.00',
  coords: [],
});

const levels: Readable<Level[]> = readable([
  { xxx: 1 },
  { xxx: 2 }
]);

const current: Writable<number> = writable(0);
/* */
const go = {
  next: () => current.update(n => Math.min(n + 1, 2)),
  prev: () => current.update(n => Math.max(0, n - 1)),
  reset: () => current.set(0)
}
/* * /
// ... as props on a fn ...?
function go(i: number) { current.set(i) }
go.next = () => current.update(n => Math.min(n + 1, 2));
go.prev = () => current.update(n => Math.max(0, n - 1));
/* */


const level: Readable<Level[]> = derived([levels, current], ([$levels, $current]) =>
  $levels.filter((level, i) => /* level.xxx == 3 */ i === $current)
);


export { level, go, current };

