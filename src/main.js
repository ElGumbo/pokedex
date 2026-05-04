import { fetchAllPokemon } from "./modules/api.js";
import { renderPokemonList } from "./modules/renderPokemon.js";
import { searchPokemon } from "./modules/searchPokemon.js";
import {
  searchBtn,
  searchInput,
  closeDialogBtn,
  searchDialog,
} from "./modules/dom.js";

async function init() {
  const data = await fetchAllPokemon();
  renderPokemonList(data);
}

searchBtn.addEventListener("click", searchPokemon);

searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") searchPokemon();
});

closeDialogBtn.addEventListener("click", () => {
  searchDialog.close();
});

init();