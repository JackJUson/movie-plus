// API 1: https://api.themoviedb.org/3/search/movie?api_key=2269437d4f4dc8cefddc0b2f852029a4&language=en-US&query=REPLACETHIS&page=1&include_adult=false

let searchInput;

const input = document.getElementById("search__input");
const button = document.getElementById("search__button");

input.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    button.click();
  }
})

button.addEventListener('click', renderSearchedMovies);

function renderSearchedMovies() {
  searchInput = input.value;
  mainApi = `https://api.themoviedb.org/3/search/movie?api_key=2269437d4f4dc8cefddc0b2f852029a4&language=en-US&query=${searchInput}&page=1&include_adult=false`;
  moviesData = null;
  renderMovies();
}

