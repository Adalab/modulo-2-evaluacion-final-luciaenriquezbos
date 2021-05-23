"user strict";

const form = document.querySelector(".js-form");
const submitButton = document.querySelector(".js-submit");
const searchInput = document.querySelector(".js-search");
const showList = document.querySelector(".js-ul_list");
const favoritesList = document.querySelector(".js-ul_list_favorites");
const showId = document.querySelector(".idShow");
let favorites = [];

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
        let id = show.id;
        let image;
        if (show.image && show.image.medium) {
          image = show.image.medium;
        } else {
          image =
            "https://via.placeholder.com/210x295/ffffff/666666/?text=" + title;
        }
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

  const showId = clickedShow.querySelector(".idShow");
  console.log(showId);

  const isPresent = favorites.find((favoriteId) => favoriteId === showId);

  if (isPresent === undefined) {
    favorites.push(showId);
  } else {
    favorites = favorites.filter((favoriteId) => favoriteId !== showId);
  }
  console.log(favorites);

  // const showName = clickedShow.querySelector(".title");
  // const showImg = clickedShow.querySelector(".img");

  // const ShowElementFavorite = [showId.value, showName.innerHTML, showImg.src];

  // localStorage.setItem("ShowElementFavorite",JSON.stringify(ShowElementFavorie);

  // if (ShowElementFavorite !== undefined) {
  //   localStorage.push();
  // }
}

//almacenar la serie en localStorage

//   //llamar a la funcion que pinta los favoritos en su lista
