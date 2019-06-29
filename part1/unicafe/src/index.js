import React, { useState } from 'react';
import ReactDOM from 'react-dom';

//TODO: Step1 - Refactor headers, buttons, statistics

const Header = props => {
  return <h1>{props.text}</h1>;
};

const Button = props => {
  return <button onClick={props.onClick}>{props.text}</button>;
};

const Stats = props => {
  return (
    <p>
      Good: {props.good}
      <br />
      Neutral: {props.neutral}
      <br />
      Bad: {props.bad}
    </p>
  );
};
const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  // functions for each button
  const incrementGood = value => {
    setGood(value);
  };

  const incrementNeutral = value => {
    setNeutral(value);
  };

  const incrementBad = value => {
    setBad(value);
  };

  return (
    <div>
      <Header text="Give your feedback!" />
      <Button onClick={() => incrementGood(good + 1)} text="Good" />
      <Button onClick={() => incrementNeutral(neutral + 1)} text="Neutral" />
      <Button onClick={() => incrementBad(bad + 1)} text="Bad" />
      <Header text="Statistics: " />
      <Stats good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
