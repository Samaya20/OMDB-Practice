async function SendRequest(url) {
  return fetch(url).then((r) => r.json());
}

function GetData() {
  let movie = document.getElementById("movie").value;
  let url = `https://www.omdbapi.com/?apikey=4f36977d&s=avengers`;
  SendRequest(url)
    .then((data) => {
      FillElement(data);
    })
    .catch((err) => console.error(err));
}

function FillElement(response) {
  let container = document.getElementById("films");

  let content = "";

  response.Search.forEach((e) => {
    content += `
      <div class="film-item">
        <img src="${e.Poster}" class="film-poster" />
        <div class="bottom">
           <div class="text">
             <p>${e.Year}</p>
             <h3>${e.Title}</h3>
           </div>
           <i id="heart" class="fa-regular fa-heart" onclick="AddFavorite(${e.imdbID})"></i>
        </div>
      </div>
    `;
  });

  container.innerHTML = content;
}

function AddFavorite(id) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  this.classList.remove("fa-regular");
  this.classList.add("fa-solid");

  if (!favorites.includes(id)) {
    favorites.push(id);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    alert(`Id-si ${id} olan film favorilərə əlavə olundu :)`);
  } else {
    alert(`Id-si ${id} olan film favorilərdə var :/`);
  }
}

function LoadFavorites() {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  console.log("Favorites:", favorites);
}

LoadFavorites();

// const url =
//   "https://youtube-search-results.p.rapidapi.com/youtube-search/?q=justin%2Bbieber";
// const options = {
//   method: "GET",
//   headers: {
//     "X-RapidAPI-Key": "f48e85d69bmshfd185eb2321523cp1b5545jsne73841b3f894",
//     "X-RapidAPI-Host": "youtube-search-results.p.rapidapi.com",
//   },
// };

// async function GetData() {
//   try {
//     const response = await fetch(url, options);
//     const result = await response.json();
//     console.log(result);
//   } catch (error) {
//     console.error(error);
//   }
// }

// GetData();

// // async function GetApi(){
// //     const response = await fetch(url, options);
// //     const result = await response.json();
// //     console.log(result);
// // }

// // GetApi();
