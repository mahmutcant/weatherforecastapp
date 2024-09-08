import axios from "axios"
import WeatherDetail from "../models/WeatherDetail-model";
import CurrentWeatherDetail from "../models/WeatherDetail-model";
const baseURL = import.meta.env.VITE_API_BASE_URL
const apiKey = import.meta.env.VITE_WEATHER_API_KEY
export const getWeatherDetail = async(city:string):Promise<WeatherDetail> => {
    const response = await axios({
        method: "GET",
        url: `${baseURL}/forecast/daily?city=${city}&country=tr&days=7&key=${apiKey}`
    })
    return response.data
}

export const getCurrentWeatherDetail = async(city:string): Promise<CurrentWeatherDetail> => {
    const response = await axios({
        method: "GET",
        url: `${baseURL}/current?city=${city}&country=tr&key=${apiKey}`
    })
    
    return response.data.data[0]
}