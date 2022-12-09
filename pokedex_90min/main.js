// get dom stuff and set the starting url
const wrapper = document.getElementById("pokedex");
const moreBtn = document.getElementById("moreBtn");
let surl = "https://pokeapi.co/api/v2/pokemon/?limit=16";

// load 16 more pkmn when clicked
moreBtn.addEventListener("click", () => {getPokemons(surl)});

// main fetch to get 16 pkmn (as specified in surl)
function getPokemons(url){
    fetch(url)
        .then((response) => response.json())
        .then((pokemons) => {
            // set surl for next btn click to offset 16 (api returns that url)
            surl = pokemons.next;
            // for each pkmn we get back we have to fetch again as we only get name and a url back
            pokemons.results.forEach(pokemon => {
                fetchPokemon(pokemon.url);
            });
        });
}

// fetching a single pokemon with specific url returned by api
function fetchPokemon(url){
    fetch(url)
        .then((response) => response.json())
        .then((pokemon) => {
            // create a card to represent in html
            buildCard(pokemon);
        });
}

// creates a card for each pkmn and appends it to the main html div
function buildCard(pokemon){
    // changes the id 1 to 001 and so on
    let pokeid = pokemon.id.toLocaleString("en-US",{minimumIntegerDigits: 3});
    // create a link to the details page
    let cardlink = document.createElement("a");
    cardlink.href = "details.html?id=" + pokemon.id;

    // the main card div holding everything else
    let carddiv = document.createElement("div");
    carddiv.style.textAlign = "center";
    carddiv.style.width = "max-content";
    // bootstrap yay
    carddiv.classList = "col d-flex flex-column align-items-center border border-secondary rounded";

    // image container
    let pokeimg = document.createElement("img");
    pokeimg.classList = "img-thumbnail";
    pokeimg.src = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${pokeid}.png`;

    // pkmn id and name
    let pokename = document.createElement("h3");
    pokename.innerHTML = `#${pokeid} ${pokemon.name}`;

    // div for types (up to 2)
    let poketypes = document.createElement("div");
    poketypes.classList = "d-flex gap-2";
    pokemon.types.forEach(type => {
        let ptype = document.createElement("span");
        ptype.innerHTML = type.type.name;
        poketypes.append(ptype);
    });

    // bring everything together
    carddiv.append(pokeimg, pokename, poketypes);
    cardlink.append(carddiv);
    pokedex.append(cardlink);
}

// init first 16 pkmn
getPokemons(surl);