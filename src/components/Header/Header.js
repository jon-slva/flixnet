import filmLogo from '../../assets/film3.png';
import './Header.scss';

export default function Header() {
  return (
    <section className='header'>
      <nav className='nav'>
        <div className='nav__logo'>
          <a href='/'>
            <p className='nav__logo--name'>FLIXNET</p>
          </a>
          <a className='logo' href='/'>
            <img className='nav__logo--icon' alt='film' src={filmLogo} />
          </a>
        </div>
        <a href='/'>
          <p className='nav__start-over'>Start over</p>
        </a>
      </nav>
    </section>
  );
}
