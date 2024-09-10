import { useSelector } from "react-redux";
import { RootState } from "..";

export const useCurrentWeather = () => useSelector((state: RootState) => state.weather.currentWeather)
export const useWeeklyWeather = () => useSelector((state: RootState) => state.weather.weeklyWeather)