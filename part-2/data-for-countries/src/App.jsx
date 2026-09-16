import { useState,useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
 
 const [country,setCountry]=useState(null);
 const [search,setSearch]=useState("");

 useEffect(()=>{
     axios.get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response=>{
       
        setCountry(response.data);
      })
 },[])

 if(!country){
  return null;
 }
 

  return (
    <div>
  <label>
  find countries: 
   <input type='text' value={search} onChange={(e)=>setSearch(e.target.value)}/>
  </label>
  {country.map(data=><h1>{data.name.common}</h1>)}
    </div>
  )
}

export default App
