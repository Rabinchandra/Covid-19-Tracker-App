import React, { useState } from 'react';
import InfoCard from './InfoCard';

function InfoCards({
  selectedCountry,
  globalInfo,
  selectedCountryInfo,
  history,
  colors,
  setSelectedType,
}) {
  const [animateCardStyle, setAnimateCardStyle] = useState({
    backgroundColor: colors.confirmed,
  });

  return (
    <div id='info-cards'>
      <div className='card info-animate-card'></div>
      <InfoCard
        color={colors.confirmed}
        typeName='confirmed'
        animateCardStyle={animateCardStyle}
        setAnimateCardStyle={setAnimateCardStyle}
        cardNumber={0}
        info={selectedCountry === 'global' ? globalInfo : selectedCountryInfo}
        history={history}
        setSelectedType={setSelectedType}
      />
      <InfoCard
        color={colors.active}
        typeName='active'
        setAnimateCardStyle={setAnimateCardStyle}
        cardNumber={1}
        info={selectedCountry === 'global' ? globalInfo : selectedCountryInfo}
        history={history}
        setSelectedType={setSelectedType}
      />
      <InfoCard
        color={colors.recovered}
        typeName='recovered'
        setAnimateCardStyle={setAnimateCardStyle}
        cardNumber={2}
        info={selectedCountry === 'global' ? globalInfo : selectedCountryInfo}
        history={history}
        setSelectedType={setSelectedType}
      />
      <InfoCard
        color={colors.deaths}
        typeName='deaths'
        setAnimateCardStyle={setAnimateCardStyle}
        cardNumber={3}
        info={selectedCountry === 'global' ? globalInfo : selectedCountryInfo}
        history={history}
        setSelectedType={setSelectedType}
      />
    </div>
  );
}

export default InfoCards;
