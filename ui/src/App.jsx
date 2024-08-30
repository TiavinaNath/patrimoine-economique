

// ui/src/App.jsx 

import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import PatrimoinePage from "./components/PatrimoinePage";
import PossessionListPage from "./components/PossessionListPage";
import CreatePossessionPage from "./components/CreatePossessionPage";
import UpdatePossessionPage from "./components/UpdatePossessionPage";
import "./App.css";
import "./components/css/PatrimoinePage.css"; 
import './components/possession/css/NewPossessionForm.css';
import './components/possession/css/PossessionList.css';
import './components/possession/css/UpdatePossessionForm.css';

function App() {
  return (
    <Router>
      <header className="p-2" style={{ backgroundColor: '#fffaf0' }}>
          <div className="d-flex">
            <div className="d-flex flex-row justify-content-around">
              <Link to="/patrimoine" className="btn"  style={{ fontSize: '1.5rem', color: 'black'}}>
                Patrimoine
              </Link>
              <Link to="/possession" className="btn"  style={{ fontSize: '1.5rem', color: 'black' }}>
                Possession
              </Link>
            </div>
        </div>
      </header>

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
