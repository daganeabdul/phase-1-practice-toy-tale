let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

let showForm = false;

document.addEventListener("DOMContentLoaded", function () {
  const newToyButton = document.getElementById("new-toy-btn");
  const formContainer = document.querySelector(".container");
  const toyForm = document.querySelector(".add-toy-form");
  const toyCollection = document.getElementById("toy-collection");
  const url = "http://localhost:3000/toys";

 
  newToyButton.addEventListener("click", function () {
    showForm = !showForm;
    formContainer.style.display = showForm ? "block" : "none";
  });

  
  fetch(url)
    .then(function (res) {
      return res.json();
    })
    .then(function (toys) {
      toys.forEach(function (toy) {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
          <h2>${toy.name}</h2>
          <img src="${toy.image}" class="toy-avatar" />
          <p>${toy.likes} Likes</p>
          <button class="like-btn" id="${toy.id}">Like ❤️</button>
        `;

       
        const likeBtn = card.querySelector(".like-btn");
        likeBtn.addEventListener("click", function () {
          const newLikes = toy.likes + 1;
          fetch(url + "/" + toy.id, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ likes: newLikes }),
          })
            .then(res => res.json())
            .then(function (updatedToy) {
              toy.likes = updatedToy.likes;
              card.querySelector("p").textContent = updatedToy.likes + " Likes";
            });
        });

        toyCollection.appendChild(card);
      });
    });


  toyForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = e.target.name.value;
    const image = e.target.image.value;

    const newToy = {
      name: name,
      image: image,
      likes: 0,
    };

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newToy),
    })
      .then(res => res.json())
      .then(function (createdToy) {
        
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
          <h2>${createdToy.name}</h2>
          <img src="${createdToy.image}" class="toy-avatar" />
          <p>${createdToy.likes} Likes</p>
          <button class="like-btn" id="${createdToy.id}">Like ❤️</button>
        `;
        toyCollection.appendChild(card);
        toyForm.reset();
      });
  });
});
