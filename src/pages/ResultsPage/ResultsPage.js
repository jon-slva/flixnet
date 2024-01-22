import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from '../../components/MovieCard/MovieCard';
import './ResultsPage.scss';

export default function ResultsPage() {
  const [results, setResults] = useState([]);
  const [extras, setExtras] = useState([]);
  const [page, setPage] = useState(1);
  const [message, setMessage] = useState();
  const location = useLocation();
  const { rating, genre, time } = location.state;

  const token = process.env.REACT_APP_API_TOKEN;
  const apiBody = process.env.REACT_APP_API_BODY;
  const apiKey = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    const childrenRating = ['G', 'PG', 'PG-13'];

    const getByRating = async (fullResponse) => {
      const arr = [];
      for (let i = 0; i < fullResponse.length; i++) {
        let newRes = await axios.get(
          `${apiBody}/movie/${fullResponse[i].id}?api_key=${apiKey}&append_to_response=release_dates`,
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
        if (rating === 'yes') {
          if (
            newRes.data.runtime <= time &&
            dates &&
            childrenRating.includes(dates.release_dates[0].certification)
          ) {
            arr.push(newRes.data);
          }
        } else {
          if (
            newRes.data.runtime <= time &&
            dates &&
            !childrenRating.includes(dates.release_dates[0].certification)
          ) {
            arr.push(newRes.data);
          }
        }
      }
      if (arr.length === 0) {
        return setMessage('No movies fit these specifications!');
      }
      if (arr.length < 12) {
        setResults((results) => [...extras, ...results, ...arr]);
        setPage(page + 1);
      }
      if (arr.length >= 12) {
        let moviesLeft = 12 - extras.length;
        let slicedArray = arr.slice(0, moviesLeft);
        console.log('extras ', extras);
        console.log('sliced ', slicedArray);
        setResults([...extras, ...slicedArray]);
        setExtras(arr.slice(moviesLeft));
      }
    };

    const getByGenre = async () => {
      try {
        let fullResponse = null;
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
          fullResponse = res.data.results;
        } else {
          let res = await axios.get(
            `${apiBody}/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&with_genres=${genre}&without_genres=10751`,
            {
              headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`,
              },
            }
          );
          fullResponse = res.data.results;
        }
        getByRating(fullResponse);
      } catch (error) {
        console.log(error);
      }
    };
    setMessage('Loading...');
    getByGenre();
  }, [genre, rating, time, page, apiBody, apiKey, token]);

  const handleClick = () => {
    console.log('load more');
    setResults([]);
    setPage(page + 1);
  };

  // if (results.length === 0) return <h1 className='loading'>Loading...</h1>;

  return (
    <div className='results'>
      <h1 className='results__header'>Pick a Movie!</h1>
      {message && results.length === 0 && (
        <h2 className='results__message'>{message}</h2>
      )}
      <div className='results__container'>
        {results.map((movie, i) => {
          return <MovieCard key={i} movie={movie} />;
        })}
      </div>
      <button type='click' className='results__button' onClick={handleClick}>
        show me new movies
      </button>
    </div>
  );
}
