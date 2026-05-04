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

    const idString = "#" + String(p.id).padStart(3, "0");

    const type1 = p.types[0].type.name;
    const type2 = p.types[1]?.type.name;

    const sprite = p.sprites.front_default;

    const type1Color = typeColors[type1];
    const type2Color = typeColors[type2];

    const stats = {
      hp: p.stats[0].base_stat,
      speed: p.stats[5].base_stat,
      attack: p.stats[1].base_stat,
      defense: p.stats[2].base_stat,
      specialAttack: p.stats[3].base_stat,
      specialDefense: p.stats[4].base_stat,
    };

    const type2HTML = type2
      ? `<span class="${type2Color} text-white text-sm font-bold px-4 py-2 rounded-full">${type2}</span>`
      : "";

    dialogContent.innerHTML = `
      <article class="bg-white rounded-3xl shadow-lg overflow-hidden">
        <div class="bg-slate-100 h-60 flex items-center justify-center">
          <img src="${sprite}" alt="${name}" class="w-36 h-36 object-contain" />
        </div>

        <div class="p-6">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-2xl font-extrabold">${name}</h2>
            <span class="text-slate-400 text-2xl font-semibold">${idString}</span>
          </div>

          <div class="flex gap-3 mb-5">
            <span class="${type1Color} text-white text-sm font-bold px-4 py-2 rounded-full">${type1}</span>
            ${type2HTML}
          </div>

          <div class="grid grid-cols-2 gap-y-3 gap-x-5 text-xl mb-6">
            <p class="flex justify-between">
              <span class="text-slate-500">Hp:</span>
              <span class="font-bold">${stats.hp}</span>
            </p>

            <p class="flex justify-between">
              <span class="text-slate-500">Speed:</span>
              <span class="font-bold">${stats.speed}</span>
            </p>

            <p class="flex justify-between">
              <span class="text-slate-500">Attack:</span>
              <span class="font-bold">${stats.attack}</span>
            </p>

            <p class="flex justify-between">
              <span class="text-slate-500">Defense:</span>
              <span class="font-bold">${stats.defense}</span>
            </p>

            <p class="flex justify-between">
              <span class="text-slate-500">Sp. Atk:</span>
              <span class="font-bold">${stats.specialAttack}</span>
            </p>

            <p class="flex justify-between">
              <span class="text-slate-500">Sp. Def:</span>
              <span class="font-bold">${stats.specialDefense}</span>
            </p>
          </div>
        </div>
      </article>
    `;

    searchDialog.showModal();
  } catch (e) {
    dialogContent.innerHTML = `<p>Pokemon not found</p>`;
    searchDialog.showModal();
  }
}