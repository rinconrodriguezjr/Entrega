import axios from 'axios';
import { useEffect, useState } from 'react'
import './App.css'
import bgDay from "./assets/Img/sunnyday.jpg";
import bgNight from "./assets/Img/backgroundnight1.jpg";
import bgSunny from "./assets/Img/Sunny.png";
import bgRainny from "./assets/Img/Rain.png";
import bgMild from "./assets/Img/mild.png";
import { ClockLoader } from 'react-spinners';



function App() {

  const [loading, setLoading] = useState(false);
  
  document.body.style.backgroundImage = `url('${bgDay}')`
  document.body.style.backgroundImage = `url('${bgNight}')`

  useEffect(()=>{
    setLoading(true)
    setTimeout(()=>{
      setLoading(false)
    }, 3000)
  },[])
  
  
  // document.body.style = backgroundDay

  // document.body.style = completeHour > 12 ? backgroundDay : backgroundNight
  // function imagen(){
  //   date = new Date();
  //   hour = date.getHours();
  //   if(hour>=6 && hour<=18){//imagen desde la 1am hasta las 10am
  //   document.body.style.backgroundImage= backgroundDay;
  //   }
  //   if(hour>=18 && hour<=24){
  //     document.body.style.backgroundImage= backgroundNight; //imagen desde las 11am hasta las 6pm  document.getElementById("fondo").style.backgroundImage="url(img/frontal1.jpg)";
  //   }
  //   if(hour>=00 && hour<=6){//imagen desde las 7pm hasta las 12pm
      // document.body.style.backgroundImage= backgroundNight;
  //   }
  // }

  let today = new Date();
  let hours = today.getHours();
  let minutes = today.getMinutes();
  let seconds = today.getSeconds();
  let journey = hours >= 12 ? "PM" : "AM";
  minutes = ("0"+ minutes).slice(-2)
  seconds = ("0"+ seconds).slice(-2)
  let completeHour = `${hours} : ${minutes} : ${seconds} ${journey}`;

  const [weather, setWeather] = useState({});

  useEffect(()=>{
    function success(pos) {
      const crd = pos.coords;
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=4fdc262c83492abca9452ac0ac985187`)
          .then(res => setWeather(res.data));
          console.log(weather);

  console.log('Your current position is:');
  console.log(`Latitude : ${crd.latitude}`);
  console.log(`Longitude: ${crd.longitude}`);
  console.log(`More or less ${crd.accuracy} meters.`);
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(success, error);
  },[]);
  
  const [ isKelvin, setIsKelvin ] = useState(true);

  const changeTemp = () => {
    setIsKelvin(!isKelvin);
  };
  
  // const changeImgWeather = () => {
  //   if (celcius < 12){
  //     sunny
  //   } else {
  //     rainny
  //   }
  // };
  
  

  const kelvin = weather.main?.temp;
  const fahrenheit = ((weather.main?.temp - 273.15)* 1.8000 + 32).toFixed(2);
  const celcius = (weather.main?.temp - 273.15).toFixed(2);


  const rainny = <img src={bgRainny} alt="" srcset="" />
  const sunny = <img src={bgSunny} alt="" srcset="" />
  const milt = <img src={bgMild} alt="" srcset="" /> 
  

  return (
    
    <div className="App">
    <div className="overlay" ></div>
    { loading ? (
        <ClockLoader loading={loading} color={"white"} size={500} className="loading" />
      ):(
      <header className="App-header">
        
      <div className='container'>
        <div className='title_container'>
          <h1>Weather App</h1>
          <h2>{weather.name}, {" "} {weather.sys?.country} {" "} <br /><span>{completeHour }</span></h2>
        </div>
        <div className='info_container'>
          <section className='image_container'> 
            <h4>  {celcius > 15 ? sunny : milt}     </h4>  
            <h4>  {isKelvin ? fahrenheit : celcius} {isKelvin ? "°F" : "°C"}</h4>
          </section>
          <ul className='info_weather'>
              <li className='cloudtype'> <b>"{weather.weather?.[0].description}"</b> </li>
              <li> <i className="fa-solid fa-wind"></i>             <b>Wind Speed</b> {weather.wind?.speed}</li>
              <li> <i className="fa-solid fa-cloud"></i>            <b>Clouds    </b> {weather.clouds?.all} %</li>
              <li> <i className="fa-solid fa-temperature-half"></i> <b>Pressure  </b> {weather.main?.pressure} Hpa</li>
          </ul>
        </div>
        <button className='button' onClick={changeTemp} style={{background:"blueviolet", color:"white", fontWeight:"bolder"}}>Degrees °F/°C</button>
      </div>
      </header>
      )}

     
    </div>
  )
}

export default App
