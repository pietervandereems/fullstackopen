interface BmiArguments {
  height: number,
  weight: number
};


const parseArgs = (args: string[]): BmiArguments => {
  if (args.length !== 4) throw new Error('2 arguments expected');

  const height = parseInt(args[2], 10);
  const weight = parseInt(args[3], 10);

  if (isNaN(height) || isNaN(weight)) {
    throw new Error('Provided height and/or weight is not a number');
  }

  return {
    height,
    weight
  };
};


const getBMI = ({ height, weight }: BmiArguments): number => weight / ((height / 100) ** 2);

const calculateBmi = ({ height, weight }: BmiArguments): string => {
  const bmi = getBMI({ height, weight });

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

console.log(calculateBmi(parseArgs(process.argv)));