interface ExerciseResult {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
};

const calculateExercises = (exerciseTimes: number[], target: number): ExerciseResult => {
  const totalTime = exerciseTimes.reduce((acc: number, duration: number) => acc + duration, 0);
  const periodLength = exerciseTimes.length;
  const average = totalTime / periodLength;
  let rating: number;
  let ratingDescription: string;

  if (average >= target) {
    rating = 3;
    ratingDescription = 'well done, keep up the good work';
  } else if ((average + (target / 10)) >= target) {
    rating = 2;
    ratingDescription = 'not too bad but could be better';
  } else {
    rating = 1;
    ratingDescription = 'some improvement is needed';
  }

  return {
    periodLength,
    trainingDays: exerciseTimes.filter((duration: number) => duration > 0).length,
    success: average >= target,
    rating,
    ratingDescription,
    target,
    average
  }
};

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
