import './FamilyFriendly.scss';

export default function FamilyFriendly({ handleRatingClick, rating }) {
  return (
    <div className={`rating ${rating.length === 0 ? 'rating__show' : ''}`}>
      <h2 className='rating__header'>Family friendly?</h2>
      <div className='rating__buttons'>
        <button
          type='click'
          value='yes'
          onClick={handleRatingClick}
          className='rating__button rating__buttons--yes'
        >
          Yes
        </button>
        <button
          type='click'
          value='no'
          onClick={handleRatingClick}
          className='rating__button rating__buttons--no'
        >
          No
        </button>
      </div>
    </div>
  );
}
