import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Display = props => {
  return <div>{props.value}</div>;
};

//thousand, reset, increment
const Button = props => {
  return <button onClick={props.handleClick}>{props.text}</button>;
};

const App = props => {
  const [value, setValue] = useState(10);

  const setToValue = newValue => {
    setValue(newValue);
  };

  return (
    <div>
      <Display value={value} />
      <Button handleClick={() => setValue(1000)} text="thousand" />
      <Button handleClick={() => setValue(0)} text="reset" />
      <Button handleClick={() => setValue(value + 1)} text="increment" />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
