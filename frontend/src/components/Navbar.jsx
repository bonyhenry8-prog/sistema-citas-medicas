import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const rol = localStorage.getItem('rol');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <nav style={{ background: '#333', padding: '15px', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>
        <h3 style={{ margin: 0, display: 'inline', marginRight: '20px' }}>🏥 Citas Médicas</h3>
        <Link to="/dashboard" style={{ color: 'white', marginRight: '15px', textDecoration: 'none' }}>Dashboard</Link>
        <Link to="/medicos" style={{ color: 'white', marginRight: '15px', textDecoration: 'none' }}>Médicos</Link>
        <Link to="/pacientes" style={{ color: 'white', marginRight: '15px', textDecoration: 'none' }}>Pacientes</Link>
        <Link to="/citas" style={{ color: 'white', textDecoration: 'none' }}>Citas</Link>
      </div>
      <div>
        <span style={{ marginRight: '15px', fontSize: '14px', background: '#555', padding: '5px 10px', borderRadius: '4px' }}>
          Rol: {rol || 'Invitado'}
        </span>
        <button onClick={handleLogout} style={{ background: '#d9534f', color: 'white', border: 'none', padding: '8px 12px', cursor: 'pointer', borderRadius: '4px' }}>
          Cerrar Sesión
        </button>
      </div>
    </nav>
  );
}