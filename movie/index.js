// API 1: "https://api.themoviedb.org/3/trending/movie/week?api_key=2269437d4f4dc8cefddc0b2f852029a4"
// API 2: "https://api.themoviedb.org/3/genre/movie/list?api_key=2269437d4f4dc8cefddc0b2f852029a4&language=en-US"

const maxNumMovies = 12;

async function renderMovies() {
  const moviesApi = await fetch(
    "https://api.themoviedb.org/3/trending/movie/week?api_key=2269437d4f4dc8cefddc0b2f852029a4"
  );
  const moviesData = await moviesApi.json();

  const genresApi = await fetch(
    "https://api.themoviedb.org/3/genre/movie/list?api_key=2269437d4f4dc8cefddc0b2f852029a4&language=en-US"
  );
  const genresData = await genresApi.json();

  const movieListElement = document.querySelector(".movies__list");

  // Set each movies list item with the given trending movies data
  movieListElement.innerHTML = moviesData.results.slice(0, maxNumMovies)
    .map((movie) => movieHTML(movie, genresData.genres))
    .join('');
}

renderMovies();

function showMovieGenre(movieGenreIds, genreList) {
  const genreNames = [];

  // Filter genre names with matching ids
  for (const genre of genreList) {
    movieGenreIds.forEach(id => { 
      if (genre.id === id) genreNames.push(genre.name) 
    });
  }
  return genreNames;
}

function movieHTML(movie, genreList) {
  // Obtain genre name from the genre id of each movie
  const genres = showMovieGenre(movie.genre_ids, genreList);

  // Converting each genre string within HTML para tag
  const genrePara = genres.map((genre) => `<p class="movie__genre">${genre}</p>\n`);

  return `<div class="movie__container">
            <img class="movie__img" src=${
              "https://image.tmdb.org/t/p/w500" + movie.poster_path
            } alt="">
            <div class="movie__description">
              <h3 class="movie__title">${movie.title}</h3>
              ${genrePara.join('')}
            </div>
          </div>`;
}
