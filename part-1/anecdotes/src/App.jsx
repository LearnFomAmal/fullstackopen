import {useState} from 'react'
import './App.css'
function App() {
 
 const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

   const [selected, setSelected] = useState(0)
  const [vote,setVote]=useState({});

   const random=()=>{
     let randomIndex=Math.floor(Math.random()*anecdotes.length);
        setSelected(randomIndex);
   }

   const voteSystem=()=>{
     setVote({...vote,[selected]: (vote[selected] || 0) + 1})
   
   }

  return (
    <>
      <div>
        <h1>Anecdote of the day</h1>

        <p>{anecdotes[selected]}</p>
        <p>has {vote[selected] || 0} votes</p>
        <button onClick={voteSystem} className='vote-button'>
          vote
        </button>
        <button onClick={random}>next anecdote</button>
         
         <h1>Anecdote with most votes</h1>
         <p>{anecdotes[Object.keys(vote).reduce((a, b) => vote[a] > vote[b] ? a : b, 0)]}</p>
      </div>
    </>
  )   
}

export default App
