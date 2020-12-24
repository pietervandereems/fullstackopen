import data from '../../data/patients.json';
import { NewPatient, NonSSNPatient, Patient } from '../types/patients.types';
import { v4 as uuidv4 } from 'uuid';
import { toNewPatientEntry } from '../utils';

const removeSSN = (patient: Patient): NonSSNPatient => {
  return {
    id: patient.id,
    name: patient.name,
    dateOfBirth: patient.dateOfBirth,
    gender: patient.gender,
    occupation: patient.occupation
  };
};

const getEntries = (): NonSSNPatient[] => {
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  return data.map((patient: any) => removeSSN(patient as Patient));
};

const addPatient = (newPatient: NewPatient): NonSSNPatient => {
  /* eslint-disable-next-line @typescript-eslint/no-unsafe-call */
  const patient: Patient = {
    /* eslint-disable-next-line @typescript-eslint/no-unsafe-call */
    id: uuidv4() as string,
    ...toNewPatientEntry(newPatient)
  };

  data.push(patient);
  return removeSSN(patient);
};

export default {
  getEntries,
  addPatient
};