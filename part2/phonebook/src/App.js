import React, { useEffect, useState } from "react";
import Filter from "./components/Filter";
import Form from "./components/Form";
import { Persons } from "./components/Persons";
import axios from 'axios';
import book from "./services/book";


const App = () => {
  const [persons, setPersons] = useState([]);
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
      show: true,
    };

    book.add(newPerson)
      .then(res => {
        setPersons(persons.concat(res));
        setNewName("");
        setNewNumber("");
      })

    
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
    setPersons(filterArr);
  }  

  useEffect(() => {
    book.getAll().then( res => {
      setPersons(res);
    })
  }, []);

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter filterBy={filterBy} handleFilterChange={handleFilterChange} />     
      <h2>Add a new entry</h2>
      <Form addName={addName} newName={newName} newNumber={newNumber}  handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>      
      <h2>Numbers</h2>
      <ul>
        <Persons persons={persons} setPersons={setPersons} />
      </ul>
    </div>
  );
};

export default App;
