// level settings
// -------
// level
// scores

import { derived, readable, writable } from "svelte/store";
import type { Readable, Writable } from "svelte/store";

interface Level {
  xxx: number;
  objects?: any;
  coords?: any; // etc etc
};

const levels: Readable<Level[]> = readable([
  { xxx: 1, objects: { door: true } },
  { xxx: 2 }
]);

const current: Writable<number> = writable(0);
const go = {
  to: (n: number) => current.set(n),
  next: () => current.update(n => Math.min(n + 1, 2)),
  prev: () => current.update(n => Math.max(0, n - 1)),
  reset: () => current.set(0)
}

const level: Readable<Level[]> = derived([levels, current], ([$levels, $current]) =>
  $levels.filter((level, i) => /* level.xxx == 3 */ i === $current)
);


export { level, go, current };

