import React, { useState } from "react";

const Heading = (props) => {
  return (
    <h1>{props.text}</h1>
  )
};

const Button = (props) => {
  return(
    <button onClick={props.handleClick}>{props.text}</button>
  )
};

const Stat = (props) => {
  return(
    <p>{props.name} {props.val}</p>
  )
}

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <Heading text="Give Feedback" />
      <Button text="Good" handleClick={() => setGood(good + 1)} />
      <Button text="Neutral" handleClick={() => setNeutral(neutral + 1)} />
      <Button text="Bad" handleClick={() => setBad(bad + 1)} />
      <Heading text="Statistics" />
      <Stat name="good" val={good} />
      <Stat name="neutral" val={neutral} />
      <Stat name="bad" val={bad} />
      <Stat name="all" val={good + bad + neutral} />
      <Stat name="average" val={(good + bad * -1) / (good + bad + neutral)} />
      <Stat name="positive" val={(good / (good + bad + neutral)) * 100 + " %"} />
    </div>
  );
}

export default App;
