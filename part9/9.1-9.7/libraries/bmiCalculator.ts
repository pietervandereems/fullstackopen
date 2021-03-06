import { createError } from '../utils/errorHandler';
import { BmiArguments } from '../models/bmi.model';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
const parseBmiParams = ({ height, weight }: any): BmiArguments => { // any used here because query is of type ParsedQs
  const hInt = parseInt(height, 10);
  const wInt = parseInt(weight, 10);

  if (isNaN(hInt) || isNaN(wInt)) {
    throw createError({
      name: 'ParamError',
      message: 'malformatted parameters'
    });
  }

  return {
    height: hInt,
    weight: wInt
  };
};

const calculateBmi = ({ height, weight }: BmiArguments): number => weight / ((height / 100) ** 2);

const interpretBmi = (bmi: number): string => {
  if (bmi < 15) {
    return 'Very severely underweight';
  }
  if (bmi < 16) {
    return 'Severely underweight';
  }
  if (bmi < 18.5) {
    return 'Underweight';
  }
  if (bmi < 25) {
    return 'Normal (healthy weight)';
  }
  if (bmi < 30) {
    return 'Overweight';
  }
  if (bmi < 35) {
    return 'Obese Class I (Moderately obese)';
  }
  if (bmi < 40) {
    return 'Obese Class II (Severely obese)';
  }

  return 'Obese Class III (Very severely obese)';
};

export {
  parseBmiParams,
  calculateBmi,
  interpretBmi
};
