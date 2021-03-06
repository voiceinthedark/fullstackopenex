import React, { useEffect, useState } from "react";
import Filter from "./components/Filter";
import Form from "./components/Form";
import { Persons } from "./components/Persons";
import book from "./services/book";
import Notification from "./components/Notification";

const App = () => {  
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterBy, setFilterBy] = useState("");
  const [notification, setNotification] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


  const addName = (event) => {
    event.preventDefault();
    if (persons.map((p) => p.name).find((a) => a === newName)) {
      let yes = window.confirm(
        `${newName} is already in the phonebook, replace phone number?`
      );
      if (yes) {
        let entry = persons.filter((p) => p.name === newName);
        const newEntry = { ...entry[0], number: newNumber };
        book
          .update(newEntry)
          .then((res) =>{
            setPersons(persons.map((p) => (p.id !== newEntry.id ? p : res)))
            setNotification(`Successfuly changed number for ${newEntry.name}`);
            setTimeout(() => {
              setNotification(null);
            }, 4000);
          })
          .catch(error => {
            setNotification(`Error updating ${newEntry.name} information`);
            setPersons(persons);
            setTimeout(() => {
              setNotification(null);
            }, 4000);
          });
      }

      return;
    }

    const newPerson = {
      name: newName,
      number: newNumber,
      show: true,
    };

    book.add(newPerson).then((res) => {
      setPersons(persons.concat(res));
      setNewName("");
      setNewNumber("");
      setNotification(`${res.name} has been added`);
      setTimeout(() => {
        setNotification(null);
      }, 4000);
    })
    .catch(error => {      
        console.log(error.response);      
      setNotification(
        `Error - ${error.response.data.error}`
      );
      setTimeout(() => {
        setNotification(null);
      }, 8000);
    })
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterBy(e.target.value);
    let filterArr = [...persons];
    filterArr.forEach((p) =>
      p.name.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1
        ? (p.show = true)
        : (p.show = false)
    );
    setPersons(filterArr);
  };


  useEffect(() => {
    setIsLoading(true)
    book.getAll().then((res) => {
      setIsLoading(false);
      setPersons(res);
    });   
  }, []);

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={notification} />
      <Filter filterBy={filterBy} handleFilterChange={handleFilterChange} />
      <h2>Add a new entry</h2>
      <Form
        addName={addName}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          <Persons persons={persons} setPersons={setPersons} />
        </ul>
      )}
    </div>
  );
};

export default App;
