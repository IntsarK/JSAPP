let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";
  let modalContainer = document.querySelector("#modal-container");

  function getAll() {
    return pokemonList;
  }

  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon &&
      "detailsUrl" in pokemon
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
  listpokemon.classList.add("list-group-item");
  let button = document.createElement("button");
  button.innerText = pokemon.name;
  button.classList.add("btn", "btn-primary");
  listpokemon.appendChild(button);
  pokemonList.appendChild(listpokemon);

  button.addEventListener("click", function () {
    showDetails(pokemon);
  });
}

  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
          console.log(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        // Now we add the details to the item
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function showModal(title, text) {
  modalContainer.innerHTML = "";
  let modal = document.createElement("div");
  modal.classList.add("modal", "fade");
  modal.setAttribute("tabindex", "-1");
  modal.setAttribute("role", "dialog");

  let modalDialog = document.createElement("div");
  modalDialog.classList.add("modal-dialog");
  modalDialog.setAttribute("role", "document");
  modal.appendChild(modalDialog);

  let modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");
  modalDialog.appendChild(modalContent);

  let modalHeader = document.createElement("div");
  modalHeader.classList.add("modal-header");
  modalContent.appendChild(modalHeader);

  let closeButtonElement = document.createElement("button");
  closeButtonElement.classList.add("close");
  closeButtonElement.setAttribute("data-dismiss", "modal");
  closeButtonElement.setAttribute("aria-label", "Close");
  closeButtonElement.innerHTML = "&times;";
  modalHeader.appendChild(closeButtonElement);

  let titleElment = document.createElement("h5");
  titleElment.classList.add("modal-title");
  titleElment.innerText = title;
  modalHeader.appendChild(titleElment);

  let modalBody = document.createElement("div");
  modalBody.classList.add("modal-body");
  modalContent.appendChild(modalBody);

  let contentElement = document.createElement("p");
  contentElement.innerText = text;
  modalBody.appendChild(contentElement);

  modalContainer.appendChild(modal);

  $(modal).modal("show");  // Using jQuery to show the modal
}

function hideModal() {
  let modal = document.querySelector(".modal");
  $(modal).modal("hide");  // Using jQuery to hide the modal
}


  function showDetails(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function () {
      showModal(pokemon.name, `Height: ${pokemon.height}m`);

      let modalContainer = document.querySelector("#modal-container");
      let modal = modalContainer.querySelector(".modal");

      let pokemonImage = document.createElement("img");
      pokemonImage.src = pokemon.imageUrl;
      pokemonImage.alt = `${pokemon.name} image`;
      modal.appendChild(pokemonImage);

      let cancelButton = document.createElement("button");
      cancelButton.classList.add("modal-cancel");
      cancelButton.innerText = "Cancel";

      modal.appendChild(cancelButton);
      cancelButton.addEventListener("click", hideModal);
    });
  }

  document.querySelector("#show-dialog").addEventListener("click", () => {
    showDetails("Confirm Action", "Are you sure you want to do this?")
      .then(() => {
        alert("Confirmed!");
      })
      .catch(() => {
        alert("Not confirmed");
      });
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalContainer.classList.contains("is-visible")) {
      hideModal();
    }
  });

  modalContainer.addEventListener("click", (e) => {
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

  return {
    getAll: getAll,
    add: add,
    find: find,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    showModal: showModal,
  };
})();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

document.querySelector("#show-modal").addEventListener("click", () => {
  pokemonRepository.showModal("Pokemon name", "This is where the rest goes.");
});
