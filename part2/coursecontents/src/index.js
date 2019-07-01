import React from 'react'; // library: component base
import ReactDOM from 'react-dom'; // glue connecting React to DOM API
import Course from './Course';

// root component - top of component tree
const App = () => {
  // const definitions
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ];

  const courseList = courses.map((course, index) => {
    return <Course key={index} course={course} />;
  });

  return <div>{courseList}</div>;
};
ReactDOM.render(<App />, document.getElementById('root'));
