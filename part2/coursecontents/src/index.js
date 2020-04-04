import React from 'react';
import ReactDOM from 'react-dom';

const Header = ({ name }) => (
  <h1>{name}</h1>
);

const Part = (props) => (
  <p>{props.part.name} {props.part.exercises}</p>
);

const Content = ({ content }) => (
  <>
    {content.map(part => <Part key={part.id} part={part} />)}
  </>
);

const Total = ({ content }) => {
  const total = content.reduce((acc, part) => acc + part.exercises, 0);
  return (
    <p>Number of exercises {total}</p>
  );
};

const Course = ({ course }) => (
  <>
    <Header name={course.name} />
    <Content content={course.parts} />
    <Total content={course.parts} />
  </>
);

const App = () => {
  const course = {
    id: 1,
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
  }

  return (
    <>
      <Course course={course} />
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));