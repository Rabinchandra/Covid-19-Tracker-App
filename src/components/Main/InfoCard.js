import React from 'react';
import { motion, animate } from 'framer-motion';
import { Sparklines, SparklinesSpots, SparklinesLine } from 'react-sparklines';
import { capitalize } from '../../utilities';
import numeral from 'numeral';

function InfoCard({
  color,
  typeName,
  animateCardStyle,
  setAnimateCardStyle,
  cardNumber,
  info,
  history,
  setSelectedType,
}) {
  const changeAnimateCardStyle = () => {
    // Change Animate Card style
    setAnimateCardStyle({
      backgroundColor: color,
      transform: `translateX(${cardNumber * 100}%)`,
    });
  };

  // Get Active History
  const getActiveHistory = () => {
    const confirmedHistory = Object.values(history.cases || {});
    const deathsHistory = Object.values(history.deaths || {});
    const recoveredHistory = Object.values(history.recovered || {});
    // // Calculate active history from each data of confirmed, deaths & recovered history
    const activeHistory = confirmedHistory.map((c, index) => {
      return c - (recoveredHistory[index] + deathsHistory[index]);
    });

    return activeHistory;
  };

  // Get historical data of current data type - confirmed, active,
  // recovered, deaths.
  const getHistoricalData = () => {
    let dataType = typeName === 'confirmed' ? 'cases' : typeName.toLowerCase();

    // history object has cases, deaths & recovered properties but not active
    // So we have to check for active type also.
    if (history[dataType] || typeName === 'active') {
      // if history[dataType] is undefined, then it's active type
      const values = history[dataType]
        ? Object.values(history[dataType])
        : getActiveHistory();

      const maxValue = values.sort((a, b) => b - a)[0];
      const result = [];

      // For each value, get the percentage of value with respect to the
      // highest value of the data and push it to the result array
      values.forEach((val) => result.push(~~((val / maxValue) * 100)));

      return result;
    } else {
      return [];
    }
  };

  // Get Today's incremented value i.e. incremented cases, death, active & recovered
  const getTodayIncremented = () => {
    if (info) {
      const value = info[`today${capitalize(typeName)}`];
      return value > 0 ? numeral(value).format('+0,0') : '+0';
    }
    return '+0';
  };

  return (
    <section
      className={`info-card`}
      style={{ color: color }}
      onClick={() => {
        changeAnimateCardStyle();
        setSelectedType(typeName);
      }}>
      {/* Animate card show if animateStyle is defined */}
      {animateCardStyle ? (
        <motion.div
          className='animate-card'
          animate={animateCardStyle}></motion.div>
      ) : (
        ''
      )}

      {/* Card infomations */}
      <strong className='info-card__name'>{typeName}</strong>
      <p className='info-card__incremented'>{getTodayIncremented()}</p>
      <p className='info-card__main-value'>
        {info ? numeral(info[typeName]).format('0, 0') : ''}
      </p>
      <div className='graph'>
        <Sparklines
          data={getHistoricalData()}
          limit={getHistoricalData().length}
          style={{ width: '100%' }}
          width={40}
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
