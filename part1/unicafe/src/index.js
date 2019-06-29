import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Header = props => {
  return <h1>{props.text}</h1>;
};

const Button = props => {
  return <button onClick={props.onClick}>{props.text}</button>;
};

// shows a single statistic
const Statistic = props => {
  return (
    <div>
      {props.text}: {props.value}
      <br />
    </div>
  );
};

// combines the statistics
const Statistics = props => {
  // extracting the feedback object from props
  let feedback = props.feedback;

  // has feedback been given?
  if (!feedback.total) {
    return <p>No feedback given.</p>;
  }

  // if yes, display them
  return (
    <div>
      <Statistic text="Good" value={feedback.good} />
      <Statistic text="Neutral" value={feedback.neutral} />
      <Statistic text="Bad" value={feedback.bad} />
      {/* feedback.average() || 0 will convert any "falsey" to 0 */}
      Average: {feedback.average() || 0}
      <br />
      Positive: {Math.round(feedback.positive()) || 0} %
    </div>
  );
};

// root component
const App = () => {
  // save the clicks of each button to own state
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

  // feedback data
  const feedbackStats = {
    good: good,
    neutral: neutral,
    bad: bad,
    total: good + neutral + bad,
    // the average score (good: 1, neutral: 0, bad: -1)
    average() {
      let totalPoints = good - bad * 1;
      let feedbackCount = this.total;
      return totalPoints / feedbackCount;
    },
    // percentage of feedback that was positive
    positive() {
      return (good / this.total) * 100;
    }
  };

  return (
    <div>
      <Header text="Give your feedback!" />
      <Button onClick={() => incrementGood(good + 1)} text="Good" />
      <Button onClick={() => incrementNeutral(neutral + 1)} text="Neutral" />
      <Button onClick={() => incrementBad(bad + 1)} text="Bad" />
      <Header text="Statistics: " />
      {/* <Statistics good={good} neutral={neutral} bad={bad} all={all} /> */}
      <Statistics feedback={feedbackStats} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
