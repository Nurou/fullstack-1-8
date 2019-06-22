import React from 'react'; // library: component base
import ReactDOM from 'react-dom'; // glue connectiing React to DOM API

/* React components function like JS functions
They take in 'props' and return React elements */

// Header component - page title

const Header = props => {
  return (
    <div>
      <h1>{props.course.name}</h1>
    </div>
  );
};

// Part component - building blocks for component

const Part = props => {
  const courseName = props.courseName;
  const exerciseCount = props.exerciseCount;

  return (
    <div>
      <p>
        {courseName} {exerciseCount}
      </p>
    </div>
  );
};

// Content component - course info
// Comprises of 3 parts, one for each course

const Content = props => {
  console.log(props);
  const parts = [];
  // gets parts array of objects as props
  Object.keys(props).forEach(function(prop) {
    parts.push(...props[prop]);
  });
  return (
    <div>
      <Part courseName={parts[0].name} exerciseCount={parts[0].exercises} />
      <Part courseName={parts[1].name} exerciseCount={parts[1].exercises} />
      <Part courseName={parts[2].name} exerciseCount={parts[2].exercises} />
    </div>
  );
};

// Total component - total number of exercises

const Total = props => {
  const partOneExCount = props.parts[0].exercises;
  const partTwoExCount = props.parts[1].exercises;
  const partThreeExCount = props.parts[2].exercises;

  return (
    <div>
      <p>
        Number of exercises {partOneExCount + partTwoExCount + partThreeExCount}
      </p>
    </div>
  );
};

// root component - top of component tree
const App = () => {
  // const definitions
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  };

  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
