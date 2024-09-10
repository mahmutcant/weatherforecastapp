
import { _addCurrentWeather,_addWeeklyWeather } from ".";
import store from "..";
import DailyWeatherDetail  from "../../models/WeatherDetail-model"
import WeatherDetail  from "../../models/WeatherDetail-model"


export const setCurrentWeather = (city:string,data:DailyWeatherDetail) => store.dispatch(_addCurrentWeather({city,data}))
export const setWeeklyWeather = (city:string,data:WeatherDetail) => store.dispatch(_addWeeklyWeather({city,data}))