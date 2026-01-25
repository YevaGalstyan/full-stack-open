import { useEffect, useState } from "react";
import weatherService from "../servises/weatherService";

const Country = ({ country }) => {
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        console.log('Fetching weather data for:', country.capital);
        weatherService.getWeatherData(
            country.capitalInfo.latlng[0], country.capitalInfo.latlng[1])
            .then(data => {
                setWeather(data);
            });
    }, [country]);

    return (
        <div>
            <h1>{country.name.common}</h1>
            <p>Capital: {country.capital}</p>
            <p>Area: {country.area}</p>

            <h2>Languages</h2>
            <ul>
                {Object.values(country.languages).map(language => (
                    <li key={language}>{language}</li>
                ))}
            </ul>
            <img src={country.flags.png} alt={`Flag of ${country.name.common}`} />

            {
                weather && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
                        <h2>Weather in {country.capital}</h2>
                        <img
                            style={{ width: 100 }}
                            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                            alt={weather.weather[0].description}
                        />
                        <span>Wind {weather ? weather.wind.speed : 'Loading...'} m/s</span>
                        <span>Temperature {weather ? weather.main.temp : 'Loading...'} Celcius</span>
                    </div>
                )
            }
        </div>
    )
}

export default Country;