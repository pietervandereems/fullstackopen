import { Exercises, ExercisesRequest, ExercisesResponse } from "../models/exercises.model";
import { createError } from "../utils/errorHandler";

const parseExercisesParams = ({ daily_exercises, target }: ExercisesRequest): Exercises => {
  const mallformattedError = () => createError({
    name: 'ParamError',
    message: 'malformatted parameters'
  });

  const toNumber = (str: string | number): number => (typeof str === 'number') ? str : parseFloat(str);

  if (daily_exercises == null || target == null) {
    throw createError({
      name: 'MissingParameters',
      message: 'parameters missing'
    });
  }

  const targetTime = toNumber(target);
  if (isNaN(targetTime)) {
    throw mallformattedError();
  }

  if (!Array.isArray(daily_exercises)) {
    throw mallformattedError();
  }

  const yesTypescriptThisIsAnArray = [...daily_exercises];

  const exerciseTimes = yesTypescriptThisIsAnArray.map((time: number | string) => {
    const numericalTime = toNumber(time);
    if (isNaN(numericalTime)) {
      throw mallformattedError();
    }
    return numericalTime;
  });

  return {
    targetTime,
    exerciseTimes
  };
};

const calculateExercises = ({ exerciseTimes, targetTime }: Exercises): ExercisesResponse => {
  const totalTime = exerciseTimes.reduce((acc: number, duration: number) => acc + duration, 0);
  const periodLength = exerciseTimes.length;
  const average = totalTime / periodLength;
  let rating: number;
  let ratingDescription: string;

  if (average >= targetTime) {
    rating = 3;
    ratingDescription = 'well done, keep up the good work';
  } else if ((average + (targetTime / 10)) >= targetTime) {
    rating = 2;
    ratingDescription = 'not too bad but could be better';
  } else {
    rating = 1;
    ratingDescription = 'bad';
  }

  return {
    periodLength,
    trainingDays: exerciseTimes.filter((duration: number) => duration > 0).length,
    success: average >= targetTime,
    rating,
    ratingDescription,
    target: targetTime,
    average
  };
};

export {
  parseExercisesParams,
  calculateExercises
};