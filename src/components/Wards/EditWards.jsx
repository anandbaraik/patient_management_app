import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const EditWardBox = ({ show, onHide, onSubmit, ward }) => {
  const [wardData, setWardData] = useState(
    ward || { ward_Number: "", capacity: "", specialization: "" }
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setWardData({
      ...wardData,
      [name]: value
    });
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{ward ? "Edit Ward" : "Add New Ward"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={(e) => onSubmit(e, wardData)}>
          <Form.Group>
            <Form.Label>Ward Number</Form.Label>
            <Form.Control
              type="number"
              name="ward_Number"
              value={wardData.ward_Number}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Capacity</Form.Label>
            <Form.Control
              type="number"
              name="capacity"
              value={wardData.capacity}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Specialization</Form.Label>
            <Form.Control
              type="text"
              name="specialization"
              value={wardData.specialization}
              onChange={handleInputChange}
            />
          </Form.Group>
          <br/>
          <Button variant="primary" type="submit">
            {ward ? "Update" : "Add"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditWardBox;
