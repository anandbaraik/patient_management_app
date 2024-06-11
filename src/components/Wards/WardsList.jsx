import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchWards,
  addWard,
  updateWardById,
  deleteWardById,
} from "../../redux/WardSlice";
import EditWardBox from "./EditWards.jsx";

const WardCard = ({ ward, onEdit, onDelete }) => {
  return (
    <div className="col-lg-4 col-md-6 mb-4">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Ward {ward.ward_Number}</h5>
          <p className="card-text">
            <strong>Capacity:</strong> {ward.capacity}
          </p>
          <p className="card-text">
            <strong>Specialization:</strong> {ward.specialization}
          </p>
          <div className="d-flex justify-content-end gap-3">
            <button className="btn btn-primary" onClick={() => onEdit(ward)}>
              Edit
            </button>
            <button
              className="btn btn-danger ml-2"
              onClick={() => onDelete(ward._id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const WardListPage = () => {
  const dispatch = useDispatch();
  const wards = useSelector((state) => state.wards.wards);

  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [selectedWard, setSelectedWard] = useState(null);
  const [inputErrors, setInputErrors] = useState({});

  useEffect(() => {
    dispatch(fetchWards());
  }, [dispatch]);

  const handleAdd = () => {
    setShowAddPopup(true);
    setInputErrors({});
  };

  const handleEdit = (ward) => {
    setSelectedWard(ward);
    setShowEditPopup(true);
    setInputErrors({});
  };

  const handleDelete = (wardId) => {
    if(window.confirm('Are you sure?')) {
      dispatch(deleteWardById(wardId));
    }
  };

  const handleEditSubmit = (e, wardData) => {
    e.preventDefault();
    const errors = {};
    if (wardData.capacity < 1 || wardData.capacity > 20) {
      errors.capacity = "Capacity must be between 1 and 20";
    }

    if (Object.keys(errors).length > 0) {
      setInputErrors(errors);
    } else {
      if (selectedWard) {
        dispatch(updateWardById({ wardId: selectedWard._id, wardData }))
          .then(() => {
            setShowEditPopup(false);
          })
          .catch((error) => {
            console.error("Edit Ward Error: ", error);
          });
      }
    }
  };

  const handleAddSubmit = (e, wardData) => {
    e.preventDefault();
    const errors = {};

    if (wardData.capacity < 1 || wardData.capacity > 20) {
      errors.capacity = "Capacity must be between 1 and 20";
    }

    if (Object.keys(errors).length > 0) {
      setInputErrors(errors);
    } else {
      dispatch(addWard(wardData))
        .then(() => {
          setShowAddPopup(false);
        })
        .catch((error) => {
          console.error("Add Ward Error: ", error);
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
      <h1 className="text-center my-4">Ward List</h1>
      <button className="btn btn-primary mb-3 add-button" onClick={handleAdd}>
        + Add New Ward
      </button>
      <div className="row">
        {wards.map((ward) => (
          <WardCard
            key={ward._id}
            ward={ward}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
      {
        showEditPopup ? (
          <EditWardBox
            show={showEditPopup}
            onHide={() => {
              setShowEditPopup(false);
              setInputErrors({});
            }}
            onSubmit={handleEditSubmit}
            ward={selectedWard}
            inputErrors={inputErrors}
          />
        ) : null
      }
      {
        showAddPopup ? (
          <EditWardBox
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

export default WardListPage;
