import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const EditPatientBox = ({ show, onHide, onSubmit, patient, inputErrors }) => {
  const [patientData, setPatientData] = useState(
    patient || {
      name: "",
      age: "",
      gender: "Male",
      contact: "",
      ward: "",
      medicalHistory: ""
    }
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPatientData({
      ...patientData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(e, patientData);
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {patient ? "Edit Patient" : "Add New Patient"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={patientData.name}
              onChange={handleInputChange}
            />
            <Form.Text className="text-danger">{inputErrors.name}</Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Label>Age</Form.Label>
            <Form.Control
              type="number"
              name="age"
              value={patientData.age}
              onChange={handleInputChange}
            />
            <Form.Text className="text-danger">{inputErrors.age}</Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Label>Gender</Form.Label>
            <Form.Control
              as="select"
              name="gender"
              value={patientData.gender}
              onChange={handleInputChange}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Others">Others</option>
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Contact</Form.Label>
            <Form.Control
              type="text"
              name="contact"
              value={patientData.contact}
              onChange={handleInputChange}
            />
            <Form.Text className="text-danger">{inputErrors.contact}</Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Label>Ward</Form.Label>
            <Form.Control
              type="number"
              name="ward"
              value={patientData.ward}
              onChange={handleInputChange}
            />
            <Form.Text className="text-danger">{inputErrors.ward}</Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Label>Medical History</Form.Label>
            <Form.Control
              as="textarea"
              name="medicalHistory"
              value={patientData.medicalHistory}
              onChange={handleInputChange}
            />
          </Form.Group>
          <br/>
          <Button variant="primary" type="submit">
            {patient ? "Update" : "Add"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditPatientBox;
