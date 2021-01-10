import React from 'react';
import numeral from 'numeral';

function TopBar({ countries, setSelectedCountry, tests }) {
  return (
    <div id='main__topbar'>
      {/* Title */}
      <header className='topbar__title'>
        COVID 19 <small>Tracker</small>
      </header>

      <div className='topbar__info'>
        <section className='tested'>
          <span>Tested</span> <br />
          <strong>{numeral(tests).format('0,0')}</strong>
        </section>

        <section
          className='select-countries'
          onChange={(e) => setSelectedCountry(e.target.value)}>
          <select name='countries' id='countries'>
            <option value='global'>Global</option>
            {countries.map((country, index) => (
              <option
                value={country.toLowerCase()}
                key={`country-option-${index}`}>
                {country}
              </option>
            ))}
          </select>
        </section>
      </div>
    </div>
  );
}

export default TopBar;
