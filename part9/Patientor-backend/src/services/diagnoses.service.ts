import data from '../../data/diagnoses.json';
import { Diagnosis } from '../types/diagnoses.types';

const getEntries = (): Diagnosis[] => {
  return data as Diagnosis[];
};

export default {
  getEntries
};