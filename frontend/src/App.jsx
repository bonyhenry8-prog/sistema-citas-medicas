import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Medicos from './pages/Medicos';
import Pacientes from './pages/Pacientes';
import Citas from './pages/Citas';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta por defecto redirige al Login */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        
        {/* Rutas principales del sistema */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/medicos" element={<Medicos />} />
        <Route path="/pacientes" element={<Pacientes />} />
        <Route path="/citas" element={<Citas />} />
      </Routes>
    </Router>
  );
}
