import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import MovieCard from '../../components/MovieCard/MovieCard';
import './ResultsPage.scss';

export default function ResultsPage() {
  const [results, setResults] = useState([]);
  const location = useLocation();
  const { rating, genre, time, movies } = location.state;

  useEffect(() => {
    const getResults = async () => {
      setResults(movies.filter((movie) => movie.movie_length <= time));
    };
    getResults();
  }, []);

  if (results.length === 0) return <h1>Loading...</h1>;
  console.log(results);

  return (
    <div className='results'>
      <h1 className='results__title'>Pick a Movie!</h1>
      <div className='results__container'>
        {results.map((movie, i) => {
          return <MovieCard key={i} movie={movie} />;
        })}
      </div>
    </div>
  );
}
