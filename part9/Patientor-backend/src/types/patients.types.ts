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

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {
}

export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  entries: Entry[];
}

export type NewPatient = Omit<Patient, 'id'>;
export type PublicPatient = Omit<Patient, 'ssn' | 'entries' >;
