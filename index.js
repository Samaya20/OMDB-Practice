async function SendRequest(url) {
  return fetch(url).then((r) => r.json());
}

function GetData() {
  let movie = document.getElementById("movie").value;
  let url = `https://www.omdbapi.com/?apikey=4f36977d&s=${movie}`;

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
           <i id="${e.imdbID}" class="fa-regular fa-heart" onclick="AddFavorite(id)"></i>
        </div>
      </div>
    `;
  });

  container.innerHTML = content;
}

let favorites = [];

function AddFavorite(id) {
  const icon = document.getElementById(id);

  if (!favorites.includes(id)) {
    favorites.push(id);
    icon.classList.remove("fa-regular");
    icon.classList.add("fa-solid");
    alert(`${id}-li element favorilərə əlavə olundu :)`);
  } else {
    favorites = favorites.filter((favId) => favId !== id);
    icon.classList.remove("fa-solid");
    icon.classList.add("fa-regular");
    alert(`${id}-li element favorilərdən silindi :/`);
    GetData();
  }

  console.log(favorites);
}

function GetFavorites() {
  if (favorites.length === 0) {
    alert("Favorilərdə film yoxdur!");
    return;
  }

  let urlPromises = favorites.map((id) => {
    let url = `https://www.omdbapi.com/?apikey=4f36977d&i=${id}`;
    return SendRequest(url);
  });

  Promise.all(urlPromises)
    .then((results) => {
      let container = document.getElementById("films");
      let content = "";

      results.forEach((movie) => {
        content += `
          <div class="film-item">
            <img src="${movie.Poster}" class="film-poster" />
            <div class="bottom">  
               <div class="text">
                 <p>${movie.Year}</p>
                 <h3>${movie.Title}</h3>
               </div>
               <i id="${movie.imdbID}" class="fa-solid fa-heart" onclick="AddFavorite('${movie.imdbID}')"></i>
            </div>
          </div>
        `;
      });

      container.innerHTML = content;
    })
    .catch((err) => console.error(err));
}

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