let pokemonRepository = (function () {
  let pokemonList = [
    {
      name: "Butterfree",
      height: 1.1,
      types: ["Bug", "Flying"],
    },
    {
      name: "Wigglytuff",
      height: 1,
      types: ["Fairy", "Normal"],
    },
    {
      name: "Mewtwo",
      height: 2,
      types: ["Psychic"],
    },
  ];

  function getAll() {
    return pokemonList;
  }

  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      Object.keys(pokemon).length === 3 &&
      Object.keys(pokemon).every((key) =>
        ["name", "height", "types"].includes(key)
      )
    ) {
      pokemonList.push(pokemon);
    } else {
      console.error("Invalid Pokémon object!");
    }
  }

  function find(name) {
    return pokemonList.filter(
      (pokemon) => pokemon.name.toLowerCase() === name.toLowerCase()
    );
  }

  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    let listpokemon = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("button-class");
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);

    button.addEventListener("click", function(){
      showDetails(pokemon);
    });
  }

  function showDetails(pokemon){

    console.log(pokemon);
  }

  return {
    getAll: getAll,
    add: add,
    find: find,
    addListItem: addListItem,
  };
})();

console.log(pokemonRepository.getAll());

pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});