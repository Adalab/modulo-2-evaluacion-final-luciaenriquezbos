"user strict";

//boton que dispar la busqueda del formulario

const form = document.querySelector(".js-form");
const submitButton = document.querySelector(".js-submit");
const searchInput = document.querySelector(".js-search");
const listshows = [];

function handleSubmit(event) {
  event.preventDefault();
}
form.addEventListener("submit", handleSubmit);

function handleSearchResult() {
  //coger el valor del search (actual)
  const searchText = searchInput.value;

  //meterlo en la búsqueda
  //mostrar en pantalla (render)
}
submitButton.addEventListener("click", handleSearchResult);

//ole

fetch("http://api.tvmaze.com/shows?q=+")
  .then((response) => response.json())
  .then((shows) => {
    console.log("Han llegado");
    console.log(shows);

    const showList = document.querySelector(".js-ul_list");

    for (const show of shows) {
      const newItem = document.createElement("li");
      newItem.innerHTML = `Titulo: ${show.name} <img src=${show.image.medium} alt="image">`;
      showList.appendChild(newItem);
    }
  });
