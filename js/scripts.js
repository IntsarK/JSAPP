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

for (let i = 0; i < pokemonList.length; i++) {
     let message = pokemonList[i].name + " (height: " + pokemonList[i].height + ")";
   

     if (pokemonList[i].height > 1.1) {
       message += " - Wow, that’s big!";
     }

  document.write(message + "<br>");
}

