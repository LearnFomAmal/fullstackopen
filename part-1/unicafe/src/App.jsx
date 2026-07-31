import { useState } from 'react'
import './App.css'

function App() {

  const [value, setValue] = useState({
      good:0,
      neutral:0,
      bad:0
  })

  const [clicked,setClicked]=useState(false);

  return (
<div>
<h1>give feedback</h1>

  <button onClick={()=>{setValue({...value,good:value.good+1}); setClicked(true)}}>good</button>
<button  onClick={()=>{setValue({...value,neutral:value.neutral+1});setClicked(true)}}>neutral</button>
<button  onClick={()=>{setValue({...value,bad:value.bad+1});setClicked(true)}}>bad</button>

{clicked?<Statistics good={value.good} bad={value.bad} neutral={value.neutral}/>:<p>No feedback given</p>}
</div>
  )
}
 const StaticLine=(props)=>{

  return (
    
      <tbody>
<tr>
          <td>{props.text}</td>
           <td>{props.value}</td>
        </tr>
      </tbody>
            
 
  )
 }
function Statistics(props){
  const all=props.bad+props.good+props.neutral
  return(
  <div>
    <h1>statistics</h1>
<table>


 <StaticLine text="good" value={props.good}/>
  <StaticLine text="neutral" value={props.neutral} />
   <StaticLine text="bad" value={props.bad}/>
  <StaticLine text="all" value={all}/>
   <StaticLine text="average" value={(props.good-props.bad)/all}/>
    <StaticLine text="positive" value={(props.good/all)*100}/>

</table>
 
  </div>
  )
}
export default App
