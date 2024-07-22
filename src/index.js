let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  form.addEventListener("submit", (e) => {
    addToys(e);
    form.reset(); // Reset the form after submission
  });

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

// Function to add a new toy
function addToys(e) {
  e.preventDefault();

  const toyObj = {
    name: e.target.name.value,
    image: e.target.image.value,
    likes: 0
  };
  renderToy(toyObj);
  handleToy(toyObj);
}

// Function to render a single toy card
function renderToy(toy) {
  const CollectionToy = document.querySelector("#toy-collection");
  const card = document.createElement("div");
  card.classList.add("card"); // Add the card class

  card.innerHTML = `
    <h2>${toy.name}</h2>
    <img src="${toy.image}" class="toy-avatar">
    <p class="likes">${toy.likes} Likes</p>
    <button class="like-btn">Like ❤️</button>
  `;
  CollectionToy.appendChild(card);

  card.querySelector(".like-btn").addEventListener("click", () =>{
    toy.likes += 1;
    document.querySelector(".likes").textContent = toy.likes;
    updateData(toy);
  })
}

// Function to fetch all toys from db.json
function getToys() {
  fetch("http://localhost:3000/toys")
    .then(res => res.json())
    .then(data => {
      data.forEach(toy => renderToy(toy));
    });
}

// Function to handle adding a toy to db.json
function handleToy(toy) {
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify(toy)
  })
  .then(res => res.json())
  .then(data => {
    renderToy(data); // Render the new toy card after successful addition
  });
}

//function to update likes to our db
function updateData(likes){
  fetch(`http://localhost:3000/toys/${likes.id}`,{
    method:"PATCH",
    headers:{
      "Content-Type" : "application/json",
      "Accept" : "application/json"
    },
    body:JSON.stringify(likes)
  })
    .then(res => res.json())
    .then(data => data).catch(error => {
      console.log(error);
    })
}
  getToys(); // Fetch and render existing toys on page load
});
