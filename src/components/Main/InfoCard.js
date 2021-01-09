import React from 'react';
import { motion } from 'framer-motion';
import { Sparklines, SparklinesSpots, SparklinesLine } from 'react-sparklines';

function InfoCard({
  color,
  data,
  name,
  animateCardStyle,
  setAnimateCardStyle,
  cardNumber,
}) {
  const changeAnimateCardStyle = () => {
    // Change Animate Card style
    setAnimateCardStyle({
      backgroundColor: color,
      transform: `translateX(${cardNumber * 100}%)`,
    });
  };

  return (
    <section
      className={`info-card`}
      style={{ color: color }}
      onClick={changeAnimateCardStyle}>
      {/* Animate card show if animateStyle is defined*/}
      {animateCardStyle ? (
        <motion.div
          className='animate-card'
          animate={animateCardStyle}></motion.div>
      ) : (
        ''
      )}
      {/* Card infomations */}
      <strong className='info-card__name'>{name}</strong>
      <p className='info-card__incremented'>+4,500</p>
      <p className='info-card__main-value'>66,57,500</p>
      <div className='graph'>
        <Sparklines
          data={data}
          limit={data.length}
          style={{ width: '100%' }}
          width={70}
          height={30}
          margin={6}>
          <SparklinesLine
            color={color}
            style={{ strokeWidth: 1, fill: 'none' }}
          />
          <SparklinesSpots size={1} style={{ stroke: color, fill: 'white' }} />
        </Sparklines>
      </div>
    </section>
  );
}

export default InfoCard;
