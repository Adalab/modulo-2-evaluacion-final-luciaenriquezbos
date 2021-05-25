"user strict";

const form = document.querySelector(".js-form");
const searchInput = document.querySelector(".js-search");
const showList = document.querySelector(".js-ul_list");
const favoritesList = document.querySelector(".js-ul_list_favorites");

form.addEventListener("submit", handleSubmit);
renderFavorites();

function renderFavorites() {
  favoritesList.innerHTML = "";
  //declarar el array
  let favorites = [];
  //comprobamos que localStage hay algo
  if (localStorage.getItem("favorites") !== null) {
    favorites = JSON.parse(localStorage.getItem("favorites"));

    //si hay algo pintamos un li
    for (const favorite of favorites) {
      const favoriteItem = document.createElement("li");
      let title = favorite.title;
      let image = favorite.img;
      let id = favorite.id;

      favoriteItem.innerHTML += `<span class="title">${title}</span>
      <img class="img_favorites" src=${image} alt="image"><input class="idShow" type="hidden" value=${id}>
      <button type="button" class="buttonItem js-buttonItem">x</button>`;
      favoritesList.appendChild(favoriteItem);

      // boton quitar eliminar lista total de favoritos
      // const buttonRemoveFavorite = document.querySelector(".js-btn");
      // function removeFavorite() {
      //   favoritesList.remove();
      // }
      // buttonRemoveFavorite.addEventListener("click", removeFavorite);
    }
  }
}

function handleSubmit(event) {
  event.preventDefault();
  showList.innerHTML = "";
  fetch("//api.tvmaze.com/search/shows?q=" + searchInput.value)
    .then((response) => response.json())
    .then((results) => {
      for (const result of results) {
        let show = result.show;
        const showItem = document.createElement("li");
        let title = show.name;
        let id = show.id;
        let image;
        if (show.image && show.image.medium) {
          image = show.image.medium;
        } else {
          image =
            "https://via.placeholder.com/210x295/ffffff/666666/?text=" + title;
        }

        //pintar favoritos en los resultados de búsqueda
        // comprobamos si el nuevo Item está en el array
        let favorites = [];
        if (localStorage.getItem("favorites") !== null) {
          favorites = JSON.parse(localStorage.getItem("favorites"));

          const exists = favorites.find(
            (favorite) => parseInt(favorite.id) === id
          );

          if (exists !== undefined) {
            showItem.classList.add("favorite");
          }
        }

        //pintar los resultados de búsqueda tal cual me los presenta la API
        showItem.innerHTML += `<span class="title">Titulo: ${title}</span>
          <img class="img" src=${image} alt="image"> <input class="idShow" type="hidden" value=${id}>`;
        showList.appendChild(showItem);
        showItem.addEventListener("click", handleShowClick);
      }
    });
}

function handleShowClick(event) {
  let clickedShow = event.currentTarget;
  //cambiamos los estilos
  clickedShow.classList.toggle("favorite");

  //declarar el array
  let favorites = [];

  //rellenar el array con lo que tengamos almacenado en localStorage (si tenemos algo)
  if (localStorage.getItem("favorites") !== null) {
    favorites = JSON.parse(localStorage.getItem("favorites"));
  }

  // crear nuevo Item /objeto para añadirlo al array
  const favoriteTitle = clickedShow.querySelector(".title").innerHTML;
  const favoriteImg = clickedShow.querySelector(".img").src;
  const favoriteId = clickedShow.querySelector(".idShow").value;

  const favoriteShow = {
    title: favoriteTitle,
    img: favoriteImg,
    id: favoriteId,
  };

  //comprobmos si el nuevo Item existe en el array y si existe lo eliminamos y si no existe lo añadimos
  const exists = favorites.find((favorite) => favorite.id === favoriteShow.id);

  if (exists === undefined) {
    favorites.push(favoriteShow);
  } else {
    favorites = favorites.filter((favorite) => favorite.id !== favoriteShow.id);
  }

  // y por último guardamos el array actualizado en localStorage

  localStorage.setItem("favorites", JSON.stringify(favorites));
  renderFavorites();
}
