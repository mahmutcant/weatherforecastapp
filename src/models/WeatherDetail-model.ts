export default interface WeatherDetail {
    data: DailyWeatherDetail[];
}

interface DailyWeatherDetail{
    app_max_temp: number;
    app_min_temp: number;
    datetime: string;
}

export default interface CurrentWeatherDetail {
    app_temp: number;
    city_name: string;
    datetime: string;
    weather: {
        description: string;
        icon: string
    }
}