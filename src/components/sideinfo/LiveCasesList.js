import React from 'react';
import numeral from 'numeral';

function LiveCasesList({ countriesInfo }) {
  return (
    <div id='live-cases-list-container'>
      <h4 className='heading'>Live confirmed cases by country</h4>
      <ul className='live-cases-list'>
        {countriesInfo
          ?.sort((a, b) => b.confirmed - a.confirmed)
          .map((countryInfo) => (
            <li>
              <div>{countryInfo.country}</div>
              <div>{numeral(countryInfo.confirmed).format('0,0')}</div>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default LiveCasesList;
