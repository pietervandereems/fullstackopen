import React from "react";
import axios from "axios";
import { Container, Icon } from "semantic-ui-react";
import { PatientDetails } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { useParams } from "react-router-dom";
import { genderToIcon } from "../utils";


const PatientDetailPage: React.FC = () => {
  const [{ patientsDetails }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const patientDetails = patientsDetails[id];

  console.log('PatientDetailPage', { patientsDetails, patientDetails, ran: Math.random() });

  React.useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const { data: patientDetailsFromApi } = await axios.get<PatientDetails>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch({ type: "ADD_PATIENT_DETAILS", payload: patientDetailsFromApi });
      } catch (e) {
        console.error(e);
      }
    };
    if (patientDetails == null) {
      fetchPatientDetails();
    }
  }, [dispatch, id, patientDetails]);

  if (patientDetails == null) {
    return <div className="App">Loading...</div>;
  }

  return (
    <div className="App">
      <Container>
        <h1>{patientDetails.name}<Icon name={genderToIcon(patientDetails.gender)} /></h1>
        ssn: {patientDetails.ssn}<br />
        occupation: {patientDetails?.occupation || 'noocc'}
      </Container>
    </div>
  );
};

export default PatientDetailPage;
