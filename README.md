# Weather Forecast Application

This project is a simple weather forecasting page where users can retrieve weather data by searching for a city name. It was developed using React and TypeScript, and it fetches weather forecast data using the Weatherbit API.


## Features

- Search for weather forecasts by city name.
- Display forecast data in a table fetched from the API.
- Show detailed information for the selected day in a display card.
- By default, the first day of the week is shown on the card.

## Setup

#### Clone The Repository:

``` 
  git clone https://github.com/mahmutcant/weatherforecastapp
  cd weatherforecastapp
```

#### Install Dependencies:

``` npm install ```

#### Set up environment variables:
  
  The project requires a .env file to API key and API base URL. This file has been ignored by Git for security reasons.

  ```
    VITE_API_BASE_URL=https://api.weatherbit.io/v2.0
    VITE_WEATHER_API_KEY=apikey
  ```

#### Run the project:

- NPM

  ```npm run dev```

- yarn

  ```yarn run dev```

#### Bonus Features
- Caching
- Responsive Design
- Loading Animation

## Live Demo

The project is deployed and can be viewed at the following link:

[Weather Forecast App](https://weatherforecastapp-dusky.vercel.app/)
