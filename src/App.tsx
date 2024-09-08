import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import searchIcon from "./assets/search-icon.svg";
import SearchResultContainer from './components/SearchResultContainer';
import notFoundIcon from "./assets/not-found-icon.svg";
import mainPageIcon from "./assets/mainpage-icon.svg";
import { getCurrentWeatherDetail, getWeatherDetail } from './services/WeatherService';
import WeatherDetail from './models/WeatherDetail-model';
import CurrentWeatherDetail from './models/WeatherDetail-model';
import { dateFormatter, dayFinder } from './utils';

function App() {
  const [selectedCity, setSelectedCity] = useState<WeatherDetail | null>(null);
  const [isCityFound, setIsCityFound] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [currentWeatherData, setCurrentWeatherData] = useState<CurrentWeatherDetail>();
  const handleSearch = () => {
    getWeatherDetail(search).then((data) => {
      setSelectedCity(data);
      if(typeof data === "string"){
        setIsCityFound(false)
      }
      getCurrentWeatherDetail(search).then((data) => {
        setCurrentWeatherData(data)
      })
      setIsCityFound(true)
    })
  }
  useEffect(() => {
    console.log(selectedCity);
  }, [selectedCity])
  return (
    <>
      <Navbar />
      <div className='w-2/3 mt-8 flex gap-8 mx-auto'>
        <div className='w-full m-4'>
          {(!isCityFound && selectedCity) && <img src={notFoundIcon} alt="" width={640} />}
          {!selectedCity && <img src={mainPageIcon} alt="" width={640} />}
          {(selectedCity && isCityFound) && (
            <div className='border-[#DBDFE9] border rounded-xl flex flex-col'>
              <div className=''>
                <div className='p-6'><span className='text-[16px] text-[#071437] font-semibold '>Weather Forecast for {selectedCity.city_name}</span></div>
                <div className='grid items-center grid-cols-5'>
                  <span className='border border-[#F1F1F4] p-2 text-[#4B5675] bg-[#FCFCFC] text-[13px]'>Days</span>
                  <span className='border border-[#F1F1F4] p-2 text-[#4B5675] bg-[#FCFCFC] text-[13px] col-span-2'>Dates</span>
                  <span className='text-center border border-[#F1F1F4] p-2 text-[#4B5675] bg-[#FCFCFC] text-[13px]'>Lowest Temp.</span>
                  <span className='text-center border border-[#F1F1F4] p-2 text-[#4B5675] bg-[#FCFCFC] text-[13px]'>Highest Temp.</span>
                </div>
                {selectedCity && selectedCity.data.map((item) => (
                  <div className='grid grid-cols-5 items-center border-b'>
                    <span className='border-r border[#F1F1F4] p-5'>{dayFinder(item.datetime)}</span>
                    <span className='border-r border[#F1F1F4] p-5 col-span-2'>{dateFormatter(item.datetime)}</span>
                    <span className='border-r border[#F1F1F4] p-5'>{Math.floor(item.app_min_temp)}</span>
                    <span className='border[#F1F1F4] p-5'>{Math.floor(item.app_max_temp)}</span>
                  </div>  
                ))}
              </div>
            </div>
          )}
        </div>
        <div className='w-2/5 relative mt-4'>
          <input type="text" placeholder='Search a city' onChange={(e) => setSearch(e.target.value)} className='w-full placeholder-[#252F4A] p-3 rounded-lg border-[#DBDFE9] border-2' />
          <img src={searchIcon} alt="" className='absolute right-3 top-5 cursor-pointer' onClick={handleSearch}/>
          {(!selectedCity && !isCityFound) && <SearchResultContainer title='Select a City' description='Search and select a city to see results. Try typing the first letters of the city you want.' />}
          {(selectedCity && !isCityFound) && <SearchResultContainer title='Does not Exist' description='Type a valid city name to get weekly forecast data.' />}
          {(selectedCity && isCityFound) && <SearchResultContainer weatherDetail={currentWeatherData}  title='Does not Exist' description='Type a valid city name to get weekly forecast data.' />}
        </div>
      </div>
    </>
  )
}

export default App
