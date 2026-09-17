import { useState,useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
 
 const [country,setCountry]=useState([]);
 const [search,setSearch]=useState("");

 useEffect(()=>{
     axios.get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response=>{
       
        setCountry(response.data);
      })
 },[])

const displsyCountry=country.filter(data=>{
  return data.name.common.toLowerCase().includes(search.toLowerCase());
})

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
    <div key={data.name.common}>{data.name.common}</div>
  ))
  ):displsyCountry.map(data=>(
    <div key={data.name.common}>
     <h1>{data.name.common}</h1>
      <p>{data.capital[0]}</p>
      <p>{data.area}</p>
      <h1>languages</h1>
      {Object.values(data.languages).map(lang=>{
        return(
          <ul>
    <li key={lang}>{lang}</li>
          </ul>
        )
      })}
       <img src={data.flags.png} alt={data.flags.alt}/>
    </div>
  ))}
    </div>
  )
}

export default App
