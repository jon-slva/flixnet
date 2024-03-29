import popcornIcon from '../../assets/popcorn.png';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './HomePage.scss';

export default function HomePage() {
  const [disappear, setDisappear] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    setDisappear(true);
    setTimeout(() => {
      navigate('/form');
    }, 500);
  };

  return (
    <main className='main'>
      <div className={`intro ${disappear ? 'disappear' : 'appear'}`}>
        <h1 className='intro__header'>Hello!</h1>
        <img className='intro__img' src={popcornIcon} alt='popcorn bucket' />
        <button type='click' className='intro__button' onClick={handleClick}>
          Get Started
        </button>
      </div>
    </main>
  );
}
