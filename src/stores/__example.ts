import type { PopularItem } from "$lib/types/docs";
import type { Readable } from "svelte/store"; // useful for things set "internally" (ie not by user).  Examples: mouse poition, current time, etc
import { readable, derived, writable } from "svelte/store";

const mapQuickstart = (
  title: string,
  path: string,
  favorite: boolean,
  icon?: string
): PopularItem => ({
  title,
  path: "/docs" + (path ? "/" + path : ""),
  favorite,
  icon,
});

const quickstartItems = readable([
  mapQuickstart("Agda", "introduction/getting-started/quickstart/agda", false),
  mapQuickstart("C", "introduction/getting-started/quickstart/c", false),
  mapQuickstart("Yasm", "introduction/getting-started/quickstart/yasm", false),
]);

export const searchQuery = writable("");
export const popularQuickstarts = derived(quickstartItems, ($quickstartItems) =>
  $quickstartItems.filter((item) => item.favorite)
);
export const remainingQuickstarts: Readable<PopularItem[]> = derived(
  [quickstartItems, searchQuery],
  ([$quickstartItems, $searchQuery]) =>
    $quickstartItems.filter((item) => {
      if ($searchQuery === "") {
        return !item.favorite;
      }
      return (
        !item.favorite &&
        item.title.toLowerCase().includes($searchQuery.toLowerCase())
      );
    })
);