const baseUrl = 'https://pokeapi.co/api/v2/pokemon';
const perPage = 10; // Number of Pokémon per page
let currentPage = 1;

const pokemonList = document.getElementById('pokemon-list');
const prevButton = document.getElementById('prev-btn');
const nextButton = document.getElementById('next-btn');

async function getPokemonData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

async function displayPokemonList(page) {
    const offset = (page - 1) * perPage;
    const url = `${baseUrl}?offset=${offset}&limit=${perPage}`;
    const data = await getPokemonData(url);

    pokemonList.innerHTML = '';

    for (const pokemon of data.results) {
        const pokemonData = await getPokemonData(pokemon.url);
        const abilities = pokemonData.abilities.map(ability => ability.ability.name);
        const moves = pokemonData.moves.map(move => move.move.name);

        const pokemonElement = document.createElement('div');
        pokemonElement.classList.add('pokemon');
        pokemonElement.innerHTML = `
            <h2>${pokemonData.name}</h2>
            <p>Abilities: ${abilities.join(', ')}</p>
            <p>Moves: ${moves.join(', ')}</p>
            <p>Weight: ${pokemonData.weight}</p>
        `;
        pokemonList.appendChild(pokemonElement);
    }
}

prevButton.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        displayPokemonList(currentPage);
    }
});

nextButton.addEventListener('click', () => {
    currentPage++;
    displayPokemonList(currentPage);
});

displayPokemonList(currentPage);