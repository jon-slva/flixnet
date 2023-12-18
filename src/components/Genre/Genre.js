import './Genre.scss';

export default function Genre({ ratingState, handleGenreClick, genreState }) {
  return (
    <div
      className={`mood ${ratingState.length > 0 ? 'show-component' : ''} ${
        genreState.length === 0 ? '' : 'hide-component'
      }`}
    >
      <h2 className='mood__header'>What kind of mood are you in?</h2>
      <p className='mood__option' value='Comedy' onClick={handleGenreClick}>
        &#128514;
      </p>
      <p className='mood__option' value='Drama' onClick={handleGenreClick}>
        &#128557;
      </p>
      <p
        className='mood__option'
        value='Documentary'
        onClick={handleGenreClick}
      >
        &#129488;
      </p>
      <p className='mood__option' value='Horror' onClick={handleGenreClick}>
        &#128561;
      </p>
      <p className='mood__option' value='Thriller' onClick={handleGenreClick}>
        &#128534;
      </p>
      <p className='mood__option' value='Action' onClick={handleGenreClick}>
        &#129321;
      </p>
    </div>
  );
}
