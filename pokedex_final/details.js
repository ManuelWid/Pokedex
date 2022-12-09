const wrapper = document.getElementById("wrapper");
const url = new URL(window.location.href);
const id = url.searchParams.get("id");
const surl = `https://pokeapi.co/api/v2/pokemon/${id}/`;

const pokename = document.getElementById("name");
const img = document.getElementById("img");
const poketype = document.getElementById("type");
// const wrapper = document.getElementById("wrapper");

function fetchPokemon(url){
    fetch(url)
        .then((response) => response.json())
        .then((pokemon) => {
            // console.log(pokemon);
            buildCard(pokemon);
        });
}

function buildCard(pokemon){
    console.log(pokemon);
    let id = pokemon.id.toLocaleString("en-US",{minimumIntegerDigits: 3});
    document.title = `#${id} ${pokemon.name}`;

    img.src = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png`;

    pokename.innerHTML = `#${id} ${pokemon.name}`;

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
        poketype.append(ptype);
    });
}

fetchPokemon(surl);