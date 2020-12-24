import data from '../../data/patients.json';
import { NonSSNPatient, Patient } from '../types/patients.types';

const removeSSN = ({ id, name, dateOfBirth, gender, occupation }: Patient): NonSSNPatient => {
  return {
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  };
};

const getEntries = (): NonSSNPatient[] => {
  return data.map(removeSSN);
};

const addPatient = (patient: Patient): NonSSNPatient => {
  data.push(patient);
  return removeSSN(patient);
};

export default {
  getEntries,
  addPatient
};