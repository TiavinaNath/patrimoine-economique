import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import "./components/css/PatrimoinePage.css"; 
import './components/dumbComponents/possession/css/NewPossessionForm.css';
import './components/dumbComponents/possession/css/PossessionList.css';
import './components/dumbComponents/possession/css/UpdatePossessionForm.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
