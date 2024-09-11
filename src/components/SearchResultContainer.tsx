import { useEffect, useState } from "react";
import CurrentWeatherDetail from "../models/WeatherDetail-model";
import { dateFormatter } from "../utils";
interface SearchResultContainerProps {
  title?: string;
  description?: string;
  weatherDetail?: CurrentWeatherDetail;
  
}
const SearchResultContainer = ({ title, description, weatherDetail }: SearchResultContainerProps) => {

  const [iconSrc, setIconSrc] = useState(null);
  const getWeatherIcon = async (iconCode:string) => {
    try {
      const icon = await import(`../assets/weather-icon/${iconCode}.png`);
      return icon.default;
    } catch (error) {
      console.error('Icon not found', error);
      return null;
    }
  };
  
  useEffect(() => {
    if(weatherDetail)
      getWeatherIcon(weatherDetail.weather.icon).then(setIconSrc);
  }, [weatherDetail]);

  return (
    <div className='text-center border-[#D8DFE9] p-8 items-center border-2 my-6 rounded-xl'>
      {!weatherDetail ? (
        <>
          <h1 className='text-[32px] font-bold font-[inter] mb-3'>{title}</h1>
          <span className='text-[16px] text-[#313131] font-[inter]'>{description}</span>
        </>
      ) : <>
        <>
          <h1 className="text-[#296573] text-[56px] font-bold font-[inter]">{Math.floor(weatherDetail.app_temp)} °C</h1>
          <h1 className="text-[32px] font-bold font-[inter] mt-5">{weatherDetail.city_name}</h1>
          <div className="text-lg mt-2 font-[inter]">
            {dateFormatter(weatherDetail.datetime.split(":")[0],false)}
          </div>
          <div className="mt-9">
            <div className="text-[#296573] text-[14px] flex items-center justify-center">
              {iconSrc && <img src={iconSrc} alt="weather icon" width={32} height={32}/>}
              <span className="font-[inter]">{weatherDetail.weather.description}</span> 
            </div>
          </div>
        </>
      </>
      }
    </div>
  )
}

export default SearchResultContainer