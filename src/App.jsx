import "./App.css"
import search from "./assets/search.png";
import cloudy from "./assets/cloudy.png";
import cloudyss from "./assets/cloudy (1).png";
import coludys from "./assets/cloudy (2).png";
import drizzle from "./assets/drizzle.png";
import snowflake from "./assets/snowflake.png";
import storme from "./assets/storm.png";
import sun from "./assets/sun.png";
import wave from "./assets/water-waves.png"
import wind from "./assets/wind.png"
import { useState,useEffect } from "react";
const WeatherDeatails = ({ icon, temp, city, country, alt, log,hum,winds }) => {
  return (
    <>
      <div className="image">
        <img src={icon} alt="sunny" />
      </div>
      <div className="temp">{temp}°C</div>
      <div className="location">{city}</div>
      <div className="country">{country}</div>
      <div className="cord">
        <div className="alt"><span className="lat">Latitude</span> <span>{alt}</span> </div>
        <div className="log"><span className="log">Longitude</span> <span>{log}</span></div>
      </div>
      <div className="data-container">
        <div className="element">
          <img src={wave} alt="wave" width={50} className="icon" />
          <div className="data">
            <div className="humidity-percent">{hum} %</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={wind} alt="wind" width={50} className="icon" />
          <div className="data">
            <div className="humidity-percent">{winds} km/h</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>

    </>
  )
}

function App() {
  const [icon, setIcon] = useState(cloudy);
  const [temp, setTemp] = useState(0)
  const [city, setCity] = useState("chennai")
  const [country, setCountry] = useState("India")
  const [alt, setAlt] = useState(0)
  const [log, setLog] = useState(0)
  const [hum,setHum]=useState(0)
  const [winds, setWind]=useState(0)
  const [text,setText]=useState("chennai")
  const [notfound,setNotfound]=useState(false)
  const [loading , setLoading]=useState(false) 
  const[error,setError]=useState(null)
  const weatherIconMap={
    "01d":sun,
    "01n":sun,
    "02d":cloudy,
    "02n":cloudy,
    "03d":cloudyss,
    "03n":cloudyss,
    "04d":cloudyss,
    "04n":cloudyss,
    "09d":drizzle,
    "09n":drizzle,
    "10d":drizzle,
    "10n":drizzle,
    "13d":snowflake,  
    "13n":snowflake,  

  } 

  const searchs= async() =>{
    setLoading(true);
    let url=`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=3bdca49b6fc3cfbc619192697f654d37&units=Metric`
  
  try{
    let res= await fetch(url);
    let data= await res.json();
    if (data.cod ==="404"){
      console.error("city not found")
      setNotfound(true)
      setLoading(false)
      return;
    }

    setHum(data.main.humidity)
    setWind(data.wind.speed)
    setTemp(Math.floor(data.main.temp))
    setCity(data.name)
    setCountry(data.sys.country)
    setAlt(data.coord.lat)
    setLog(data.coord.lon)
    const weatherIcons=data.weather[0].icon;
    setIcon(weatherIconMap[weatherIcons] || sun)
    setNotfound(false)
  }catch(error){
    console.error("An Eroor Occurred",error.message)
    setError("An error occured while fetching weather data.")
  }finally{
    setLoading(false);
  }}
  const handlecity=(e)=>{
    setText(e.target.value)
  }
  const keydownvalue=(e)=>{
if(e.key==="Enter"){
  searchs();
}
  }
  useEffect(function(){
    searchs();
  },[])
  return (
    <>
      <div className="container">
        <div className="input-container">
          <input type="text" placeholder="Search City" className="cityInput" value={text} onChange={handlecity} onKeyDown={keydownvalue}/>
          <div className="search-icon" onClick={()=>searchs()}>
            <img src={search} alt="search" width={30} height={30} />
          </div>
        </div>
      {loading&&<div className="loading-mess">Loading...</div>}
      {error&&<div className="error">{error}</div>}
     {notfound&& <div className="city-not-found">City Not Found</div>}
{!loading&&!notfound&&<WeatherDeatails icon={icon} temp={temp} city={city} country={country} alt={alt} log={log} hum={hum} winds={winds} />
}
      <p className="copyright">Designed by <span> <a href="https://manikandan-portfolio-2tb8.onrender.com/">Manikandan</a></span></p>
      </div>
    </>
  )
}
export default App;
