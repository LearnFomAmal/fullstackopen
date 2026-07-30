import { useState } from 'react'
import './App.css'

function App() {

  const [value, setValue] = useState({
      good:0,
      neutral:0,
      bad:0
  })
const all=value.bad+value.good+value.neutral
  return (
<div>
<h1>give feedback</h1>

  <button onClick={()=>setValue({...value,good:value.good+1})}>good</button>
<button  onClick={()=>setValue({...value,neutral:value.neutral+1})}>neutral</button>
<button  onClick={()=>setValue({...value,bad:value.bad+1})}>bad</button>

<h1>statistics</h1>
 <p>good:{value.good}</p>
 <p>neutral:{value.neutral}</p>
 <p>bad:{value.bad}</p>
 <p>all:{all}</p>
  <p>average:{all/3}</p>
</div>
  )
}

export default App
