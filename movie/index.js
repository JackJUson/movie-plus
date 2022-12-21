// API 1: "https://api.themoviedb.org/3/trending/movie/week?api_key=2269437d4f4dc8cefddc0b2f852029a4"
// API 2: "https://api.themoviedb.org/3/genre/movie/list?api_key=2269437d4f4dc8cefddc0b2f852029a4&language=en-US"

async function main() {
  const movies = await fetch(
    "https://api.themoviedb.org/3/trending/movie/week?api_key=2269437d4f4dc8cefddc0b2f852029a4"
  );
  const moviesData = await movies.json();

  const movieListElement = document.querySelector(".movies__list");
  movieListElement.innerHTML = moviesData.results
    .map((movie) => movieHTML(movie))
    .join("");
}

main();
