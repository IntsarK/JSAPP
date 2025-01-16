let pokemonRepository = (function () {
     let pokemonList = [
     {
          name: "Butterfree",
          height: 1.1,
          type: ["Bug", "Flying"], 
     },
     {
          name:"Wigglytuff",
          height: 1,
          type: ["Fairy", "Normal"],
     },
     {
          name: "Mewtwo",
          height: 2,
          type: ["Psychic"],
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
                 ["name", "height", "type"].includes(key)
          )
          ) {
               pokemonList.push(pokemon); 
             } else  {
                console.error("Invalid Pokémon object!");
  }
}

function find(name){
     return pokemonList.filter(
          pokemon => pokemon.name.tolowCase() === name.tolowCase()
     );
}
     return {
          getAll: getAll,
          add: add,
          find: find,
     };
})();


pokemonRepository.getAll().forEach(function(pokemon){
     let message = pokemon.name + " (height: " + pokemon.height + ")";
   

     if (pokemon.height > 1.1) {
       message += " Wow, that’s big!";
     }

  document.write(message + "<br>");
});

