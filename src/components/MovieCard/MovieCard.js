import './MovieCard.scss';

export default function MovieCard({ movie }) {
  return (
    <div className='movie-card'>
      <img
        className='movie-card__image'
        alt='movie poster'
        src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
      />
      <h4 className='movie-card__title'>{movie.title}</h4>
      <p className='movie-card__year'>{movie.release_date.split('-')[0]}</p>
      <p className='movie-card__score'>{movie.vote_average}/10</p>
    </div>
  );
}
