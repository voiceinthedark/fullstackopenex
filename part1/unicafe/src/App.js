import React, { useState } from "react";
import "./App.css";

const Heading = (props) => {
  return <h1>{props.text}</h1>;
};

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.text}</button>;
};

const Stat = (props) => {
  return (
    <tr>
      <td>{props.name}</td>
      <td>{props.val}</td>
    </tr>
  );
};

const Statistics = (props) => {
  const all = props.values.good + props.values.neutral + props.values.bad;
  const average = ((props.values.good + props.values.bad * -1) /
          (all)).toFixed(2);
  const positive = ((props.values.good / all) * 100).toFixed(2);

  return (
    <>
      <table>
        <tbody>
          <tr>
            <th>Rating</th>
            <th>vote</th>
          </tr>
          <Stat name={props.names[0]} val={props.values.good} />          
          <Stat name={props.names[1]} val={props.values.neutral} />
          <Stat name={props.names[2]} val={props.values.bad} />
          <Stat name={props.names[3]} val={all} />
          <Stat name={props.names[4]} val={average} />
          <Stat name={props.names[5]} val={positive + "%"} />
        </tbody>
      </table>
    </>
  );
};

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const names_array = ['good', 'neutral', 'bad', 'all', 'average', 'positive'];
  const val_dict = {good: good, neutral: neutral, bad: bad};

  return (
    <div>
      <Heading text="Give Feedback" />
      <Button text="Good" handleClick={() => setGood(good + 1)} />
      <Button text="Neutral" handleClick={() => setNeutral(neutral + 1)} />
      <Button text="Bad" handleClick={() => setBad(bad + 1)} />
      <Heading text="Statistics" />
      {!good && !bad && !neutral ? <p>No Feedback Given</p> : <Statistics names={names_array} values={val_dict} />}
    </div>
  );
}

export default App;
