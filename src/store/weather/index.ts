import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import CurrentWeatherDetail from "../../models/WeatherDetail-model";
import WeatherDetail from "../../models/WeatherDetail-model";

interface WeatherState {
  currentWeather: { [city: string]: CurrentWeatherDetail | undefined };
  weeklyWeather: { [city: string]: WeatherDetail | undefined };
}

const initialState: WeatherState = {
  currentWeather: {},
  weeklyWeather: {},
};

const weather = createSlice({
  name: "weather",
  initialState,
  reducers: {
    _addCurrentWeather: (
      state,
      action: PayloadAction<{ city: string; data: CurrentWeatherDetail }>
    ) => {
      state.currentWeather = {
        ...state.currentWeather,
        [action.payload.city.toLowerCase()]: action.payload.data,
      };
    },
    _addWeeklyWeather: (
      state,
      action: PayloadAction<{ city: string; data: WeatherDetail }>
    ) => {
      state.weeklyWeather = {
        ...state.weeklyWeather,
        [action.payload.city.toLowerCase()]: action.payload.data,
      };
    },
  },
});

export const { _addCurrentWeather, _addWeeklyWeather } = weather.actions;
export default weather.reducer;
