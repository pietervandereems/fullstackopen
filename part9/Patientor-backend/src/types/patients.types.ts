export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
  Androgyne = 'androgyne',
  Bigender = 'bigender',
  Demiboy = 'demiboy',
  Demigirl = 'demigirl',
  Transfeminine = 'transfeminine',
  Transmasculine = 'transmasculine'
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
}

export type NewPatient = Omit<Patient, 'id'>;

export type NonSSNPatient = Omit<Patient, 'ssn'>;