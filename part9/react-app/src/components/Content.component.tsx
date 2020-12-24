import React from 'react';
import { CoursePart } from '../types/course.types';

const Content: React.FC<{ courseParts: CoursePart[] }> = ({ courseParts }) => (
  <>
    {courseParts.map((coursePart: CoursePart) => <p key={coursePart.name}>{coursePart.name} {coursePart.exerciseCount}</p>)}
  </>
);

export default Content;
