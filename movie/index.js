// API 1: "https://api.themoviedb.org/3/trending/movie/week?api_key=2269437d4f4dc8cefddc0b2f852029a4"
// API 2: "https://api.themoviedb.org/3/genre/movie/list?api_key=2269437d4f4dc8cefddc0b2f852029a4&language=en-US"

async function main() {
  const movies = await fetch(
    "https://api.themoviedb.org/3/trending/movie/week?api_key=2269437d4f4dc8cefddc0b2f852029a4"
  );
  const moviesData = await movies.json();

  const genres = await fetch(
    "https://api.themoviedb.org/3/genre/movie/list?api_key=2269437d4f4dc8cefddc0b2f852029a4&language=en-US"
  );
  const genresData = await genres.json();

  const movieListElement = document.querySelector(".movies__list");
  movieListElement.innerHTML = moviesData.results
    .map((movie) => movieHTML(movie, genresData))
    .join("");
}

main();

function movieHTML(movie, genresData) {
  return `<div class="movie">
                <div class="movie_-container">
                    <h3>${movie.title}</h3>
                    <p>${showMovieGenre(movie.genre_ids, genresData)}</p>
                    <img src=${
                      "https://image.tmdb.org/t/p/w500" + movie.poster_path
                    } alt="">
                </div>
            </div>`;
}
