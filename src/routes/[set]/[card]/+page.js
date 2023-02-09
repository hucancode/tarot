import { error } from "@sveltejs/kit";
import sets from "$lib/tarot/cards.json";

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
  for (var i = 0; i < sets.length; i++) {
    const set = sets[i];
    if (params.set.toLowerCase() != set.name.toLowerCase()) {
      continue;
    }
    for (var j = 0; j < set.cards.length; j++) {
      const card = set.cards[j];
      if (
        params.card.toLowerCase() == card.name.replaceAll(" ", "-").toLowerCase()
      ) {
        return {
          ...card,
          setId: i,
          cardId: j,
        };
      }
    }
  }
  throw error(404, "Not found");
}
