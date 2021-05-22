"user strict";

const form = document.querySelector(".js-form");
const submitButton = document.querySelector(".js-submit");
const searchInput = document.querySelector(".js-search");
const showList = document.querySelector(".js-ul_list");
const favoritesList = document.querySelector(".js-ul_list_favorites");

form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
  showList.innerHTML = "";
  fetch("http://api.tvmaze.com/search/shows?q=" + searchInput.value)
    .then((response) => response.json())
    .then((results) => {
      for (const result of results) {
        let show = result.show;
        const showItem = document.createElement("li");
        let title = show.name;
        let image;
        if (show.image && show.image.medium) {
          image = show.image.medium;
        } else {
          image =
            "https://via.placeholder.com/210x295/ffffff/666666/?text=" + title;
        }
        showItem.innerHTML += `Titulo: ${title} 
        <img src=${image} alt="image">`;
        showList.appendChild(showItem);
        showItem.addEventListener("click", handleShowClick);
      }
    });
}

function handleShowClick(event) {
  let clickedShow = event.currentTarget;
  clickedShow.classList.toggle("favorite");
}
//cambiamos los estilos
//clickedShow.style = "background-color: red";

//

//   //almacenar la serie en localStorage

//   //llamar a la funcion que pinta los favoritos en su lista
