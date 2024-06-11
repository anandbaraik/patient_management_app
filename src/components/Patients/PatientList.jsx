import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {fetchPatients, addPatient, updatePatientById, deletePatientById} from "../../redux/PatientSlice";
import EditPatientBox from "./EditPatient.jsx";
const PatientCard = ({ patient, onEdit, onDelete }) => {
  return (
    <div className="col-lg-4 col-md-6 mb-4">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{patient.name}</h5>
          <p className="card-text">
            <strong>Age:</strong> {patient.age}
          </p>
          <p className="card-text">
            <strong>Gender:</strong> {patient.gender}
          </p>
          <p className="card-text">
            <strong>Contact:</strong> {patient.contact}
          </p>
          <p className="card-text">
            <strong>Ward:</strong> {patient.ward}
          </p>
          <p className="card-text">
            <strong>Medical History:</strong> {patient.medicalHistory}
          </p>
          <div className="d-flex justify-content-end gap-3">
            <button className="btn btn-primary" onClick={() => onEdit(patient)}>
              Edit
            </button>
            <button
              className="btn btn-danger ml-2"
              onClick={() => onDelete(patient._id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const PatientListPage = () => {
  const dispatch = useDispatch();
  const patients = useSelector((state) => state.patients.patients);

  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [inputErrors, setInputErrors] = useState({});

  useEffect(() => {
    dispatch(fetchPatients());
  }, [dispatch]);

  const handleAdd = () => {
    setShowAddPopup(true);
    setInputErrors({});
  };

  const handleEdit = (patient) => {
    setSelectedPatient(patient);
    setShowEditPopup(true);
    setInputErrors({});
  };

  const handleDelete = (patientId) => {
    if(window.confirm('Are you sure?')) {
      dispatch(deletePatientById(patientId));
    }
  };

  const handleEditSubmit = (e, patientData) => {
    e.preventDefault();
    const errors = {};
    /*
    * TODO: add proper validation
    */
    if (Object.keys(errors).length > 0) {
      setInputErrors(errors);
    } else {
      if (selectedPatient) {
        dispatch(
          updatePatientById({ patientId: selectedPatient._id, patientData })
        )
          .then(() => {
            setShowEditPopup(false);
          })
          .catch((error) => {
            console.error("Edit Patient Error: ", error);
          });
      }
    }
  };

  const handleAddSubmit = (e, patientData) => {
    e.preventDefault();
    const errors = {};
    /*
    *Todo: add proper validation
    */
    if (Object.keys(errors).length > 0) {
      setInputErrors(errors);
    } else {
      dispatch(addPatient(patientData))
        .then(() => {
          setShowAddPopup(false);
        })
        .catch((error) => {
          console.error("Add Patient Error: ", error);
        });
    }
  };

  return (
    <div
      className="container"
      style={{
        marginTop: "5rem",
      }}
    >
      <h1 className="text-center my-4">Patient List</h1>
      <button className="btn btn-primary mb-3 add-button" onClick={handleAdd}>
        + Add New Patient
      </button>
      <div className="row">
        {patients.map((patient) => (
          <PatientCard
            key={patient._id}
            patient={patient}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {
        showEditPopup ? (
          <EditPatientBox
            show={showEditPopup}
            onHide={() => {
              setShowEditPopup(false);
              setInputErrors({});
            }}
            onSubmit={handleEditSubmit}
            patient={selectedPatient}
            inputErrors={inputErrors}
          />
        ) : null
      }

      {
        showAddPopup ? (
          <EditPatientBox
            show={showAddPopup}
            onHide={() => {
              setShowAddPopup(false);
              setInputErrors({});
            }}
            onSubmit={handleAddSubmit}
            inputErrors={inputErrors}
          />
        ) : null
      }

    </div>
  );
};

export default PatientListPage;
