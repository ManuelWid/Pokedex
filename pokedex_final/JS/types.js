const url = new URL(window.location.href);
const id = url.searchParams.get("id");
const surl = `https://pokeapi.co/api/v2/type/${id}/`;

function fetchType(url){
    fetch(url)
        .then((response) => response.json())
        .then((type) => {
            console.log(type);
            // buildCard(pokemon);
        });
}

fetchType(surl);