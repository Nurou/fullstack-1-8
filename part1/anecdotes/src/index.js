import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = props => {
  return <button onClick={props.onClick}>{props.text}</button>;
};

const Header = props => {
  return <h1>{props.text}</h1>;
};

const DisplayMostVoted = props => {
  // extract votes array passed in as props
  const votes = props.votes;
  // retrieve index of the array element having the most votes
  const indexOfMostVoted = votes.indexOf(Math.max(...votes));
  const mostVotedAnecdote = anecdotes[indexOfMostVoted];
  const voteCount = votes[indexOfMostVoted];

  return (
    <div>
      {mostVotedAnecdote}
      <br />
      has {voteCount} votes
    </div>
  );
};

const DisplayCurrent = props => {
  return (
    <div>
      {props.anecdote}
      <br />
      has {props.votes} votes
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

const App = props => {
  const anecdotes = props.anecdotes;

  // quote selection is based on selected array index
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(props.anecdotes.length).fill(0));

  const selectRandomAnecdote = props => {
    // random quote from elements 0 - 5
    setSelected(Math.floor(Math.random() * 5));
  };

  // forbidden in React to mutate state directly ()
  // hence the use of a copy
  const voteForAnecdote = props => {
    const updatedVotes = [...votes];
    updatedVotes[props] += 1;
    setVotes(updatedVotes);
  };

  // consts to be used for display of anecdote data
  const anecdoteText = anecdotes[selected];
  const anecdoteVoteCount = votes[selected];

  return (
    <div>
      <Header text="Anecdote of the day" />
      <DisplayCurrent anecdote={anecdoteText} votes={anecdoteVoteCount} />
      <Button onClick={() => voteForAnecdote(selected)} text="vote" />
      <Button onClick={() => selectRandomAnecdote()} text="next anecdote" />
      <Header text="Anecdote with most votes" />
      <DisplayMostVoted votes={votes} />
    </div>
  );
};

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'));
