import React, { useState, useEffect } from 'react';
import InfoCards from './components/Main/InfoCards';
import TopBar from './components/Main/TopBar';

function App() {
  const [countries, setCountries] = useState([]);
  const [countriesInfo, setCountriesInfo] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('global');
  const [globalInfo, setGlobalInfo] = useState({});
  const [selectedCountryHistory, setSelectedCountryHistory] = useState([]);
  const [selectedCountryInfo, setSelectedCountryInfo] = useState({});

  const calculateTodayActive = (
    active,
    cases,
    deaths,
    recovered,
    todayCases,
    todayDeaths,
    todayRecovered
  ) => {
    const yesterdayCases = cases - todayCases;
    const yesterdayDeaths = deaths - todayDeaths;
    const yesterdayRecovered = recovered - todayRecovered;
    const yesterdayActive =
      yesterdayCases - (yesterdayDeaths + yesterdayRecovered);

    return active - yesterdayActive;
  };

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
            const {
              country,
              cases,
              todayCases,
              deaths,
              todayDeaths,
              recovered,
              todayRecovered,
              active,
              countryInfo,
              tests,
            } = data;

            return {
              country,
              deaths,
              todayDeaths,
              recovered,
              todayRecovered,
              active,
              tests,
              lat: countryInfo.lat,
              long: countryInfo.long,
              confirmed: cases,
              todayConfirmed: todayCases,
              todayActive: calculateTodayActive(
                active,
                cases,
                deaths,
                recovered,
                todayCases,
                todayDeaths,
                todayRecovered
              ),
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
        const {
          cases,
          todayCases,
          deaths,
          todayDeaths,
          recovered,
          todayRecovered,
          active,
          tests,
        } = data;
        setGlobalInfo({
          country: 'global',
          lat: 0,
          long: 0,
          confirmed: cases,
          todayConfirmed: todayCases,
          deaths,
          todayDeaths,
          recovered,
          todayRecovered,
          active,
          tests,
          todayActive: calculateTodayActive(
            active,
            cases,
            deaths,
            recovered,
            todayCases,
            todayDeaths,
            todayRecovered
          ),
        });
      });
  }, []);

  // Set Countries' SelectedCountryHistory
  useEffect(() => {
    let country = selectedCountry === 'global' ? 'all' : selectedCountry;

    fetch(`https://disease.sh/v3/covid-19/historical/${country}`)
      .then((res) => res.json())
      .then((datas) => {
        if (country === 'all') {
          setSelectedCountryHistory({ country: 'global', ...datas });
        } else {
          setSelectedCountryHistory({
            country: datas.country,
            ...datas.timeline,
          });
        }
      });
  }, [selectedCountry]);

  // Update Selected country info when selected country change
  useEffect(() => {
    const found = countriesInfo.find(
      (country) =>
        country.country.toLowerCase() === selectedCountry.toLowerCase()
    );
    setSelectedCountryInfo(found);
  }, [selectedCountry]);

  return (
    <div className='app'>
      <section className='app__main'>
        <TopBar
          countries={countries}
          setSelectedCountry={setSelectedCountry}
          tests={
            selectedCountry === 'global'
              ? globalInfo.tests
              : selectedCountryInfo?.tests
          }
        />
        <InfoCards
          selectedCountry={selectedCountry}
          globalInfo={globalInfo}
          selectedCountryInfo={selectedCountryInfo}
          history={selectedCountryHistory}
        />
      </section>
    </div>
  );
}

export default App;
