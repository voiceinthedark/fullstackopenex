import "./App.css";
import React, { useState } from "react";

const Button = (props) => {
  return <button onClick={props.fn}>{props.text}</button>;
};

const Heading = (props) => {
  return <h1>{props.text}</h1>;
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients",
  ];

  let rndAnecdote = Math.floor(Math.random() * 10) % anecdotes.length;
  let [selected, setSelected] = useState(rndAnecdote);
  const [vote, setVote] = useState(() => {
    let obj = Object.create({});
    for (let i = 0; i < anecdotes.length; i++) {
      obj[i] = 0;
    }
    return obj;
  });
  let maxVote = Object.keys({...vote}).reduce((a, b) => vote[a] > vote[b] ? a : b);
  // console.log(maxVote);

  return (
    <div>
      <Heading text="Anecdote of the day" />
      <p>{anecdotes[selected]}</p>
      <p>has {vote[selected]} vote(s)</p>
      <Button
        text="vote"
        fn={() => {
          let copy = { ...vote };
          copy[selected] += 1;
          setVote(copy);
        }}
      />
      <Button text="Next Anecdote" fn={() => { 
        setSelected(() => Math.floor(Math.random() * 10) % anecdotes.length);
        // console.log(rndAnecdote);
      }} />
      <Heading text="Anecdote with the most votes" />   
      <p>{anecdotes[maxVote]}</p>
      <p>has {vote[maxVote]} votes</p>
    </div>
  );
};

export default App;
