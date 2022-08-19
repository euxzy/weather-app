import React, { useState } from 'react';
import axios from 'axios';
import Fade from 'react-reveal/Fade';

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');

  const options = {
    method: 'GET',
    url: process.env.REACT_APP_API_BASE_URL,
    params: {
      key: process.env.REACT_APP_API_KEY,
      q: location,
    },
  };

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.request(options).then((response) => {
        setData(response.data);
      });
      setLocation('');
    }
  };

  return (
    <div className="App bg-gray-900 h-screen w-screen relative overflow-hidden flex flex-col justify-center items-center font-visbyRoundCF">
      <div className="h-screen w-screen absolute bg-image"></div>
      <Fade top>
        <div>
          <div className="mt-10 mb-10">
            <div className="relative mx-auto">
              <input
                type="text"
                className="text-white relative peer z-10 bg-transparent w-12 h-12 outline-none rounded-full border cursor-pointer pl-12 transition-all duration-0 hover:duration-500 focus:rounded-full focus:w-full focus:border-white focus:cursor-text focus:pl-16 focus:pr-4 hover:rounded-full hover:w-full hover:border-white hover:cursor-text hover:pl-16 hover:pr-4 placeholder:text-white"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onKeyPress={searchLocation}
                placeholder="Enter Location"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute inset-y-0 my-auto px-3.5 border-r border-transparent peer-focus:border-white stroke-white h-8 w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          <div className="text-white relative mb-40 w-96 text-right">
            <p className="text-6xl">{data.location ? data.location.name : 'Location'}</p>
            <p className="text-6xl font-visbyRoundCFBold">{data.location ? data.current.temp_c : '...'}°C</p>
            <p className="text-3xl">{data.location ? data.current.temp_f : '...'}°F</p>
          </div>

          <div className="bg-white bg-opacity-5 relative z-2 rounded-xl shadow-5xl border border-r-0 border-b-0 border-opacity-5 backdrop-filter backdrop-blur-[2px] p-2 mb-20">
            <div className="text-white flex justify-evenly mx-auto p-2 w-full text-xl">
              <div className="text-left p-2">
                <p className="text-base">Min-Temp</p>
                <p className="text-xl font-visbyRoundCFBold">{data.forecast ? data.forecast.forecastday[0].day.mintemp_c : '...'}°C</p>
              </div>
              <div className="text-center p-2">
                <p className="text-base">Wind</p>
                <p className="text-xl font-visbyRoundCFBold">{data.current ? data.current.wind_kph : '...'} km/h</p>
              </div>
              <div className="text-center p-2">
                <p className="text-base">Humidity</p>
                <p className="text-xl font-visbyRoundCFBold">{data.current ? data.current.humidity : '...'}%</p>
              </div>{' '}
              <div className="text-right p-2">
                <p className="text-base">Max-Temp</p>
                <p className="text-xl font-visbyRoundCFBold">{data.forecast ? data.forecast.forecastday[0].day.maxtemp_c : '...'}°C</p>
              </div>
            </div>
          </div>
        </div>
      </Fade>
    </div>
  );
}

export default App;
