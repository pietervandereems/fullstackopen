interface ExercisesResponse {
  periodLength: number;
  trainingDays: number;
  success: boolean
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ExercisesRequest {
  daily_exercises: number[] | string[];
  target: number | string;
}

interface Exercises {
  exerciseTimes: number[];
  targetTime: number;
}

export {
  ExercisesResponse,
  ExercisesRequest,
  Exercises
};