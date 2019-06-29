import React, { useState } from 'react';
import ReactDOM from 'react-dom';

//TODO: add a button that can be clicked to display a random anecdote from the field of software engineering:

const Button = props => {
  return <button onClick={props.onClick}>{props.text}</button>;
};

const App = props => {
  // quote selection is based on selected array index
  const [selected, setSelected] = useState(0);

  const selectRandomAnecdote = props => {
    // random quote from elements 0 - 5
    setSelected(Math.floor(Math.random() * 5));
  };

  return (
    <div>
      {props.anecdotes[selected]}
      <br />
      <Button onClick={() => selectRandomAnecdote()} text="next anecdote" />
    </div>
  );
};

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'));
