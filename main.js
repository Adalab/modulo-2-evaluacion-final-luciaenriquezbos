"user strict";

fetch("http://api.tvmaze.com/shows")
  .then((response) => response.json())
  .then((data) => {
    console.log("Han llegado");
    console.log(data);

    const showList = document.querySelector(".js-ul_list");

    for (const numberdata of data) {
      const newItem = document.createElement("li");
      const newContent = document.createTextNode(data);
      newItem.appendChild(newContent);
      showList.appendChild(newItem);

      let show = data[0];
      newItem.innerHTML = `Titulo: ${show.name} <img src="${show.image.medium}" alt="image">`;
    }
  });
