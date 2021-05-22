"user strict";

const form = document.querySelector(".js-form");
const submitButton = document.querySelector(".js-submit");
const searchInput = document.querySelector(".js-search");
let allShows = [];
//ole

fetch("http://api.tvmaze.com/shows?q=+")
  .then((response) => response.json())
  .then((shows) => {
    allShows = shows;

    const showList = document.querySelector(".js-ul_list");

    for (const show of shows) {
      const newItem = document.createElement("li");
      newItem.innerHTML = `Titulo: ${show.name} <img src=${show.image.medium} alt="image">`;
      showList.appendChild(newItem);
    }
  });

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
  console.log(filteredShows);

  //(render)
}
submitButton.addEventListener("click", handleSearchResult);
