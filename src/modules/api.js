const BASE_URL = "https://pokeapi.co/api/v2/pokemon";

export async function fetchAllPokemon() {
  const res = await fetch(`${BASE_URL}?limit=151`);
  const data = await res.json();
  return data.results;
}

export async function fetchPokemonByNameOrId(value) {
  const res = await fetch(`${BASE_URL}/${value}`);

  if (!res.ok) {
    throw new Error("Pokemon not found");
  }

  return await res.json();
}
