interface ExerciseResult {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

interface ExerciseArguments {
  target: number,
  exerciseTimes: number[]
}

const parseArguments = (args: string[]): ExerciseArguments => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const target = parseFloat(args[2]);
  if (isNaN(target)) {
    throw new Error('Provided target is not a number');
  }

  const exerciseTimes = args.slice(3).map((time: string) => {
    const numericalTime = parseFloat(time);
    if (isNaN(numericalTime)) {
      throw new Error(`Provided time ${time} is not a number`);
    }
    return numericalTime;
  });

  return {
    target,
    exerciseTimes
  };
};


const calculateExercises = ({ exerciseTimes, target }: ExerciseArguments): ExerciseResult => {
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
  };
};

console.log(calculateExercises(parseArguments(process.argv)));
