import data from '../../data/patients.json';
import { NewPatient, PublicPatient, Patient } from '../types/patients.types';
import { v4 as uuidv4 } from 'uuid';
import { toNewPatientEntry } from '../utils';

const toPublicPatient = (patient: Patient): PublicPatient => ({
  id: patient.id,
  name: patient.name,
  dateOfBirth: patient.dateOfBirth,
  gender: patient.gender,
  occupation: patient.occupation
});

  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
const defaultEntries = (patient: Patient): Patient => ({
  ...patient,
  entries: patient.entries ?? []
});

const getPatients = (): PublicPatient[] => {
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  return data.map((patient: any) => toPublicPatient(patient as Patient));
};

const findPatientById = (id: string): Patient | undefined => {
  return (defaultEntries(data.find((patient) => patient.id === id) as Patient));
};

const addPatient = (newPatient: NewPatient): PublicPatient => {
  const patient: Patient = {
    id: uuidv4(),
    ...toNewPatientEntry(newPatient)
  };

  data.push(patient);
  return toPublicPatient(patient);
};

export default {
  getPatients,
  findPatientById,
  addPatient
};