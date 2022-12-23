// API 1: "https://api.themoviedb.org/3/trending/movie/week?api_key=2269437d4f4dc8cefddc0b2f852029a4"
// API 2: "https://api.themoviedb.org/3/genre/movie/list?api_key=2269437d4f4dc8cefddc0b2f852029a4&language=en-US"

const maxNumMovies = 16; // Numbers fixed should be changed depending on users page view
let moviesData;
let movies = [];
let mainApi = "https://api.themoviedb.org/3/trending/movie/week?api_key=2269437d4f4dc8cefddc0b2f852029a4";

async function renderMovies(filter) {
  if (!moviesData) {
    const moviesApi = await fetch(mainApi);
    moviesData = await moviesApi.json();
    movies = [];
    movies.push(...moviesData.results);
  }

  if (filter === 'FEATURED') {
    movies = [];
    movies.push(...moviesData.results);
  } else if (filter === 'NEWEST') {
    movies.sort((a, b) => Date.parse(b.release_date) - Date.parse(a.release_date));
  } else if (filter === 'OLDEST') {
    movies.sort((a, b) => Date.parse(a.release_date) - Date.parse(b.release_date));
  } else if (filter === 'RATING') {
    movies.sort((a, b) => b.popularity - a.popularity);
  }

  const genresApi = await fetch(
    "https://api.themoviedb.org/3/genre/movie/list?api_key=2269437d4f4dc8cefddc0b2f852029a4&language=en-US"
  );
  const genresData = await genresApi.json();

  const movieListElement = document.querySelector(".movies__list");

  // Set each movies list item with the given trending movies data
  movieListElement.innerHTML = movies
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
  const genrePara = genres.map((genre) => `<div class="movie__genre">${genre}</div>\n`);

  return `<div class="movie__container">
            <div class="movie">
              <img class="movie__img" src=${
                "https://image.tmdb.org/t/p/w500" + movie.poster_path
              } alt="">
              <div class="movie__description">
                <h3 class="movie__title">${movie.title}</h3>
                <div class="movie__genres">
                  ${genrePara.join('')}
                </div>
              </div>
            </div>
          </div>`;
}

function filterMovies(event) {
  renderMovies(event.target.value);
}
