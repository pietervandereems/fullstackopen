import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => (
  <h1>{props.course}</h1>
);

const Content = (props) => (
  <>
    <p>
      {props.content.part1} {props.content.exercises1}
    </p>
    <p>
      {props.content.part2} {props.content.exercises2}
    </p>
    <p>
      {props.content.part3} {props.content.exercises3}
    </p>
  </>
);

const Total = (props) => (
  <p>Number of exercises {props.content.exercises1 + props.content.exercises2 + props.content.exercises3}</p>
);

const App = () => {
  const course = 'Half Stack application development';
  const part1 = 'Fundamentals of React';
  const exercises1 = 10;
  const part2 = 'Using props to pass data';
  const exercises2 = 7;
  const part3 = 'State of a component';
  const exercises3 = 14;
  const courseContent = {
    part1,
    exercises1,
    part2,
    exercises2,
    part3,
    exercises3
  };

  return (
    <>
      <Header course={course} />
      <Content content={courseContent} />
      <Total content={courseContent} />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));