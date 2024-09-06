

// ui/src/App.jsx 

import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import PatrimoinePage from "./components/smartComponents/PatrimoinePage";
import PossessionListPage from "./components/smartComponents/PossessionListPage";
import CreatePossessionPage from "./components/smartComponents/CreatePossessionPage";
import UpdatePossessionPage from "./components/smartComponents/UpdatePossessionPage";
import Header from "./components/smartComponents/Header"
import "./App.css";
import "./components/css/PatrimoinePage.css"; 
import './components/dumbComponents/possession/css/NewPossessionForm.css';
import './components/dumbComponents/possession/css/PossessionList.css';
import './components/dumbComponents/possession/css/UpdatePossessionForm.css';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<PatrimoinePage />} />
        <Route path="/patrimoine" element={<PatrimoinePage />} />
        <Route path="/possession" element={<PossessionListPage />} />
        <Route path="/possession/create" element={<CreatePossessionPage />} />
        <Route
          path="/possession/:libelle/update"
          element={<UpdatePossessionPage />}
        />
      </Routes>
    </Router>
  );
}

export default App;
