import React from 'react'; // library: component base
import ReactDOM from 'react-dom'; // glue connectiing React to DOM API

// Header component - page title

const Header = ({ course }) => <h1>{course}</h1>;

// Part component - building blocks for component

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

// Content component - course info
// Comprises of parts, one for each course

const Content = ({ parts }) => {
  const partElements = parts.map((part, index) => (
    <Part key={part.id} part={parts[index]} />
  ));

  return <div>{partElements}</div>;
};

// Total component - total number of exercises

const Total = ({ parts }) => {
  const totalCourseCount = parts.reduce((total, part) => {
    return total + part.exercises;
  }, 0);

  return (
    <div>
      <b>total of {totalCourseCount} exercises</b>
    </div>
  );
};

// a component responsible for formatting a single course called Course

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
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
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  };

  return (
    <div>
      <Course course={course} />
    </div>
  );
};
ReactDOM.render(<App />, document.getElementById('root'));
