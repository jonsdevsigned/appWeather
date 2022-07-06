import axios from 'axios'
import { useEffect, useState } from 'react'

const Weather = () => {
    const [ data, setData ] = useState({})
    const [ temp, setTemp ] = useState(0)
    const [ isCelsius, setIsCelsius ] = useState(true) 

    useEffect (() => {
  
      const success = pos => { 
        const lat = pos.coords.latitude
        const lon = pos.coords.longitude
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=32d62e29ef9cdafc86c118be8a2c2c9c`)
        .then(res => {
            setData(res.data)
            setTemp(parseInt (res.data.main?.feels_like - 273.15))
        })
      }
      
      navigator.geolocation.getCurrentPosition(success)
      
    },[])

    const convertDegrees = () => {
        if (isCelsius) {
            setTemp( (temp*9 /5) + 32 )
            setIsCelsius(false)
        } else {
            setTemp( (( temp-32 ) *5) /9 )
            setIsCelsius(true)
        }
    }
    
    console.log(data)
    

    return (
        <div className='card'>
            <h2>Weather App</h2>
            <h3>{data.name}, {data.sys?.country}</h3>
            <b className='temp'>{temp} {isCelsius ? "C°" : "F°"}</b>
            <br />
            <img src={`http://openweathermap.org/img/wn/${data.weather?.[0].icon}@2x.png`} alt="icon weather" />
            <p className='description'>{data.weather?.[0].description}</p>
            <ul>                
                <li><b>Wind speed:</b> {data.wind?.speed} m/s</li>
                <li><b>Clouds:</b> {data.clouds?.all} %</li>
                <li><b>Pressure:</b> {data.main?.pressure} mb</li>
            </ul>
            <button onClick={convertDegrees}>C° - F°</button>
        </div>
    );
};

export default Weather;