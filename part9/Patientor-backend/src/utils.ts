import { Gender, NewPatient } from "./types/patients.types";
/* eslint-disable
  @typescript-eslint/no-explicit-any, 
  @typescript-eslint/explicit-module-boundary-types,
  @typescript-eslint/no-unsafe-member-access
  */

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  console.log('isDate', { date });
  return Boolean(Date.parse(date));
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error(`Incorrect or missing gender: ${gender as string}`);
  }
  return gender;
};

const parseString = (type: string) => (str: any): string => {
  /* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */
  console.log('parseString', { type, str });
  if (str == null || !isString(str)) {
    throw new Error(`Incorrect or missing ${type}: ${str as string}`);
  }
  return str;
};

const parseName = parseString('name');
const parseOccupation = parseString('occupation');
const parseSsn = parseString('ssn');

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date');
  }
  return date;
};

const toNewPatientEntry = (obj: any): NewPatient => ({
  dateOfBirth: parseDate(obj.dateOfBirth),
  gender: parseGender(obj.gender),
  name: parseName(obj.name),
  occupation: parseOccupation(obj.occupation),
  ssn: parseSsn(obj.ssn),
  entries: []
});

export {
  toNewPatientEntry
};