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
  const [loading, setLoading] = useState(false);
  const currentWeatherData = useCurrentWeather();
  const weeklyWeatherData = useWeeklyWeather();

  const handleSearch = async () => {
    setLoading(true)
    setSelectedCityName(search)
    if (weeklyWeatherData[search.toLowerCase()] && currentWeatherData[search.toLowerCase()]) {
      console.log("Store'dan veri kullanılıyor.");
      setLoading(false)
      setStatus("found");
    } else {
      try {
        const weeklyData = await getWeatherDetail(search);
        setWeeklyWeather(search, weeklyData);
        const currentData = await getCurrentWeatherDetail(search);
        setCurrentWeather(search, currentData);
        setStatus("found");
        setLoading(false)
      } catch (error) {
        console.error("Veri bulunamadı:", error);
        setStatus("not-found");
      }
    }
  };

  return (
    <>
      <Navbar />
      {loading && (
        <div className="flex h-96 items-center justify-center" role="status">
          <svg
            aria-hidden="true"
            className="inline w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        </div>
      )}
      {!loading && (
        <div className="max-sm:w-5/6 max-sm:flex-col w-2/3 mt-8 flex flex-col-reverse max-sm:items-center sm:flex-row gap-8 mx-auto">
          <div className="sm:w-2/3 w-full sm:order-1 order-2 m-4">
            {status === "not-found" && (
              <img src={notFoundIcon} alt="not found" width={640} />
            )}
            {status === "initial" && (
              <img src={mainPageIcon} alt="main page" width={640} />
            )}
            {status === "found" && (
              <div className="border-[#DBDFE9] border rounded-xl flex flex-col">
                <div className="p-6">
                  <span className="text-[16px] text-[#071437] font-semibold">
                    Weather Forecast for{" "}
                    {selectedCityName.charAt(0).toLocaleUpperCase("tr-TR") +
                      selectedCityName.slice(1)}
                  </span>
                </div>
                <div className="grid items-center max-sm:grid-cols-4 grid-cols-5">
                  <span className="border border-[#F1F1F4] p-2 text-[#4B5675] bg-[#FCFCFC] max-sm:text-[11px] text-[13px] flex justify-center items-center min-h-[48px]">
                    Days
                  </span>
                  <span className="border border-[#F1F1F4] p-2 text-[#4B5675] bg-[#FCFCFC] max-sm:text-[11px] text-[13px] md:col-span-2 flex justify-center items-center min-h-[48px]">
                    Dates
                  </span>
                  <span className="text-center border border-[#F1F1F4] p-2 text-[#4B5675] bg-[#FCFCFC] max-sm:text-[11px] text-[13px] flex justify-center items-center max-h-[48px]">
                    Lowest Temp.
                  </span>
                  <span className="text-center border border-[#F1F1F4] p-2 text-[#4B5675] bg-[#FCFCFC] max-sm:text-[11px] text-[13px] flex justify-center items-center max-h-[48px]">
                    Highest Temp.
                  </span>
                </div>
                {weeklyWeatherData[selectedCityName] &&
                  weeklyWeatherData[selectedCityName]!.data.map((item) => (
                    <div
                      key={item.datetime}
                      className="grid max-sm:grid-cols-4 grid-cols-5 items-center border-b"
                    >
                      <span className="border-r border-[#F1F1F4] p-5 max-sm:text-[12px] truncate">
                        {dayFinder(item.datetime)}
                      </span>
                      <span className="border-r border-[#F1F1F4] p-5 md:col-span-2 max-sm:text-[12px] max-sm:flex max-sm:justify-center">
                        {dateFormatter(item.datetime,true)}
                      </span>
                      <span className="border-r border-[#F1F1F4] p-5">
                        {Math.floor(item.app_min_temp)}
                      </span>
                      <span className="border-[#F1F1F4] p-5">
                        {Math.floor(item.app_max_temp)}
                      </span>
                    </div>
                  ))}
              </div>
            )}
          </div>
          <div className="sm:w-1/3 w-full sm:order-2 order-1 relative mt-4">
            <input
              type="text"
              placeholder="Search a city"
              onChange={(e) => setSearch(e.target.value)}
              className="w-full placeholder-[#252F4A] p-3 rounded-lg font-[inter] text-[14px] border-[#DBDFE9] border-2"
            />
            <img
              src={searchIcon}
              alt="search"
              onClick={handleSearch}
              className="absolute right-3 top-5 cursor-pointer"
            />
            {status === "initial" && (
              <SearchResultContainer
                title="Select a City"
                description="Search and select a city to see results. Try typing the first letters of the city you want."
              />
            )}
            {status === "not-found" && (
              <SearchResultContainer
                title="Does not Exist"
                description="Type a valid city name to get weekly forecast data."
              />
            )}
            {status === "found" && (
              <SearchResultContainer
                weatherDetail={currentWeatherData[selectedCityName]}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default App;