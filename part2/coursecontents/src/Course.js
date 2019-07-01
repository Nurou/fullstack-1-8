import React from 'react';

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
  const partList = parts.map((part, index) => (
    <Part key={part.id} part={parts[index]} />
  ));

  return <div>{partList}</div>;
};

// Total component - total number of exercises

const Total = ({ parts }) => {
  const courseCount = parts.reduce((exercises, part) => {
    return exercises + part.exercises;
  }, 0);

  return (
    <div>
      <b>total of {courseCount} exercises</b>
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

export default Course;
