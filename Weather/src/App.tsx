import { useEffect, useState } from 'react'
import './App.css'

import searchIcon from './assets/search.png';
import clearIcon from "./assets/sun.png";
import rainIcon from "./assets/raining.png";
import cloudIcon from "./assets/cloudy.png";
import drizzleIcon from "./assets/drizzle.png";
import snowIcon from "./assets/snow.png";
import windIcon from "./assets/wind-direction.png";
import humidityIcon from "./assets/humidity.png";

interface WeatherDetailsProps{
  icon: string;
  temp: number;
  city: string;
  country: string;
  lat: number;
  lon: number;
  humidity: number;
  windSpeed: number;
}

const WeatherDetails: React.FC<WeatherDetailsProps> = ({icon, temp , city, country, lat, lon, humidity, windSpeed}) => {
  return (
    <>
      <div className="image">
        <img src={icon} alt="Image" />
      </div>
      <div className="temp">{temp}°C</div>
      <div className="location">{city}</div>
      <div className="country">{country}</div>
      <div className="cord">
        <div>
          <span className="lat">Longitude</span>
          <span>{lat}</span>
        </div>
        <div>
          <span className="lon">Latitude</span>
          <span>{lon}</span>
        </div>
      </div>
      <div className="data-container">
        <div className="element">
          <img src={humidityIcon} alt="humidity" className="icon" />
          <div className="data">
            <div className="humidity-percent">{humidity} %</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={windIcon} alt="Wind" className="icon" />
          <div className="data">
            <div className="Wind-percent">{windSpeed} km/h</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </>
  ); 
};

function App() {
  let api_key = "74de63d15ce2a3914d71d48cee4885d0";
  const [text, setText] = useState("Chennai");
  const [icon, setIcon] = useState(clearIcon);
  const [temp, setTemp] = useState(0);
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [windSpeed, setWindSpeed] = useState(0);

  const [cityNotFound, setCityNotFound] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const weatherIconMap ={
    "01d": clearIcon,
    "01n": clearIcon,
    "02d": cloudIcon,
    "02n": cloudIcon,
    "03d": drizzleIcon,
    "03n": drizzleIcon,
    "04d": drizzleIcon,
    "04n": drizzleIcon,
    "09d": rainIcon,
    "09n": rainIcon,
    "10d": rainIcon,
    "10n": rainIcon,
    "13d": snowIcon,
    "13n": snowIcon,
  };

  const search = async () => {
    setLoading(true);
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=Metric`;

    try{
      let res = await fetch(url);
      let data = await res.json();
      console.log(data);
      if(data.cod === "404"){
        console.error("City not found")
        setCityNotFound(true);
        setLoading(false);
        return;
      }
      setHumidity(data.main.humidity);
      setWindSpeed(data.wind.speed);
      setTemp(Math.floor(data.main.temp));
      setCity(data.name);
      setCountry(data.sys.country);
      setLat(data.coord.lat);
      setLon(data.coord.lon);
      const weatherIconCode: keyof typeof weatherIconMap = data.weather[0].icon;
      setIcon(weatherIconMap[weatherIconCode] || clearIcon);
      setCityNotFound(false);
    }catch(error){
      console.error("an error occurred while fetching", error);
      setError("An error occurred while fetching data");
    }finally{
      setLoading(false);
    }
  }

  const handleCity = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      search();
    }
  };

  useEffect(() => {
    search();
  },[]);

  return (
    <>
      <div className='container'>
        <div className="input-container">
          <input type="text"className='cityInput' placeholder='Search City' onChange={handleCity} value={text} onKeyDown={handleKeyDown}/>
          <div className="search-icon">
            <img src={searchIcon} alt="search icon" onClick={() => search()}/>
          </div>
        </div> 
        {!loading && !cityNotFound && !error && <WeatherDetails icon={icon} temp={temp} city ={city} 
        country={country} lat={lat} lon={lon} humidity={humidity} 
        windSpeed={windSpeed}/>}
        {loading && <div className="loading">Loading...</div>}
        {error && <div className="error-message">{error}</div>}
        {cityNotFound && <div className="city-not-found">City not Found</div>}


        <div className="copyright">Designed By <span>SAKTHI...</span></div>
      </div>
    </>
  )
}

export default App
