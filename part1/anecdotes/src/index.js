import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = props => {
  return <button onClick={props.onClick}>{props.text}</button>;
};

const Header = props => {
  return <h1>{props.text}</h1>;
};

const Anecdote = ({ content, votes }) => {
  return (
    <div>
      {content}
      <br />
      has {votes} votes
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

const App = ({ anecdotes }) => {
  // selected - index of selected anectode in array
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));
  const [mostPopular, setMostPopular] = useState(0);
  // random quote based on anecdotes length
  const next = () => Math.floor(Math.random() * anecdotes.length);

  const handleVote = () => {
    // forbidden in React to mutate state directly
    // hence the use of a copy
    const updatedVotes = [...votes];
    updatedVotes[selected] += 1;
    setVotes(updatedVotes);

    //has the voted anectode become most popular?
    if (updatedVotes[mostPopular] < updatedVotes[selected]) {
      setMostPopular(selected);
    }
  };

  return (
    <div>
      <Header text="Anecdote of the day" />
      <Anecdote content={anecdotes[selected]} votes={votes[selected]} />
      <Button onClick={handleVote} text="vote" />
      <Button onClick={() => setSelected(next())} text="next anecdote" />
      <Header text="Anecdote with most votes" />
      <Anecdote content={anecdotes[mostPopular]} votes={votes[mostPopular]} />
    </div>
  );
};

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'));
