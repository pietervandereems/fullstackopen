import React from 'react';
import { CoursePart } from '../types/course.types';
import { assertNever } from '../utils';

const display = (coursePart: CoursePart): string => {
  switch (coursePart.name) {
    case 'Fundamentals':
      return `${coursePart.name} -- ${coursePart.exerciseCount} -- ${coursePart.description}`;
    case 'Using props to pass data':
      return `${coursePart.name} -- ${coursePart.exerciseCount} -- ${coursePart.groupProjectCount}`;
    case 'Deeper type usage':
      return `${coursePart.name} -- ${coursePart.exerciseCount} -- ${coursePart.description} -- ${coursePart.exerciseSubmissionLink}`;
    case 'With something extra':
      return `${coursePart.name} -- ${coursePart.exerciseCount} -- ${coursePart.description} -- ${coursePart.extra}`;
    default:
      assertNever(coursePart);
  }
  return '';
};

const Part: React.FC<{ coursePart: CoursePart }> = ({ coursePart }) => (
  <p>
    {display(coursePart)}
  </p>
);

export default Part;
