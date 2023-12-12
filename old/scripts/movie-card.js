const resultsSec = document.querySelector("main");
let moviesContainer = document.createElement("section");
moviesContainer.classList.add("movies__container");
resultsSec.appendChild(moviesContainer);

function createMovieCard(movie) {
  const movieCard = document.createElement("div");
  movieCard.classList.add("movie-card");
  const movieImage = document.createElement("img");
  movieImage.setAttribute("src", movie.results.banner);
  movieImage.classList.add("movie-card__image");
  const movieTitle = document.createElement("h4");
  movieTitle.classList.add("movie-card__title");
  movieTitle.innerText = movie.results.title;
  const movieYear = document.createElement("p");
  movieYear.classList.add("movie-card__year");
  movieYear.innerText = movie.results.year;
  const movieScore = document.createElement("p");
  movieScore.classList.add("movie-card__score");
  movieScore.innerText = movie.results.rating + "/10";
  movieCard.appendChild(movieImage);
  movieCard.appendChild(movieTitle);
  movieCard.appendChild(movieYear);
  movieCard.appendChild(movieScore);
  console.log(movieCard);
  // return movieCard;
  moviesContainer.appendChild(movieCard);
}
// const resultsSec = document.querySelector('main');
// let moviesContainer = document.createElement('section');
// moviesContainer.classList.add('movies__container');
// resultsSec.appendChild(moviesContainer);
// let renderMovies = (movies) => {
//   for (let i = 0; i < movies.length; i++) {
//     const movieEl = createMovieCard(movies[i]);
//     moviesContainer.appendChild(movieEl);
//   }
// };
// renderMovies(movies);
