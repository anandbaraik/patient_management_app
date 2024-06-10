import PatientListPage from "./components/Patients/PatientList";
import WardListPage from "./components/Wards/WardsList";
import "./styles.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Switch,
} from "react-router-dom";

import HomePage from "./components/Shared/Homepage";
import AppNavbar from "./components/Shared/Navbar";

export default function App() {
  return (
    <div className="App">
      <AppNavbar />

      <Routes>
        <Route path="/" exact element={<HomePage />} />
        <Route path="/patients" element={<PatientListPage />} />
        <Route path="/wards" element={<WardListPage />} />
      </Routes>
    </div>
  );
}
