import { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import searchIcon from "./assets/search-icon.svg";
import SearchResultContainer from './components/SearchResultContainer';
import notFoundIcon from "./assets/not-found-icon.svg";
import mainPageIcon from "./assets/mainpage-icon.svg";
import { getCurrentWeatherDetail, getWeatherDetail } from './services/WeatherService';
import { dateFormatter, dayFinder } from './utils';
import { useCurrentWeather, useWeeklyWeather } from './store/weather/hooks';
import { setCurrentWeather, setWeeklyWeather } from './store/weather/actions';

function App() {
  const [search, setSearch] = useState<string>("");
  const [status, setStatus] = useState<string>("initial");
  const [selectedCityName, setSelectedCityName] = useState<string>("");
  const currentWeatherData = useCurrentWeather();
  const weeklyWeatherData = useWeeklyWeather();

  const handleSearch = async () => {
    setSelectedCityName(search)
    if (weeklyWeatherData[search.toLowerCase()] && currentWeatherData[search.toLowerCase()]) {
      console.log("Store'dan veri kullanılıyor.");
      setStatus("found");
    } else {
      try {
        const weeklyData = await getWeatherDetail(search);
        setWeeklyWeather(search,weeklyData);
        const currentData = await getCurrentWeatherDetail(search);
        setCurrentWeather(search,currentData);
        setStatus("found");
      } catch (error) {
        console.error("Veri bulunamadı:", error);
        setStatus("not-found");
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className='w-2/3 mt-8 flex gap-8 mx-auto'>
        <div className='w-full m-4'>
          {status === "not-found" && <img src={notFoundIcon} alt="not found" width={640} />}
          {status === "initial" && <img src={mainPageIcon} alt="main page" width={640} />}
          {status === "found" && (
            <div className='border-[#DBDFE9] border rounded-xl flex flex-col'>
              <div className='p-6'>
                <span className='text-[16px] text-[#071437] font-semibold'>
                  Weather Forecast for {selectedCityName.charAt(0).toLocaleUpperCase("tr-TR") + selectedCityName.slice(1)}
                </span>
              </div>
              <div className='grid items-center grid-cols-5'>
                <span className='border border-[#F1F1F4] p-2 text-[#4B5675] bg-[#FCFCFC] text-[13px]'>Days</span>
                <span className='border border-[#F1F1F4] p-2 text-[#4B5675] bg-[#FCFCFC] text-[13px] col-span-2'>Dates</span>
                <span className='text-center border border-[#F1F1F4] p-2 text-[#4B5675] bg-[#FCFCFC] text-[13px]'>Lowest Temp.</span>
                <span className='text-center border border-[#F1F1F4] p-2 text-[#4B5675] bg-[#FCFCFC] text-[13px]'>Highest Temp.</span>
              </div>
              {weeklyWeatherData[selectedCityName] && weeklyWeatherData[selectedCityName]!.data.map((item) => (
                <div key={item.datetime} className='grid grid-cols-5 items-center border-b'>
                  <span className='border-r border[#F1F1F4] p-5'>{dayFinder(item.datetime)}</span>
                  <span className='border-r border[#F1F1F4] p-5 col-span-2'>{dateFormatter(item.datetime)}</span>
                  <span className='border-r border[#F1F1F4] p-5'>{Math.floor(item.app_min_temp)}</span>
                  <span className='border[#F1F1F4] p-5'>{Math.floor(item.app_max_temp)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className='w-2/5 relative mt-4'>
          <input
            type="text"
            placeholder='Search a city'
            onChange={(e) => setSearch(e.target.value)}
            className='w-full placeholder-[#252F4A] p-3 rounded-lg font-[inter] text-[14px] border-[#DBDFE9] border-2'
          />
          <img src={searchIcon} alt="search" onClick={handleSearch} className='absolute right-3 top-5 cursor-pointer' />
          {status === "initial" && <SearchResultContainer title='Select a City' description='Search and select a city to see results. Try typing the first letters of the city you want.' />}
          {status === "not-found" && <SearchResultContainer title='Does not Exist' description='Type a valid city name to get weekly forecast data.' />}
          {status === "found" && <SearchResultContainer weatherDetail={currentWeatherData[selectedCityName]} />}
        </div>
      </div>
    </>
  );
}

export default App;