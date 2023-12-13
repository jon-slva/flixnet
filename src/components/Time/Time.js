import './Time.scss';

export default function Time({ hide, time, setTime, handleTimeClick }) {
  const handleInputChange = (e) => {
    // console.log(time);
    const { name, value } = e.target;
    setTime({
      ...time,
      [name]: value,
    });
  };
  return (
    <div className={`time ${hide ? 'time__show' : ''}`}>
      <h2 className='time__header'>How much time do you have?</h2>
      <div className='time__container'>
        <input
          type='text'
          name='hours'
          id='hours'
          value={time.hours}
          placeholder='number of hours'
          className='time__hours-input'
          onChange={handleInputChange}
        />
        <label htmlFor='hours' className='time__hours-label'>
          Hours
        </label>
      </div>

      <div className='time__box'>
        <input
          type='text'
          name='minutes'
          value={time.minutes}
          id='minutes'
          placeholder='number of minutes'
          className='time__minutes-input'
          onChange={handleInputChange}
        />
        <label htmlFor='minutes' className='time__minutes-label'>
          Minutes
        </label>
      </div>

      <button type='submit' className='form__button' onClick={handleTimeClick}>
        Submit
      </button>
    </div>
  );
}
