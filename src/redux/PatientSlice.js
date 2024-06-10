import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  patients: [],
  status: "idle",
  error: null,
};

/*
* fetch patients
*/
export const fetchPatients = createAsyncThunk(
  "patients/fetchPatients",
  async () => {
    try {
      const response = await fetch(process.env.REACT_APP_BASE_PATIENTS_URL);
      if (!response.ok) {
        throw new Error("Failed to fetch patients");
      }
      const data = await response.json();
      console.log(data, "PATIENTS");
      return data;
    } catch (error) {
      throw error;
    }
  }
);

/*
* add patient
*/
export const addPatient = createAsyncThunk(
  "patients/addPatient",
  async (patientData) => {
    try {
      const response = await fetch(process.env.REACT_APP_BASE_PATIENTS_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(patientData),
      });
      if (!response.ok) {
        throw new Error("Failed to add a patient");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
);

/*
* delete patient
*/
export const deletePatientById = createAsyncThunk(
  "patients/deletePatient",
  async (patientId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_PATIENTS_URL}/${patientId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`Failed to delete patient with ID ${patientId}`);
      }
      return patientId;
    } catch (error) {
      throw error;
    }
  }
);

/*
* update patient
*/
export const updatePatientById = createAsyncThunk(
  "patients/updatePatient",
  async ({ patientId, patientData }) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_PATIENTS_URL}/${patientId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(patientData),
      });
      if (!response.ok) {
        throw new Error(`Failed to update patient with ID ${patientId}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
);

const patientSlice = createSlice({
  name: "patients",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPatients.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPatients.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.patients = action.payload.data;
      })
      .addCase(fetchPatients.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addPatient.fulfilled, (state, action) => {
        state.patients.push(action.payload.data);
      })
      .addCase(deletePatientById.fulfilled, (state, action) => {
        console.log(action);
        state.patients = state.patients.filter(
          (patient) => patient._id !== action.payload
        );
      })
      .addCase(updatePatientById.fulfilled, (state, action) => {
        state.patients = action.payload.data;
      });
  },
});

export default patientSlice.reducer;
