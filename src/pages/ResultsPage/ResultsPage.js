import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from '../../components/MovieCard/MovieCard';
import './ResultsPage.scss';

export default function ResultsPage() {
  const [results, setResults] = useState([]);
  // const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const location = useLocation();
  const { rating, genre, time } = location.state;
  // const allMovies = [];

  const token = process.env.REACT_APP_API_TOKEN;
  const apiBody = process.env.REACT_APP_API_BODY;
  const apiKey = process.env.REACT_APP_API_KEY;
  console.log(apiKey);
  //with_genres=10751%2C${genre}
  //with_genres=${genre}&without_genres=10751

  // /movie/${id}?api_key=${apiKey}&language=en-US

  useEffect(() => {
    const childrenRating = ['G', 'PG', 'PG-13'];
    const getByGenre = async () => {
      try {
        //if its family friendly -- need to do additional check about pg-13
        if (rating === 'yes') {
          let res = await axios.get(
            `${apiBody}/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&with_genres=${genre}&without_genres=27`,
            {
              headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const array = [];
          for (let i = 0; i < res.data.results.length; i++) {
            let newRes = await axios.get(
              `${apiBody}/movie/${res.data.results[i].id}?api_key=${apiKey}&append_to_response=release_dates`,
              {
                headers: {
                  Accept: 'application/json',
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            let dates = newRes.data.release_dates.results.find((date) => {
              return date.iso_3166_1 === 'US';
            });
            if (
              newRes.data.runtime <= time &&
              dates &&
              childrenRating.includes(dates.release_dates[0].certification)
            ) {
              array.push(newRes.data);
            }
          }
          console.log(array);
          // if (results.length + array.length < 10) {
          //   setPage(page + 1);
          //   setResults((results) => [...results, ...array]);
          // }
          setResults(array);
        } else {
          //not family friendly -- need to do additional check about pg-13
          let res = await axios.get(
            `${apiBody}/discover/movie?include_adult=false&include_video=false&language=en-US&sort_by=popularity.desc&with_genres=${genre}&without_genres=10751`,
            {
              headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const array = [];
          for (let i = 0; i < res.data.results.length; i++) {
            let newRes = await axios.get(
              `${apiBody}/movie/${res.data.results[i].id}?api_key=${apiKey}&append_to_response=release_dates`,
              {
                headers: {
                  Accept: 'application/json',
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            let dates = newRes.data.release_dates.results.find((date) => {
              return date.iso_3166_1 === 'US';
            });
            if (
              newRes.data.runtime <= time &&
              dates &&
              !childrenRating.includes(dates.release_dates[0].certification)
            ) {
              array.push(newRes.data);
            }
          }
          console.log(array);
          setResults(array);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getByGenre();
  }, [genre, rating, time, page]);

  if (results.length === 0) return <h1 className='loading'>Loading...</h1>;

  return (
    <div className='results'>
      <h1 className='results__header'>Pick a Movie!</h1>
      <div className='results__container'>
        {results.map((movie, i) => {
          return <MovieCard key={i} movie={movie} />;
        })}
      </div>
    </div>
  );
}
