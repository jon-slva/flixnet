import { useState } from 'react';
import './MovieCard.scss';

export default function MovieCard({ movie }) {
  const [isLoaded, setIsLoaded] = useState(false);

  // console.log(movie.homepage);
  const movieRatingReformatter = () => {
    return movie.vote_average.toFixed(2);
  };

  return (
    <div className={`movie-card ${isLoaded ? 'loaded' : 'loading'}`}>
      <img
        className='movie-card__image'
        alt='movie poster'
        src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
        onLoad={() => setIsLoaded(true)}
      />
      <h4 className='movie-card__title'>{movie.title}</h4>
      <p className='movie-card__year'>{movie.release_date.split('-')[0]}</p>
      <p className='movie-card__score'>{movieRatingReformatter()} / 10</p>
    </div>
  );
}
