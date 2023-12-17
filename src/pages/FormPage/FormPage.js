import FamilyFriendly from '../../components/FamilyFriendly/FamilyFriendly';
import Genre from '../../components/Genre/Genre';
import Time from '../../components/Time/Time';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FormPage.scss';

const genreDictionary = [
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 99, name: 'Documentary' },
  { id: 18, name: 'Drama' },
  { id: 10751, name: 'Family' },
  { id: 36, name: 'History' },
  { id: 27, name: 'Horror' },
  { id: 10402, name: 'Music' },
  { id: 9648, name: 'Mystery' },
  { id: 10749, name: 'Romance' },
  { id: 878, name: 'Science Fiction' },
  { id: 53, name: 'Thriller' },
  { id: 10752, name: 'War' },
  { id: 37, name: 'Western' },
];

export default function FormPage() {
  const [rating, setRating] = useState('');
  const [genre, setGenre] = useState(0);
  const [time, setTime] = useState({
    hours: '',
    minutes: '',
  });

  const navigate = useNavigate();

  const handleRatingClick = (e) => {
    e.preventDefault();
    setRating(e.target.value);
  };

  const handleGenreClick = (e) => {
    e.preventDefault();
    let genreObject = genreDictionary.find(
      (genre) => genre.name === e.target.getAttribute('value')
    );
    setGenre(genreObject.id);
  };

  const handleTimeClick = (e) => {
    e.preventDefault();
    navigate('/results', {
      state: {
        rating: rating,
        genre: genre,
        time: Number(time.hours * 60) + Number(time.minutes),
      },
    });
    // }
  };

  return (
    <form className='form'>
      <FamilyFriendly handleRatingClick={handleRatingClick} rating={rating} />
      <Genre
        rating={rating}
        genre={genre}
        handleGenreClick={handleGenreClick}
      />
      <Time
        genre={genre}
        time={time}
        handleTimeClick={handleTimeClick}
        setTime={setTime}
      />
    </form>
  );
}
