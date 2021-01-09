import React, { useState, useEffect } from 'react';
import InfoCards from './components/Main/InfoCards';
import TopBar from './components/Main/TopBar';

function App() {
  const [countries, setCountries] = useState([]);
  const [countriesInfo, setCountriesInfo] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('global');
  const [globalInfo, setGlobalInfo] = useState({});
  const [histories, setHistories] = useState([]);

  // Set Countries name, Countries info
  useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/countries')
      .then((res) => res.json())
      .then((datas) => {
        // Set Countries name
        setCountries(datas.map((data) => data.country));
        // Set Countries info
        setCountriesInfo(
          datas.map((data) => {
            return {
              country: data.country,
              lat: data.countryInfo.lat,
              long: data.countryInfo.long,
              cases: data.cases,
              todayCases: data.todayCases,
              deaths: data.deaths,
              todayDeaths: data.todayDeaths,
              recovered: data.recovered,
              todayRecovered: data.todayRecovered,
              active: data.active,
            };
          })
        );
      });
  }, []);

  // Set Global Info
  useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/all')
      .then((res) => res.json())
      .then((data) => {
        setGlobalInfo({
          country: 'global',
          lat: 0,
          long: 0,
          cases: data.cases,
          todayCases: data.todayCases,
          deaths: data.deaths,
          todayDeaths: data.todayDeaths,
          recovered: data.recovered,
          todayRecovered: data.todayRecovered,
          active: data.active,
        });
      });
  }, []);

  // Set Countries' histories
  useEffect(() => {
    let country = selectedCountry === 'global' ? 'all' : selectedCountry;

    fetch(`https://disease.sh/v3/covid-19/historical/${country}`)
      .then((res) => res.json())
      .then((datas) => {
        if (country === 'all') {
          setHistories(datas);
        } else {
          setHistories(datas.timeline);
        }
        console.log(datas);
      });
  }, [selectedCountry]);

  return (
    <div className='app'>
      <section className='app__main'>
        <TopBar countries={countries} setSelectedCountry={setSelectedCountry} />
        <InfoCards />
      </section>
    </div>
  );
}

export default App;
