import { searchInput, searchDialog, dialogContent } from "./dom.js";

import { fetchPokemonByNameOrId } from "./api.js";
import { typeColors } from "./typeColors.js";

export async function searchPokemon() {
  const value = searchInput.value.trim().toLowerCase();

  if (!value) {
    dialogContent.innerHTML = `<p>Please enter a Pokémon name or ID.</p>`;
    searchDialog.showModal();
    return;
  }

  try {
    const p = await fetchPokemonByNameOrId(value);

    const name = p.name.charAt(0).toUpperCase() + p.name.slice(1);

    const id = "#" + String(p.id).padStart(3, "0");

    const type1 = p.types[0].type.name;
    const type2 = p.types[1]?.type.name;

    const type1Color = typeColors[type1];
    const type2Color = typeColors[type2];

    const type2HTML = type2
      ? `<span class="${type2Color}">${type2}</span>`
      : "";

    dialogContent.innerHTML = `
      <div>
        <h2>${name} ${id}</h2>
        <span class="${type1Color}">${type1}</span>
        ${type2HTML}
      </div>
    `;

    searchDialog.showModal();
  } catch (e) {
    dialogContent.innerHTML = `<p>Pokemon not found</p>`;
    searchDialog.showModal();
  }
}
