import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => (
  <h1>{props.course}</h1>
);

const Part = (props) => (
  <p>{props.part.name} {props.part.exercises}</p>
)

const Content = (props) => (
  <>
    <Part part={props.content[0]} />
    <Part part={props.content[1]} />
    <Part part={props.content[2]} />
  </>
);

const Total = (props) => {
  const total = props.content.reduce((acc, exercises) => acc + exercises, 0);
  return (
    <p>Number of exercises {total}</p>
  );
};

const App = () => {
  const course = 'Half Stack application development';
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }


  return (
    <>
      <Header course={course} />
      <Content content={[part1, part2, part3]} />
      <Total content={[part1.exercises, part2.exercises, part3.exercises]} />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));