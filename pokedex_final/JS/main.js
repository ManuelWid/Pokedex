const wrapper = document.getElementById("pokedex");
const moreBtn = document.getElementById("moreBtn");
// starting url, gets updated with next url from pokeapi
let surl = "https://pokeapi.co/api/v2/pokemon/?limit=16&offset=0";

moreBtn.addEventListener("click", () => {getPokemons(surl)});

// fetch first 16 pkmn from api, limited by api url param
function getPokemons(url){
    fetch(url)
        .then((response) => response.json())
        .then((pokemons) => {
            // next holds a new url with an offset param to get the next 16 pkmn
            surl = pokemons.next;
            console.log(pokemons.results);

            // let arr = pokemons.results.sort((a,b) => {
            //     if(a.name > b.name){return 1;}
            //     if(a.name < b.name){return -1;}
            //     return 0;
            // });
            // console.log(arr);
            
            // for each result we get a new link to more specific details that we have to fetch again
            pokemons.results.forEach(pokemon => {
                fetchPokemon(pokemon.url);
            });
        });
}

// fetch a specific pokemon from url
function fetchPokemon(url){
    fetch(url)
        .then((response) => response.json())
        .then((pokemon) => {
            // call the build function to make a card-like html structure
            buildCard(pokemon);
        });
}

// uses the data we got from the api to build a card to display in html
function buildCard(pokemon){
    // changes the received id from 5 to 005 or 23 to 023
    let pokeid = pokemon.id.toLocaleString("en-US",{minimumIntegerDigits: 3});
    // create an a tag to make the whole card clickable
    let cardlink = document.createElement("a");
    // pass the id as parameter to fetch the specific pkmn in details
    cardlink.href = "details.html?id=" + pokemon.id;
    cardlink.style.width = "max-content";
    cardlink.classList = "card-pkmn";

    // main div holding all the content
    let carddiv = document.createElement("div");
    carddiv.style.textAlign = "center";
    carddiv.style.width = "max-content";
    carddiv.classList = "d-flex flex-column align-items-center border rounded p-3";

    // image of the pkmn, here we need the changed id like 001 indtead of 1
    let pokeimg = document.createElement("img");
    pokeimg.classList = "img-thumbnail";
    pokeimg.src = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${pokeid}.png`;

    // holds id and name
    let pokename = document.createElement("h3");
    pokename.innerHTML = `#${pokeid} ${pokemon.name}`;

    // div to hold types, max of 2
    let poketypes = document.createElement("div");
    poketypes.classList = "d-flex gap-2";
    // go through types if there is more than 1 and create a type logo
    pokemon.types.forEach(type => {
        let ptype = document.createElement("span");
        ptype.innerHTML = type.type.name;
        let color;
        // switch all types to assign a specific color
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
        // assign the switched color
        ptype.style.backgroundColor = color;
        ptype.style.boxShadow = "2px 2px 2px grey";
        poketypes.append(ptype);
    });

    carddiv.append(pokeimg, pokename, poketypes);
    cardlink.append(carddiv);
    pokedex.append(cardlink);
}

// initialise first fetch
getPokemons(surl);