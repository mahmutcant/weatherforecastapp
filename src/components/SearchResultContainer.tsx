import CurrentWeatherDetail from "../models/WeatherDetail-model";
import { dateFormatter } from "../utils";
interface SearchResultContainerProps {
  title: string;
  description: string;
  weatherDetail?: CurrentWeatherDetail;
  
}
const SearchResultContainer = ({ title, description, weatherDetail }: SearchResultContainerProps) => {
  return (
    <div className='text-center border-[#D8DFE9] p-8 items-center border-2 my-6 rounded-xl'>
      {!weatherDetail ? (
        <>
          <h1 className='text-[32px] font-bold font-sans mb-3'>{title}</h1>
          <span className='font-sans text-[16px]'>{description}</span>
        </>
      ) : <>
        <>
          <h1 className="text-[#296573] text-[56px] font-bold font-sans">{Math.floor(weatherDetail.app_temp)} °C</h1>
          <h1 className="text-[32px] font-bold font-sans mt-5">{weatherDetail.city_name}</h1>
          <div className="text-lg mt-2">
            {dateFormatter(weatherDetail.datetime.split(":")[0])}
          </div>
          <div className="mt-9">
            <span className="text-[#296573] text-[14px]">{weatherDetail.weather.description}</span>  
          </div>
        </>
      </>
      }
    </div>
  )
}

export default SearchResultContainer