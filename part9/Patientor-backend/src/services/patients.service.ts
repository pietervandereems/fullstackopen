import data from '../../data/patients.json';
import { NonSSNPatient } from '../types/patients.types';

const getEntries = (): NonSSNPatient[] => {
  return data.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

export default {
  getEntries
};