const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const pokemonName = document.getElementById('pokemon-name');
const pokemonId = document.getElementById('pokemon-id');
const weight = document.getElementById('weight');
const height = document.getElementById('height');
const imgContainer = document.getElementById('img-container');
const types = document.getElementById('types');
const statsContainer = document.getElementById('stats-container');
const hp = document.getElementById('hp');
const attack = document.getElementById('attack');
const defense = document.getElementById('defense');
const specialAttack = document.getElementById('special-attack');
const specialDefense = document.getElementById('special-defense');
const speed = document.getElementById('speed');

const baseUrl = 'https://pokeapi-proxy.freecodecamp.rocks/api/pokemon';

const fetchData = async (url) => {
    try {
        const res = await fetch(url);
        const data = await res.json();
        return data;
    } catch (err) {
        alert('Pokémon not found');
    }
};

const displayStats = (pokemonData) => {
    if (!pokemonData) return;
    imgContainer.innerHTML = '';
    types.innerHTML = '';

    console.log(pokemonData);
    pokemonName.innerText = `${pokemonData.name.toUpperCase()}`;
    pokemonId.innerText = `#${pokemonData.id}`;
    weight.innerText = `${pokemonData.weight}`;
    height.innerText = `${pokemonData.height}`;
    imgContainer.innerHTML = `<img id='sprite' src='${pokemonData.sprites.front_default}'/>`
    types.innerHTML = pokemonData.types.map(type => {
        return `
            <span>${type.type.name.toUpperCase()}</span>
        `;
    }).join('');
    hp.innerText = pokemonData.stats.find(stat => stat.stat.name === 'hp').base_stat;
    attack.innerText = pokemonData.stats.find(stat => stat.stat.name === 'attack').base_stat;
    defense.innerText = pokemonData.stats.find(stat => stat.stat.name === 'defense').base_stat;
    specialAttack.innerText = pokemonData.stats.find(stat => stat.stat.name === 'special-attack').base_stat;
    specialDefense.innerText = pokemonData.stats.find(stat => stat.stat.name === 'special-defense').base_stat;
    speed.innerText = pokemonData.stats.find(stat => stat.stat.name === 'speed').base_stat;
}

searchButton.addEventListener('click', async () => {
    const pokemonData = await fetchData(`${baseUrl}/${searchInput.value.toLowerCase()}`)
    searchInput.value = '';
    displayStats(pokemonData);
}
);