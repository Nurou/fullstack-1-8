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
// Comprises of 3 parts, one for each course

const Content = props => {
  return (
    <div>
      <Part part={props.parts[0]} />
      <Part part={props.parts[1]} />
      <Part part={props.parts[2]} />
    </div>
  );
};

// Total component - total number of exercises

const Total = ({ parts }) => {
  const totalCourseCount =
    parts[0].exercises + parts[1].exercises + parts[2].exercises;

  return <div>Number of exercises {totalCourseCount}</div>;
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
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};
ReactDOM.render(<App />, document.getElementById('root'));
