import React, { useState } from "react";

const Person = (props) => {
  return (
    <li>{props.name}</li>
  );
}

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const addName = (event) => {
    event.preventDefault();
    // console.log(`Adding name`, newName);
    // console.log(persons.map(p => p.name).find((a) => a === 'Art Hellas'));
    if (persons.map((p) => p.name).find((a) => a === newName)) {
      alert(`${newName} is already in the phonebook`);
      return;
    }

    const newPerson = {
      name: newName,
    };

    setPersons(persons.concat(newPerson));
    setNewName('');    
  };

  const handleNameChange = (event) => {
    // console.log(event.target.value);
    setNewName(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(p => <Person key={p.name} name={p.name} />)}      
      </ul>
    </div>
  );
};

export default App;
