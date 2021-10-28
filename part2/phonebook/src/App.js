import React, { useEffect, useState } from "react";
import Filter from "./components/Filter";
import Form from "./components/Form";
import { Persons } from "./components/Persons";
import axios from 'axios';


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
      id: persons.length + 1,
      show: true,
    };

    axios.post("http://localhost:3001/persons", newPerson)
      .then(res => {
        setPersons(persons.concat(newPerson));
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
    console.log("Effect...");
    axios.get('http://localhost:3001/persons')
    .then(response => {
      console.log('response :>> ', response.status);
      console.log(response.data);
      setPersons(response.data);
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
        <Persons persons={persons} />
      </ul>
    </div>
  );
};

export default App;
