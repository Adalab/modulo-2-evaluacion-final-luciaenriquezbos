"user strict";

const form = document.querySelector(".js-form");
const submitButton = document.querySelector(".js-submit");
const searchInput = document.querySelector(".js-search");
const showList = document.querySelector(".js-ul_list");
let allShows = [];

//ole

fetch("http://api.tvmaze.com/shows?q=+")
  .then((response) => response.json())
  .then((shows) => {
    allShows = shows;
  });

// function renderShows(shows) {
//   filteredShows.innerHTML = "";
// }

//boton que dispar la busqueda del formulario
function handleSubmit(event) {
  event.preventDefault();
}
form.addEventListener("submit", handleSubmit);

function handleSearchResult() {
  //coger el valor del search (actual)
  const searchText = searchInput.value;

  //filtrar los datos
  filteredShows = allShows.filter((show) => show.name.includes(searchText));

  //(render)
  for (const show of filteredShows) {
    const newItem = document.createElement("li");
    newItem.innerHTML = `Titulo: ${show.name} <img src=${show.image.medium} alt="image">`;
    showList.appendChild(newItem);
  }
}
submitButton.addEventListener("click", handleSearchResult);
