//this we will get with event.target.rating.value

let moodDivider = document.querySelector(".mood");
moodDivider.classList.add("display-none");
let timeDivider = document.querySelector(".time");
timeDivider.classList.add("display-none");
let famDivider = document.querySelector(".family");
famDivider.classList.add("display-none");

let childrenContentRating = ["G", "PG", "PG-13"];
let adultContentRating = ["R", "NC-17"];
let rating = [];

//event listener for the yes/no rating
let familyButtons = document.querySelectorAll(".family__button");
familyButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    // console.log(event.target.value);
    if (event.target.value === "yes") {
      rating = childrenContentRating;
      //   console.log(rating);
    } else {
      rating = adultContentRating;
      //   console.log(rating);
    }
    famDivider.classList.add("disappear");
    moodDivider.classList.add("appear");
    moodDivider.classList.remove("display-none");
    console.log(rating);
  });
});

let movieGenre = "";
let emojis = document.querySelectorAll(".mood__option");
emojis.forEach((emoji) => {
  emoji.addEventListener("click", (event) => {
    event.preventDefault();
    // console.log(event.target.id);
    switch (event.target.id) {
      case "laugh":
        movieGenre = "Comedy";
        console.log(movieGenre);
        break;
      case "sad":
        movieGenre = "Drama";
        console.log(movieGenre);
        break;
      case "intrigued":
        movieGenre = "Documentary";
        console.log(movieGenre);
        break;
      case "scared":
        movieGenre = "Horror";
        console.log(movieGenre);
        break;
      case "stressed":
        movieGenre = "Thriller";
        console.log(movieGenre);
        break;
      case "excited":
        movieGenre = "Action";
        console.log(movieGenre);
        break;
    }
    moodDivider.classList.add("disappear");
    timeDivider.classList.remove("display-none");
    timeDivider.classList.add("appear");
    // console.log(rating);
    // callAPI(movieGenre);
  });
});

let movieLength = 0;

let form = document.querySelector(".questionnaire");
let intro = document.querySelector(".intro");
let loading = document.querySelector(".loading-container");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  movieLength =
    Number(event.target.hours.value * 60) + Number(event.target.minutes.value);

  moviesByGenre(movieGenre);
  // let main = document.querySelector('main');
  form.style.display = "none";
  intro.style.display = "none";
  // window.location.href = '../results.html';
});

async function moviesByGenre(genre) {
  try {
    let movies = await mlAPI.getMoviesByGenre(genre);
    console.log(movies);
    // let movie = await mlAPI.getMoviebyID('tt0104040');
    // console.log(movie);
    matchMoviesRating(movies);
  } catch (e) {
    console.log(e);
  }
}

async function matchMoviesRating(movies) {
  let moviesArray = [];
  for (let i = 0; i < movies.length; i++) {
    try {
      let m = await mlAPI.getMoviebyID(movies[i].imdb_id);
      if (rating.includes(m.results.content_rating)) {
        moviesArray.push(m);
      }
    } catch (error) {
      console.log(error);
    }
  }
  loading.style.display = "none";
  matchMovieTimes(moviesArray);
}

// //this we will get with event.target.movie_length.value

function matchMovieTimes(moviesArray) {
  let finalArray = [];
  for (let i = 0; i < moviesArray.length; i++) {
    if (moviesArray[i].results.movie_length <= movieLength) {
      finalArray.push(moviesArray[i]);
      console.log(moviesArray[i]);
      // createMovieCard(moviesArray[i]);
    }
  }
  finalArray.forEach((movie) => {
    createMovieCard(movie);
  });
  //create movie cards on the final screen
  // console.log(finalArray);
}

let finalSubmit = document.querySelector(".form__submit");

// finalSubmit.addEventListener('submit', (event) => {
//   console.log('in event listener');
//   moviesByGenre(movieGenre);
//   // console.log(event);
// });
let introSection = document.querySelector(".intro");
let introButton = document.querySelector(".intro__button");
introButton.addEventListener("click", (event) => {
  event.preventDefault();
  introSection.classList.add("disappear");
  famDivider.classList.add("appear");
  famDivider.classList.remove("display-none");
});
