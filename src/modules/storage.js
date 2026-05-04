export function getCaughtPokemon() {
  return JSON.parse(localStorage.getItem("caughtPokemon") || "[]");
}

export function saveCaughtPokemon(list) {
  localStorage.setItem("caughtPokemon", JSON.stringify(list));
}
