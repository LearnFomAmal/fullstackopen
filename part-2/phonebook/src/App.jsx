import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 

  
  const [newName, setNewName] = useState('')

  const handleChange=(e)=>{

   console.log(e.target.value);
   setNewName(e.target.value);
  }

  const handleSubmit=(event)=>{
       event.preventDefault();
       const newObj={name:newName};
  setPersons(prev=>[...prev,newObj]);
   setNewName('');
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
       <div>
     {persons.map(names=>(
      <div key={names.name}>
    {names.name}
      </div>
     ))}
      
        </div>
    </div>
  )
}

export default App