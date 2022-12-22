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
  movieListElement.innerHTML = moviesData.results.slice(0, 12)
    .map((movie) => movieHTML(movie, genresData))
    .join("");
}

main();

function showMovieGenre(ids, data) {
  const genreNames = [];
  for (const genre of data.genres) {
    ids.forEach(id => { 
      if (genre.id === id) genreNames.push(genre.name) 
    });
  }
  return genreNames;
}

function movieHTML(movie, genres) {
  const genresArray = showMovieGenre(movie.genre_ids, genres);

  // inner function returns the array split in p tags 

  const new1 = genresArray.map((genre) => `<p class="movie__genre">${genre}</p>\n`);

  return `<div class="movie__container">
            <img class="movie__img" src=${
              "https://image.tmdb.org/t/p/w500" + movie.poster_path
            } alt="">
            <div class="movie__description">
              <h3 class="movie__title">${movie.title}</h3>
              ${new1.join('')}
            </div>
          </div>`;
}
