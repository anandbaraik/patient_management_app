import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPatients } from "../../redux/PatientSlice";
import { Table } from "react-bootstrap";

const HomePage = () => {
  const dispatch = useDispatch();
  const patients = useSelector((state) => state.patients.patients);
  const MAX_OCCUPANCY = 20;

  useEffect(() => {
    dispatch(fetchPatients());
  }, [dispatch]);

  const calculateAverageLengthOfStay = (patients) => {
    if (patients.length === 0) return 0;
    const totalLengthOfStay = patients.reduce((sum, patient) => {
      if (patient.dateOfAdmission && patient.dateOfDischarge) {
        const admissionDate = new Date(patient.dateOfAdmission);
        const dischargeDate = new Date(patient.dateOfDischarge);
        const lengthOfStayInDays =
          (dischargeDate - admissionDate) / (1000 * 60 * 60 * 24);
        return sum + lengthOfStayInDays;
      } else {
        return sum;
      }
    }, 0);

    return (totalLengthOfStay / patients.length).toFixed(2);
  };

  const findTopPerformingWard = (patients) => {
    const wardCounts = {};
    patients.forEach((patient) => {
      const ward = patient.ward;
      wardCounts[ward] = (wardCounts[ward] || 0) + 1;
    });
    const sortedWards = Object.keys(wardCounts).sort(
      (a, b) => wardCounts[b] - wardCounts[a]
    );
    return sortedWards[0];
  };

  const totalPatients = patients.length;
  const averageLengthOfStay = calculateAverageLengthOfStay(patients);
  const topWard = findTopPerformingWard(patients);

  return (
    <div
      className="container homepage-container mx-auto"
      style={{
        marginTop: "5rem",
      }}
    >
      {" "}
      {/* Added mx-auto for centering */}
      <div className="row">
        <div className="col-12">
          <h1 className="text-center mt-100">Statistics</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <Table striped bordered hover>
            <tbody>
              <tr>
                <td>Total Number of Patients</td>
                <td>{totalPatients}</td>
              </tr>
              <tr>
                <td>Occupancy Rate</td>
                <td>{((totalPatients / MAX_OCCUPANCY) * 100).toFixed(2)}%</td>
              </tr>
              <tr>
                <td>Average Length of Stay</td>
                <td>{averageLengthOfStay} days</td>
              </tr>
              <tr>
                <td>Top-Performing Ward</td>
                <td>{topWard}</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
