const input = document.querySelector("#pokemonInput");
const button = document.querySelector("#searchBtn");
const card = document.querySelector("#pokemonCard");
const loading = document.querySelector("#loading");

button.addEventListener("click", fetchPokemon);

async function fetchPokemon() {
  const pokemonName = input.value.toLowerCase().trim();

  if (!pokemonName) return;

  card.innerHTML = "";
  loading.classList.remove("hidden");
  button.disabled = true;

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

    if (!response.ok) {
      throw new Error("Pokémon not found");
    }

    const data = await response.json();

    displayPokemon(data);

  } catch (error) {
    card.innerHTML = `
      <p class="text-red-600 font-semibold text-center">
        ${error.message}
      </p>
    `;
  } finally {
    loading.classList.add("hidden");
    button.disabled = false;
  }
}

function displayPokemon(data) {
  const name = data.name.charAt(0).toUpperCase() + data.name.slice(1);
  const id = `#${String(data.id).padStart(3, "0")}`;
  const height = data.height / 10;
  const weight = data.weight / 10;
  const baseExp = data.base_experience;

  const types = data.types.map(type =>
    `<span class="bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full text-sm">
      ${type.type.name}
    </span>`
  ).join(" ");

  card.innerHTML = `
    <div class="text-center animate-fadeIn">
      <img src="${data.sprites.front_default}" class="mx-auto mb-4 w-32" />

      <h2 class="text-xl font-bold">${name} ${id}</h2>

      <p class="text-gray-600 mt-2">Height: ${height} m</p>
      <p class="text-gray-600">Weight: ${weight} kg</p>
      <p class="text-gray-600">Base Experience: ${baseExp}</p>

      <div class="mt-3 flex justify-center gap-2 flex-wrap">
        ${types}
      </div>
    </div>
  `;
}