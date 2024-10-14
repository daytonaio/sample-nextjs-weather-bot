import { WeatherData } from '../src/app/types/WeatherData'; // Assuming you have a types folder

const fetchWeatherData = async (location: string): Promise<WeatherData | null> => {
  const apiKey = '26db7e55145b064e8424ff80b35c6633'; // Replace with your API key
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      mode: 'cors',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: { main?: any; weather?: any[]; wind?: any ; name?:any; } = await response.json();

    if (!data.main) {
      throw new Error('Weather data not found in the response');
    }

    const weatherData: WeatherData = {
      location: data.name || 'unknown location',
      temperature: data.main.temp,
    //   description: data.weather[0].description,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
    };

    return weatherData;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
};

export default fetchWeatherData;