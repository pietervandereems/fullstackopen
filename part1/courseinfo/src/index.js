import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => (
  <h1>{props.course}</h1>
);

const Part = (props) => (
  <p>{props.part.name} {props.part.exercises}</p>
);

const Content = (props) => (
  <>
    <Part part={props.content[0]} />
    <Part part={props.content[1]} />
    <Part part={props.content[2]} />
  </>
);

const Total = (props) => {
  const total = props.content.reduce((acc, part) => acc + part.exercises, 0);
  return (
    <p>Number of exercises {total}</p>
  );
};

const App = () => {
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
    <>
      <Header course={course.name} />
      <Content content={course.parts} />
      <Total content={course.parts} />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));