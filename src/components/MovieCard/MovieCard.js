import './MovieCard.scss';

export default function MovieCard({ movie }) {
  return (
    <div className='movie-card'>
      <img
        className='movie-card__image'
        alt='movie poster'
        src={movie.banner}
      />
      <h4 className='movie-card__title'>{movie.title}</h4>
      <p className='movie-card__year'>{movie.year}</p>
      <p className='movie-card__score'>{movie.rating}/10</p>
    </div>
  );
}
