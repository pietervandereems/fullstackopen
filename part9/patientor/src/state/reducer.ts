import { State } from "./state";
import { Patient, PatientDetails } from "../types";

export type Action =
  | {
    type: "SET_PATIENT_LIST";
    payload: Patient[];
  }
  | {
    type: "ADD_PATIENT";
    payload: Patient;
  }
  | {
    type: "ADD_PATIENT_DETAILS";
    payload: PatientDetails;
  };

export const setPatientList = (list: Patient[]): Action => ({ type: "SET_PATIENT_LIST", payload: list });
export const addPatientDetails = (details: PatientDetails): Action => ({ type: "ADD_PATIENT_DETAILS", payload: details });
export const addPatient = (patient: Patient): Action => ({ type: "ADD_PATIENT", payload: patient });

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "ADD_PATIENT_DETAILS":
      return {
        ...state,
        patientsDetails: {
          ...state.patientsDetails,
          [action.payload.id]: action.payload
        }
      };
    default:
      return state;
  }
};
