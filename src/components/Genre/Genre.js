import './Genre.scss';

export default function Genre({ rating, handleGenreClick, genre }) {
  return (
    <div
      className={`mood ${rating.length > 0 ? 'mood__show' : ''} ${
        genre === 0 ? '' : 'mood__dissapear'
      }`}
    >
      <h2>What mood are you in?</h2>
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
