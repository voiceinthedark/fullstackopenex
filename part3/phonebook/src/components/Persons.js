import React from "react";
import Button from "./ActionButton";
import book from "../services/book";

const Person = (props) => {
  return (
    <li>
      {props.name} {props.number}
      <Button value={"delete"} command={() => {
        let yes = window.confirm(`Are you sure you want to delete ${props.name}?`);
        if (yes)
          book.del(props.id).then(res => {            
            props.setPersons(props.persons.filter(p => p.id !== props.id));
          });
      }} />
    </li>
  );
};

const Persons = ({ persons, setPersons }) => {
  return persons
    .filter((p) => p.show === true)
    .map((p) => <Person key={p.id} name={p.name} number={p.number} id={p.id} setPersons={setPersons} persons={persons} />);
};

export {Person, Persons};