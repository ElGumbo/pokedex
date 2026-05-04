import { pokemonContainer } from "./dom.js";
import { typeColors } from "./typeColors.js";
import { getCaughtPokemon, saveCaughtPokemon } from "./storage.js";

const pokemonObjects = [];

export async function renderPokemonList(pokemonData) {
  let html = "";

  for (const pokemon of pokemonData) {
    const res = await fetch(pokemon.url);
    const current = await res.json();

    const name = current.name.charAt(0).toUpperCase() + current.name.slice(1);

    const id = current.id;
    const idString = "#" + String(id).padStart(3, "0");

    const type1 = current.types[0].type.name;
    const type2 = current.types[1]?.type.name;

    const sprite = current.sprites.front_default;

    const type1Color = typeColors[type1];
    const type2Color = typeColors[type2];

    const stats = {
      hp: current.stats[0].base_stat,
      attack: current.stats[1].base_stat,
      defense: current.stats[2].base_stat,
      specialAttack: current.stats[3].base_stat,
      specialDefense: current.stats[4].base_stat,
      speed: current.stats[5].base_stat,
    };

    const pokemonObject = {
      id,
      idString,
      name,
      sprite,
      types: [type1, type2].filter(Boolean),
      stats,
    };

    pokemonObjects.push(pokemonObject);

    const type2HTML = type2
      ? `<span class="${type2Color} text-white text-sm font-bold px-4 py-2 rounded-full">${type2}</span>`
      : "";

    html += `
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
              <button id="catchBtn-${id}" class="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors font-medium">Catch'em!</button>
            </div>
          </article>`;
  }

  pokemonContainer.innerHTML = html;

  initCatchButtons();
}

function initCatchButtons() {
  for (const p of pokemonObjects) {
    const btn = document.getElementById(`catchBtn-${p.id}`);

    btn.addEventListener("click", () => {
      const list = getCaughtPokemon();

      const exists = list.some((x) => x.id === p.id);

      if (!exists) {
        list.push(p);
        saveCaughtPokemon(list);
        alert(`You caught ${p.name}!`);
      } else {
        alert(`${p.name} already caught!`);
      }
    });
  }
}
