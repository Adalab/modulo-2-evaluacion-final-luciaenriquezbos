"user strict";

const form = document.querySelector(".js-form");
const submitButton = document.querySelector(".js-submit");
const searchInput = document.querySelector(".js-search");
let showList = document.querySelector(".js-ul_list");

form.addEventListener("submit", handleSubmit);
function handleSubmit(event) {
  showList.innerHTML = "";
  fetch("http://api.tvmaze.com/search/shows?q=" + searchInput.value)
    .then((response) => response.json())
    .then((results) => {
      for (const result of results) {
        let show = result.show;
        const newItem = document.createElement("li");
        let title = show.name;
        let image;
        if (show.image !== undefined && show.image.medium) {
          image = show.image.medium;
        } else {
          image =
            "https://via.placeholder.com/210x295/ffffff/666666/?text=" + title;
        }
        newItem.innerHTML += `Titulo: ${title} 
        <img src=${image} alt="image">`;
        showList.appendChild(newItem);
      }
    });

  event.preventDefault();
}

function handleSearchResult() {
  //coger el valor del search (actual)
  const searchText = searchInput.value;

  //(render)
}
//submitButton.addEventListener("click", handleSearchResult);

// favoritos;

// const favoritesContent = document.querySelector(".js-ul_list--favorites");
