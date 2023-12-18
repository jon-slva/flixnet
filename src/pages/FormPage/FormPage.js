import FamilyFriendly from '../../components/FamilyFriendly/FamilyFriendly';
import Genre from '../../components/Genre/Genre';
import Time from '../../components/Time/Time';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './FormPage.scss';

const childrenContentRating = ['G', 'PG', 'PG-13'];
const adultContentRating = ['R', 'NC-17'];

export default function FormPage() {
  const [disappear, setDisappear] = useState(false);
  const [rating, setRating] = useState([]);
  const [genre, setGenre] = useState('');
  const [time, setTime] = useState({
    hours: '',
    minutes: '',
  });
  const [movies, setMovies] = useState([]);
  const apiKey = 'fb91b136dcmsh82a8f4a5d7c7771p197ee4jsn8bbb9ef510bd';
  const apiBody = 'https://moviesminidatabase.p.rapidapi.com/movie';

  const navigate = useNavigate();

  const handleRatingClick = (e) => {
    e.preventDefault();
    // setRating(e.target.value);
    if (e.target.value === 'yes') {
      setRating(childrenContentRating);
    } else {
      setRating(adultContentRating);
    }
  };

  const handleGenreClick = (e) => {
    e.preventDefault();
    setGenre(e.target.getAttribute('value'));
  };

  const handleTimeClick = (e) => {
    e.preventDefault();
    if (movies.length > 0) {
      navigate('/results', {
        state: {
          rating: rating,
          genre: genre,
          time: Number(time.hours * 60) + Number(time.minutes),
          movies: movies,
        },
      });
    }
  };

  const getById = async (id) => {
    let res = await axios.get(`${apiBody}/id/${id}/`, {
      headers: {
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': 'moviesminidatabase.p.rapidapi.com',
      },
    });
    if (rating.includes(res.data.results.content_rating)) {
      setMovies((movies) => [...movies, res.data.results]);
    }
  };

  useEffect(() => {
    const getByGenre = async () => {
      try {
        let response = await axios.get(`${apiBody}/byGen/${genre}/`, {
          headers: {
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': 'moviesminidatabase.p.rapidapi.com',
          },
        });
        for (let i = 0; i < response.data.results.length; i++) {
          try {
            getById(response.data.results[i].imdb_id);
          } catch (error) {
            console.log(error);
          }
        }
      } catch (error) {
        throw error;
      }
    };
    if (genre.length > 0) {
      getByGenre();
    }
  }, [genre]);

  return (
    <main className='main-form'>
      <form className='form'>
        <FamilyFriendly handleRatingClick={handleRatingClick} rating={rating} />
        <Genre ratingState={rating} genreState={genre} handleGenreClick={handleGenreClick} />
        <Time
          genreState={genre}
          timeState={time}
          handleTimeClick={handleTimeClick}
          setTime={setTime}
        />
      </form>
    </main>
  );
}
