let pokemonRepository = (function () {
  let e = [];
  function t() {
    return e;
  }
  function n(t) {
    "object" == typeof t && "name" in t && "detailsUrl" in t
      ? e.push(t)
      : console.error("Invalid Pok\xe9mon object!");
  }
  function o(e) {
    return fetch(e.detailsUrl)
      .then(function (e) {
        return e.json();
      })
      .then(function (t) {
        (e.imageUrl = t.sprites.front_default),
          (e.height = t.height),
          (e.types = t.types);
      })
      .catch(function (e) {
        console.error(e);
      });
  }
  function i(e) {
    document.querySelector("#exampleModalLabel").innerText = e.name;
    let t = document.createElement("img");
    t.src = e.imageUrl;
    let n = document.createElement("p");
    n.innerText = `Height: ${e.height}`;
    let o = document.createElement("p");
    o.innerText = `Types: ${e.types.map(({ type: e }) => e.name).join(", ")}`;
    let i = document.querySelector(".modal-body");
    (i.innerHTML = ""), i.appendChild(t), i.appendChild(n), i.appendChild(o);
  }
  function r() {
    $(document.querySelector(".modal")).modal("hide");
  }
  function a(e) {
    o(e).then(function () {
      i(e);
    });
  }
  return {
    getAll: t,
    add: n,
    find: function t(n) {
      return e.filter((e) => e.name.toLowerCase() === n.toLowerCase());
    },
    addListItem: function e(t) {
      let n = document.querySelector(".pokemon-list"),
        o = document.createElement("li");
      o.classList.add("list-group-item");
      let i = document.createElement("button");
      (i.innerText = t.name),
        i.classList.add("btn", "btn-primary"),
        i.setAttribute("data-toggle", "modal"),
        i.setAttribute("data-target", "#exampleModal"),
        o.appendChild(i),
        n.appendChild(o),
        i.addEventListener("click", function () {
          a(t);
        });
    },
    loadList: function e() {
      return fetch("https://pokeapi.co/api/v2/pokemon/?limit=150")
        .then(function (e) {
          return e.json();
        })
        .then(function (e) {
          e.results.forEach(function (e) {
            n({ name: e.name, detailsUrl: e.url });
          });
        })
        .catch(function (e) {
          console.error(e);
        });
    },
    loadDetails: o,
    showDetails: a,
    showModal: i,
  };
})();
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (e) {
    pokemonRepository.addListItem(e);
  });
});
