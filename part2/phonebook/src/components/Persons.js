import React from "react";

const Person = (props) => {
  return (
    <li>
      {props.name} {props.number}
    </li>
  );
};

const Persons = ({ persons }) => {
  return persons
    .filter((p) => p.show === true)
    .map((p) => <Person key={p.id} name={p.name} number={p.number} />);
};

export {Person, Persons};