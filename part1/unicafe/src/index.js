import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Header = ({ text }) => {
  return <h1>{text}</h1>;
};

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

// shows a single statistic
const Statistic = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

// combines the statistics
const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;

  // percentage of feedback that was positive
  const positivePercentage = () => Math.round((good / total) * 100) + ' %' || 0;
  // the average score (good: 1, neutral: 0, bad: -1)
  const averageFigure = () => (good - (bad * 1) / total).toPrecision(2);

  // has feedback been given?
  if (!total) {
    return <p>No feedback given.</p>;
  }

  // if yes, display them in tabular form
  return (
    <table className="darkTable">
      <tbody>
        <Statistic text="Good" value={good} />
        <Statistic text="Neutral" value={neutral} />
        <Statistic text="Bad" value={bad} />
        <Statistic text="All" value={total} />
        <Statistic text="Average" value={averageFigure()} />
        <Statistic text="Positive" value={positivePercentage()} />
      </tbody>
    </table>
  );
};

// root component
const App = () => {
  // save the clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <Header text="Give your feedback!" />
      <Button onClick={() => setGood(good + 1)} text="Good" />
      <Button onClick={() => setNeutral(neutral + 1)} text="Neutral" />
      <Button onClick={() => setBad(bad + 1)} text="Bad" />
      <Header text="Statistics: " />
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
