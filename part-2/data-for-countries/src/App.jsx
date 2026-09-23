import { useState,useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
 
 const [country,setCountry]=useState([]);
 const [search,setSearch]=useState("");
 const [capital,setCapital]=useState(null);
 const [iconCode,setIconCode]=useState(null);


 const API_KEY=import.meta.env.VITE_WEATHER_API;
 useEffect(()=>{
     axios.get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response=>{
       
        setCountry(response.data);
      })
 },[])
const displsyCountry=country.filter(data=>{
  return data.name.common.toLowerCase().includes(search.toLowerCase());
})
 useEffect(()=>{
   if(displsyCountry.length===1){
    const CITY_NAME=displsyCountry[0].capital?.[0]
  axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${CITY_NAME}&appid=${API_KEY}&units=metric`)
  .then(response=>{
    setCapital(response.data);
    setIconCode(response.data.weather[0].icon);
  })
   }
 },[search])



  return (
    <div>
  <label>
  find countries: 
   <input type='text' value={search} onChange={(e)=>setSearch(e.target.value)}/>
  </label>
  {displsyCountry.length>10?(
    <p>Too many matches, specify another filter</p>
  ):
  displsyCountry.length!==1?(
   displsyCountry.map(data=>(
    
     <div key={data.name.common}>
      {data.name.common}
     <button onClick={()=>setSearch(data.name.common)}>show</button>

     </div>  
  

  ))
  ):displsyCountry.map(data=>(
    <div key={data.name.common}>
     <h1>{data.name.common}</h1>
      <p>{data.capital[0]}</p>
      <p>{data.area}</p>
      <h1>languages</h1>
      <ul>
        {Object.values(data.languages).map(lang=>{
        return(
       
      <li key={lang}>{lang}</li>
        
        )
      })}
      </ul>
    
       <img src={data.flags.png} alt={data.flags.alt}/>
       <h1>Weather in {data.capital[0]}</h1>
       <p>Temperatur- {capital?.main?.temp} Celsius</p>
       <img src={`https://openweathermap.org/img/wn/${iconCode}@2x.png`} />
       <p>wind {capital?.wind?.speed} m/s</p>
    </div>
  ))}
    </div>
  )
}

export default App
