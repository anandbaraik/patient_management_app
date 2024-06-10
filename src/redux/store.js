import { configureStore } from "@reduxjs/toolkit";
import patientReducer from "./PatientSlice";
import wardsReducer from "./WardSlice";

const store = configureStore({
  reducer: {
    patients: patientReducer,
    wards: wardsReducer
  }
});

export default store;
