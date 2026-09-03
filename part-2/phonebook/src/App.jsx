import { useState, useEffect } from "react";
import { getPersons, addPerson } from "./services/phoneBookApi";

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState("");
  const [number, setNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPersons().then((data) => {
      setPersons(data);
      setLoading(false);
    });
  }, []);

  const handleChange = (e) => {
    console.log(e.target.value);
    setNewName(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nameExists = persons.find((person) => person.name === newName);
    if (nameExists) {
      alert(`${newName} is already added to phonebook`);
      setNewName("");
      setNumber("");
    } else {
      const newObj = { name: newName, number: number };
      addPerson(newObj).then((data) => {
        setPersons((prev) => [...prev, data]);
        setNewName("");
        setNumber("");
      });
    }
  };
  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase()),
  );
  return (
    <div>
      <h2>Phonebook</h2>
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
      <Persons filteredPersons={filteredPersons} loading={loading} />
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

function Persons({ filteredPersons, loading }) {
  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        filteredPersons.map((person) => (
          <div key={person.id}>
            {person.name} - {person.number}
          </div>
        ))
      )}
    </div>
  );
}

export default App;
