import React, { useState } from 'react';
import InfoCard from './InfoCard';

function InfoCards({
  selectedCountry,
  globalInfo,
  selectedCountryInfo,
  history,
}) {
  const data = [1, 2, 3, 4, 6, -1, 3];
  const colors = {
    confirmed: '#cf2828',
    active: '#3571FE',
    recovered: '#0ADB49',
    deaths: '#848383',
  };
  const [animateCardStyle, setAnimateCardStyle] = useState({
    backgroundColor: colors.confirmed,
  });

  return (
    <div id='info-cards'>
      <div className='card info-animate-card'></div>
      <InfoCard
        color={colors.confirmed}
        data={data}
        typeName='confirmed'
        animateCardStyle={animateCardStyle}
        setAnimateCardStyle={setAnimateCardStyle}
        cardNumber={0}
        info={selectedCountry === 'global' ? globalInfo : selectedCountryInfo}
        history={history}
      />
      <InfoCard
        color={colors.active}
        data={data}
        typeName='active'
        setAnimateCardStyle={setAnimateCardStyle}
        cardNumber={1}
        info={selectedCountry === 'global' ? globalInfo : selectedCountryInfo}
        history={history}
      />
      <InfoCard
        color={colors.recovered}
        data={data}
        typeName='recovered'
        setAnimateCardStyle={setAnimateCardStyle}
        cardNumber={2}
        info={selectedCountry === 'global' ? globalInfo : selectedCountryInfo}
        history={history}
      />
      <InfoCard
        color={colors.deaths}
        data={data}
        typeName='deaths'
        setAnimateCardStyle={setAnimateCardStyle}
        cardNumber={3}
        info={selectedCountry === 'global' ? globalInfo : selectedCountryInfo}
        history={history}
      />
    </div>
  );
}

export default InfoCards;
