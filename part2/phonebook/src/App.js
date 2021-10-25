import React, { useState } from "react";

const Person = (props) => {
  return (
    <li>{props.name} {props.number}</li>
  );
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1, show: true },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2, show: true },
    { name: "Dan Abramov", number: "12-43-234345", id: 3, show: true },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4, show: true },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterBy, setFilterBy] = useState("");

  const addName = (event) => {
    event.preventDefault();    
    if (persons.map((p) => p.name).find((a) => a === newName)) {
      alert(`${newName} is already in the phonebook`);
      return;
    }

    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
      show: true,
    };

    setPersons(persons.concat(newPerson));
    setNewName('');    
    setNewNumber("");
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  }

  const handleFilterChange = (e) => {
    setFilterBy(e.target.value);
    persons    
    .forEach((p) => p.name.toLowerCase()
      .indexOf(e.target.value.toLowerCase()) > -1 ? p.show = true : p.show = false);
    // console.log(persons);
    setPersons(persons);
  }

  // const showPersons = filterBy === "" ?
  //   persons :
  //   persons.filter(p => p.show === true);

  return (
    <div>
      <h1>Phonebook</h1>
      <div>
        Filter by name:
        <input value={filterBy} onChange={handleFilterChange} />
      </div>
      <h2>Add a new entry</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons
          .filter((p) => p.show === true)
          .map((p) => (
            <Person key={p.id} name={p.name} number={p.number} />
          ))}
      </ul>
    </div>
  );
};

export default App;
