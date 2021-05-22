"user strict";

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
