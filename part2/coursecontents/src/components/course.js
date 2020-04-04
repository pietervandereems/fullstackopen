import React from 'react';

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

export default Course;