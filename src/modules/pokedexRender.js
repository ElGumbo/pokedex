import { favoritesContainer } from "./dom.js";
import { getCaughtPokemon, saveCaughtPokemon } from "./storage.js";

export function loadPokedex() {
  const favoritePokemon = getCaughtPokemon();

  if (favoritePokemon.length === 0) {
    favoritesContainer.innerHTML = `
      <div class="col-span-full bg-white rounded-3xl shadow-lg p-10 text-center">
        <h2 class="text-3xl font-extrabold mb-4">No favorite Pokémon yet</h2>
        <p class="text-xl text-slate-500">
          Go to the homepage and catch some Pokémon first.
        </p>
      </div>
    `;
    return;
  }

  let html = "";

  favoritePokemon.forEach((pokemon) => {
    const type2HTML = pokemon.types[1]
      ? `<span class="${pokemon.type2Color} text-white text-sm font-bold px-4 py-2 rounded-full">${pokemon.types[1]}</span>`
      : "";

    html += `
      <article class="bg-white rounded-3xl shadow-lg overflow-hidden">
        <div class="bg-slate-100 h-60 flex items-center justify-center">
          <img src="${pokemon.sprite}" class="w-36 h-36 object-contain" />
        </div>

        <div class="p-6">
          <div class="flex justify-between mb-4">
            <h2 class="text-2xl font-extrabold">${pokemon.name}</h2>
            <span class="text-slate-400 text-2xl">${pokemon.idString}</span>
          </div>

          <div class="flex gap-3 mb-5">
            <span class="${pokemon.type1Color} text-white px-4 py-2 rounded-full">${pokemon.types[0]}</span>
            ${type2HTML}
          </div>

          <div class="grid grid-cols-2 gap-y-3 gap-x-5 text-xl mb-6">
            <p>Hp: <b>${pokemon.stats.hp}</b></p>
            <p>Speed: <b>${pokemon.stats.speed}</b></p>
            <p>Attack: <b>${pokemon.stats.attack}</b></p>
            <p>Defense: <b>${pokemon.stats.defense}</b></p>
            <p>Sp. Atk: <b>${pokemon.stats.specialAttack}</b></p>
            <p>Sp. Def: <b>${pokemon.stats.specialDefense}</b></p>
          </div>

          <div class="mb-5">
            <label class="block font-semibold mb-2">
              Personal Note:
            </label>

            <textarea
              id="note-${pokemon.id}"
              rows="4"
              class="w-full border rounded-2xl p-4"
              placeholder="Write a note..."
            >${pokemon.note || ""}</textarea>
          </div>

          <button id="saveNoteBtn-${pokemon.id}" class="w-full bg-blue-500 text-white py-2 rounded-lg mb-2">
            Save Note
          </button>

          <button id="releaseBtn-${pokemon.id}" class="w-full bg-red-500 text-white py-2 rounded-lg">
            Release ${pokemon.name}
          </button>
        </div>
      </article>
    `;
  });

  favoritesContainer.innerHTML = html;

  attachNoteHandlers(favoritePokemon);
  attachReleaseHandlers(favoritePokemon);
}

/* --------------------------
   NOTE HANDLING
---------------------------*/
function attachNoteHandlers(favoritePokemon) {
  favoritePokemon.forEach((pokemon) => {
    const saveBtn = document.getElementById(`saveNoteBtn-${pokemon.id}`);

    saveBtn.addEventListener("click", () => {
      const noteValue = document.getElementById(`note-${pokemon.id}`).value;

      const list = getCaughtPokemon();

      list.forEach((p) => {
        if (p.id === pokemon.id) {
          p.note = noteValue;
        }
      });

      saveCaughtPokemon(list);

      alert(`Note saved for ${pokemon.name}!`);
    });
  });
}

/* --------------------------
   RELEASE HANDLING
---------------------------*/
function attachReleaseHandlers(favoritePokemon) {
  favoritePokemon.forEach((pokemon) => {
    const btn = document.getElementById(`releaseBtn-${pokemon.id}`);

    btn.addEventListener("click", () => {
      const list = getCaughtPokemon();

      const updated = list.filter((p) => p.id !== pokemon.id);

      saveCaughtPokemon(updated);

      loadPokedex();

      alert(`You released ${pokemon.name}!`);
    });
  });
}
