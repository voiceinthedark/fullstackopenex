import React, { useState } from "react";
import Filter from "./components/Filter";
import Form from "./components/Form";
import { Persons } from "./components/Persons";


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
    let filterArr = [...persons];
    filterArr    
    .forEach((p) => p.name.toLowerCase()
      .indexOf(e.target.value.toLowerCase()) > -1 ? p.show = true : p.show = false);
    // console.log(persons);
    setPersons(filterArr);
  }

  // const showPersons = filterBy === "" ?
  //   persons :
  //   persons.filter(p => p.show === true);

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter filterBy={filterBy} handleFilterChange={handleFilterChange} />     
      <h2>Add a new entry</h2>
      <Form addName={addName} newName={newName} newNumber={newNumber}  handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>      
      <h2>Numbers</h2>
      <ul>
        <Persons persons={persons} />
      </ul>
    </div>
  );
};

export default App;
