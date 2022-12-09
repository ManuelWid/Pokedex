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
    cardlink.href = "details.html?id=" + pokemon.id;
    cardlink.style.width = "max-content";
    cardlink.classList = "col-4";

    let carddiv = document.createElement("div");
    carddiv.style.textAlign = "center";
    carddiv.style.width = "max-content";
    carddiv.classList = "d-flex flex-column align-items-center border rounded p-3";

    let pokeimg = document.createElement("img");
    pokeimg.classList = "img-thumbnail";
    pokeimg.src = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${pokeid}.png`;

    let pokename = document.createElement("h3");
    pokename.innerHTML = `#${pokeid} ${pokemon.name}`;

    let poketypes = document.createElement("div");
    // poketypes.style.width = "max-content";
    poketypes.classList = "d-flex gap-2";
    pokemon.types.forEach(type => {
        let ptype = document.createElement("span");
        ptype.innerHTML = type.type.name;
        let color;
        switch(type.type.name){
            case "bug":
                color = "rgb(134,147,14)";
                break;

            case "dark":
                color = "rgb(62,50,40)";
                break;

            case "dragon":
                color = "rgb(112,91,205)";
                break;

            case "electric":
                color = "rgb(236,156,10)";
                break;

            case "fairy":
                color = "rgb(226,143,223)";
                break;

            case "fighting":
                color = "rgb(122,49,29)";
                break;

            case "fire":
                color = "rgb(232,62,11)";
                break;

            case "flying":
                color = "rgb(128,151,233)";
                break;
        
            case "ghost":
                color = "rgb(91,91,170)";
                break;

            case "grass":
                color = "rgb(104,183,48)";
                break;

            case "ground":
                color = "rgb(209,176,86)";
                break;

            case "ice":
                color = "rgb(123,217,246)";
                break;

            case "normal":
                color = "rgb(197,191,182)";
                break;

            case "poison":
                color = "rgb(144,68,148)";
                break;

            case "psychic":
                color = "rgb(231,69,123)";
                break;

            case "rock":
                color = "rgb(183,159,88)";
                break;
        
            case "steel":
                color = "rgb(172,172,186)";
                break;

            case "water":
                color = "rgb(50,141,233)";
                break;
        
            default:
                color = "white";
                break;
        }
        ptype.classList = "badge text-center";
        ptype.style.backgroundColor = color;
        ptype.style.boxShadow = "2px 2px 2px grey";
        poketypes.append(ptype);
    });

    carddiv.append(pokeimg, pokename, poketypes);
    cardlink.append(carddiv);
    pokedex.append(cardlink);
}

getPokemons(surl);