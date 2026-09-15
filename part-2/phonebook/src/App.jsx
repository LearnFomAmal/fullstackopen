import { useState, useEffect, use } from "react";
import { getPersons, addPerson , deletePerson,updatedPerson} from "./services/phoneBookApi";
import './App.css';
const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState("");
  const [number, setNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [toast,settoast]=useState("");
  const [error,setError]=useState("");


  useEffect(() => {
    getPersons().then((data) => {
      setPersons(data);
      setLoading(false);
    });
  }, []);

  const handleChange = (e) => {

    setNewName(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nameExists = persons.find((person) => person.name === newName);
    if (nameExists) {
      const result=window.confirm(`${newName} is already added to the phonebook,replace the old number with new one?`)
         if(result){
          const id=nameExists.id
          const updatePerson={
            name:newName,
            number:number
          }
        
          updatedPerson(id,updatePerson).then(data=>{
            setPersons((prev)=>prev.filter(obj=>obj.name!==data.name).concat(data))
        }).catch(error=>{
         console.log(error);
         setError(`information of ${newName} has already been removed from server`);
         setPersons(prev=>prev.filter(data=>data.name!==newName));
         setTimeout(()=>{
          setError(null);
         },5000)
        })
         }
      setNewName("");
      setNumber("");
    } else {
      const newObj = { name: newName, number: number };
      addPerson(newObj).then((data) => {
        setPersons((prev) => [...prev, data]);
        settoast(`added ${data.name}`)
        setNewName("");
        setNumber("");
        setTimeout(()=>{
         settoast(null)
        
        },5000)
      });
    }
  };
  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase()),
  );
  return (
    <div>
      <h2>Phonebook</h2>
      {toast?<div className="message">
        {toast}
      </div>:null}
      {error?<div className="error">
        {error}
      </div>:null}
      <Filter filter={filter} setFilter={setFilter} />
      <h2>add a new</h2>

      <PersonForm
        newName={newName}
        number={number}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        setNumber={setNumber}
      />
      <h3>Numbers</h3>
      <Persons filteredPersons={filteredPersons} loading={loading} setPersons={setPersons} />
    </div>
  );
};

function Filter({ filter, setFilter }) {
  return (
    <div>
      filter shown with:{" "}
      <input value={filter} onChange={(e) => setFilter(e.target.value)} />
    </div>
  );
}

function PersonForm({
  newName,
  number,
  handleChange,
  handleSubmit,
  setNumber,
}) {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name: <input value={newName} onChange={handleChange} />
      </div>
      <div>
        number:{" "}
        <input value={number} onChange={(e) => setNumber(e.target.value)} />
      </div>

      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
}

function Persons({ filteredPersons, loading,setPersons }) {
  const confirmDelete=(person)=>{
    const result=window.confirm(`delete ${person.name}?`)
 if(result){
    deletePerson(person.id).then(() => {
    setPersons((prev) => prev.filter((p)=>p.id !== person.id))
   })
 }
  
  }
  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        filteredPersons.map((person) => (
          <div key={person.id}>
            {person.name} - {person.number}
            <button onClick={()=>confirmDelete(person)} 
            style={{marginLeft:'10px',}}>delete</button>
          </div>
        ))
      )}
    </div>
  );
}

export default App;