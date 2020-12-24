import React from 'react';
import { CoursePart } from '../types/course.types';
import Part from './Part.component';

const Content: React.FC<{ courseParts: CoursePart[] }> = ({ courseParts }) => (
  <>
    {courseParts.map((coursePart: CoursePart) => <Part key={coursePart.name} coursePart={coursePart} />)}
  </>
);

export default Content;
