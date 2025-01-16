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

pokemonList.forEach(function(pokemon){
     let message = pokemon.name + " (height: " + pokemon.height + ")";
   

     if (pokemon.height > 1.1) {
       message += " Wow, that’s big!";
     }

  document.write(message + "<br>");
});

