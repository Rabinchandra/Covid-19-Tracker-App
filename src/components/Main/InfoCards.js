import React, { useState } from 'react';
import InfoCard from './InfoCard';

function InfoCards() {
  const data = [5, 10, 5, 6, 11, 15];
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
        name='confirmed'
        animateCardStyle={animateCardStyle}
        setAnimateCardStyle={setAnimateCardStyle}
        cardNumber={0}
      />
      <InfoCard
        color={colors.active}
        data={data}
        name='active'
        setAnimateCardStyle={setAnimateCardStyle}
        cardNumber={1}
      />
      <InfoCard
        color={colors.recovered}
        data={data}
        name='recovered'
        setAnimateCardStyle={setAnimateCardStyle}
        cardNumber={2}
      />
      <InfoCard
        color={colors.deaths}
        data={data}
        name='deaths'
        setAnimateCardStyle={setAnimateCardStyle}
        cardNumber={3}
      />
    </div>
  );
}

export default InfoCards;
