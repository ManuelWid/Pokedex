const wrapper = document.getElementById("pokedex");
const moreBtn = document.getElementById("moreBtn");
let surl = "https://pokeapi.co/api/v2/pokemon/?limit=16";

moreBtn.addEventListener("click", () => {getPokemons(surl)});

function getPokemons(url){
    fetch(url)
        .then((response) => response.json())
        .then((pokemons) => {
            surl = pokemons.next;
            pokemons.results.forEach(pokemon => {
                fetchPokemon(pokemon.url);
            });
        });
}

function fetchPokemon(url){
    fetch(url)
        .then((response) => response.json())
        .then((pokemon) => {
            buildCard(pokemon);
        });
}

function buildCard(pokemon){
    // console.log(pokemon);
    let pokeid = pokemon.id.toLocaleString("en-US",{minimumIntegerDigits: 3});
    let cardlink = document.createElement("a");
    cardlink.href = "details.php?id=" + pokemon.id;

    let carddiv = document.createElement("div");
    carddiv.style.textAlign = "center";
    carddiv.style.width = "max-content";
    carddiv.classList = "col d-flex flex-column align-items-center border border-secondary rounded";

    let pokeimg = document.createElement("img");
    pokeimg.classList = "img-thumbnail";
    pokeimg.src = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${pokeid}.png`;

    let pokename = document.createElement("h3");
    pokename.innerHTML = `#${pokeid} ${pokemon.name}`;

    let poketypes = document.createElement("div");
    // poketypes.style.width = "max-content";
    poketypes.classList = "d-flex gap-2";
    // let types = [];
    pokemon.types.forEach(type => {
        let ptype = document.createElement("span");
        ptype.innerHTML = type.type.name;
        poketypes.append(ptype);
    });

    carddiv.append(pokeimg, pokename, poketypes);
    cardlink.append(carddiv);
    pokedex.append(cardlink);
}

getPokemons(surl);