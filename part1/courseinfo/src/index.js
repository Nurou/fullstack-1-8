import React from 'react'; // library: component base
import ReactDOM from 'react-dom'; // glue connectiing React to DOM API

/* React components function like JS functions
They take in 'props' and return React elements */

// Header component - page title

const Header = props => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  );
};

// Part component - building blocks for content

const Part = props => {
  return (
    <div>
      <p>
        {props.courseName} {props.numberOfExercises}
      </p>
    </div>
  );
};

// Content component - course info

const Content = props => {
  return (
    <div>
      <Part courseName={props.part1} numberOfExercises={props.exercises1} />
      <Part courseName={props.part2} numberOfExercises={props.exercises2} />
      <Part courseName={props.part3} numberOfExercises={props.exercises3} />
    </div>
  );
};

// Total component - total number of exercises

const Total = props => {
  return (
    <div>
      <p>
        Number of exercises{' '}
        {props.exercises1 + props.exercises2 + props.exercises3}
      </p>
    </div>
  );
};

// root component - top of component tree
const App = () => {
  const course = 'Half Stack application development';
  const part1 = 'Fundamentals of React';
  const exercises1 = 10;
  const part2 = 'Using props to pass data';
  const exercises2 = 7;
  const part3 = 'State of a component';
  const exercises3 = 14;

  return (
    <div>
      <Header course={course} />
      <Content
        part1={part1}
        part2={part2}
        part3={part3}
        exercises1={exercises1}
        exercises2={exercises2}
        exercises3={exercises3}
      />
      <Total
        exercises1={exercises1}
        exercises2={exercises2}
        exercises3={exercises3}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
