import React, { useState, useEffect } from 'react';
import InfoCards from './components/main/InfoCards';
import TopBar from './components/main/TopBar';
import Map from './components/main/Map';
import LiveCasesList from './components/sideinfo/LiveCasesList';

function App() {
  const [countries, setCountries] = useState([]);
  const [countriesInfo, setCountriesInfo] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('global');
  const [globalInfo, setGlobalInfo] = useState({});
  const [selectedCountryHistory, setSelectedCountryHistory] = useState([]);
  const [selectedCountryInfo, setSelectedCountryInfo] = useState({});
  const [selectedType, setSelectedType] = useState('confirmed');

  const colors = {
    confirmed: '#cf2828',
    active: '#3571FE',
    recovered: '#0ADB49',
    deaths: '#848383',
  };

  // Calculate Today's incremented Active
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
              flag: countryInfo.flag,
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

  useEffect(() => {
    if (countriesInfo.length) {
      // Sort Countries by selected Type in descending order
      setCountriesInfo(
        countriesInfo.sort((a, b) => b[selectedType] - a[selectedType])
      );
    }
  }, [selectedType, countriesInfo]);

  return (
    <div className='app'>
      <div className='app__container'>
        <section className='app-container__main'>
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
            colors={colors}
            setSelectedType={setSelectedType}
          />
          <Map
            countriesInfo={countriesInfo}
            selectedType={selectedType}
            colors={colors}
            selectedCountry={selectedCountry}
          />
        </section>
        <section className='app-container__sideInfo'>
          <LiveCasesList countriesInfo={countriesInfo} />
        </section>
      </div>

      <footer className='app__footer'>
        <div>Web Designed by Rabin</div>
      </footer>
    </div>
  );
}

export default App;
