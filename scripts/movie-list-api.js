class MovieListAPI {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseURL = "https://moviesminidatabase.p.rapidapi.com/movie/";
  }

  async getMoviesByGenre(genre) {
    try {
      let response = await axios.get(`${this.baseURL}byGen/${genre}/`, {
        headers: {
          "X-RapidAPI-Key": this.apiKey,
          "X-RapidAPI-Host": "moviesminidatabase.p.rapidapi.com",
        },
      });
      return response.data.results;
    } catch (error) {
      throw error;
    }
  }

  async getMoviebyID(id) {
    try {
      let response = await axios.get(`${this.baseURL}id/${id}/`, {
        headers: {
          "X-RapidAPI-Key": this.apiKey,
          "X-RapidAPI-Host": "moviesminidatabase.p.rapidapi.com",
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

// Create an instance of the MovieApiClient with your API key
const apiKey = "fb91b136dcmsh82a8f4a5d7c7771p197ee4jsn8bbb9ef510bd";
const mlAPI = new MovieListAPI(apiKey);

// Usage example
// (async () => {
//   try {
//     const genre = 'Romance';
//     const movies = await mlAPI.getMoviesByGenre(genre);
//     console.log(movies);
//   } catch (error) {
//     console.error(error);
//   }
// })();
