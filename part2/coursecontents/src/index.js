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
    <p style={{ fontWeight: "bold" }}> Total of { total} exercises</p >
  );
};

const Course = ({ course }) => (
  <section>
    <Header name={course.name} />
    <Content content={course.parts} />
    <Total content={course.parts} />
  </section>
);

const App = () => {
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
  ]

  return (
    <>
      {courses.map(course => <Course key={course.id} course={course} />)}
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));