const api = "c24562c08731fc072cba54bb1f27a554";
let page = 1;
let api_url = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${api}&page=${page}`;
const img_path = "https://image.tmdb.org/t/p/w500";
const search_url = `https://api.themoviedb.org/3/search/movie?api_key=${api}&query="`;
const images = document.querySelectorAll("img");
console.log(api_url);

async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json();
  console.log(data.results);
  displayMovies(data.results);
}

getMovies(api_url);

const displayMovies = (movies) => {
  const main = document.getElementById("main");
  main.innerHTML = "";
  movies.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;
    // const movie = document.createElement("")
    let color = "";
    if (vote_average >= 8) {
      color = "green";
    } else if (vote_average >= 5.5) {
      color = "orange";
    } else {
      color = "red";
    }
    const movieEl = `
        <div class="movie">
        <img 
        src="${img_path + poster_path}"
        alt="${title}"
        />
        <div class="movie-info">
        <h3>${title}</h3>
        <span class=${color}>${vote_average}</span>
        </div>
        
        <div class="overview">
        <h2>Overview</h2>
        
        <h3>${overview}</h3>
        </div>
        </div>
        `;
    main.insertAdjacentHTML("beforeend", movieEl);

   
   
  });

};

const form = document.getElementById("form");
const search = document.getElementById("search");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = search.value;
  if (searchTerm && searchTerm !== "") {
    getMovies(search_url + searchTerm);
    searchTerm.value = "";
  } else {
    window.location.reload();
  }
});

nextBtn = document.getElementById("nextBtn");
nextBtn.addEventListener("click", (e) => {
  
  e.preventDefault();
  api_url =  `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${api}&page=${++page}`

  getMovies(api_url);
});


prevBtn = document.getElementById("prevBtn");
prevBtn.addEventListener("click", (e) => {
   
        prevBtn.disabled = false
        e.preventDefault();
        api_url =  `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${api}&page=${--page}`
      
        getMovies(api_url);

   
});