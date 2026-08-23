import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axiosConfig from '../api/axiosConfig';

export default function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    medicos: 0,
    pacientes: 0,
    citas: 0
  });

  // Cargar estadísticas rápidas para las tarjetas informativas
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [resMed, resPac, resCit] = await Promise.all([
          axiosConfig.get('/doctores').catch(() => ({ data: [] })),
          axiosConfig.get('/pacientes').catch(() => ({ data: [] })),
          axiosConfig.get('/citas').catch(() => ({ data: [] }))
        ]);
        setStats({
          medicos: resMed.data.length,
          pacientes: resPac.data.length,
          citas: resCit.data.length
        });
      } catch (error) {
        console.error('Error al cargar estadísticas:', error);
      }
    };
    fetchStats();
  }, []);

  const handleLogout = () => {
    if (window.confirm('¿Estás seguro de cerrar sesión?')) {
      localStorage.clear();
      navigate('/');
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)', 
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      display: 'flex',
      flexDirection: 'column'
    }}>
      
      {/* Barra de Navegación Superior Profesional */}
      <header style={{ 
        background: '#ffffff', 
        borderBottom: '1px solid #bae6fd', 
        padding: '15px 40px', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        boxShadow: '0 4px 12px rgba(3, 105, 161, 0.05)',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ 
            background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)', 
            color: 'white', 
            padding: '10px', 
            borderRadius: '10px', 
            fontSize: '20px',
            boxShadow: '0 4px 10px rgba(2, 132, 199, 0.2)'
          }}>
            🏥
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: '20px', fontWeight: '700', color: '#0369a1' }}>Citas Médicas</h1>
            <span style={{ fontSize: '12px', color: '#64748b' }}>Panel de Control Principal</span>
          </div>
        </div>

        <nav style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <Link to="/dashboard" style={{ padding: '8px 16px', borderRadius: '8px', background: '#f0f9ff', color: '#0284c7', textDecoration: 'none', fontWeight: '600', fontSize: '14px' }}>Dashboard</Link>
          <Link to="/medicos" style={{ padding: '8px 16px', borderRadius: '8px', color: '#475569', textDecoration: 'none', fontWeight: '600', fontSize: '14px', transition: 'all 0.2s' }}>Médicos</Link>
          <Link to="/pacientes" style={{ padding: '8px 16px', borderRadius: '8px', color: '#475569', textDecoration: 'none', fontWeight: '600', fontSize: '14px', transition: 'all 0.2s' }}>Pacientes</Link>
          <Link to="/citas" style={{ padding: '8px 16px', borderRadius: '8px', color: '#475569', textDecoration: 'none', fontWeight: '600', fontSize: '14px', transition: 'all 0.2s' }}>Citas</Link>
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <span style={{ background: '#e0f2fe', color: '#0369a1', padding: '6px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '700', border: '1px solid #bae6fd' }}>
            Rol: ADMIN
          </span>
          <button 
            onClick={handleLogout} 
            style={{ 
              background: '#fee2e2', 
              color: '#991b1b', 
              border: '1px solid #fecaca', 
              padding: '8px 16px', 
              borderRadius: '8px', 
              cursor: 'pointer', 
              fontWeight: '600',
              fontSize: '13px',
              transition: 'all 0.2s'
            }}>
            Cerrar Sesión
          </button>
        </div>
      </header>

      {/* Contenido Principal */}
      <main style={{ maxWidth: '1200px', width: '100%', margin: '0 auto', padding: '40px 20px', flex: 1, boxSizing: 'border-box' }}>
        
        {/* Banner de Bienvenida */}
        <div style={{ 
          background: 'linear-gradient(135deg, #0369a1 0%, #0284c7 100%)', 
          color: 'white', 
          padding: '35px 40px', 
          borderRadius: '20px', 
          boxShadow: '0 10px 25px rgba(3, 105, 161, 0.2)',
          marginBottom: '35px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <h2 style={{ margin: '0 0 10px 0', fontSize: '32px', fontWeight: '700' }}>¡Bienvenido al Sistema!</h2>
            <p style={{ margin: 0, fontSize: '15px', opacity: 0.9, maxWidth: '600px', lineHeight: '1.5' }}>
              Desde este panel central puedes supervisar la agenda médica, administrar los expedientes de los pacientes y controlar el directorio de profesionales.
            </p>
          </div>
          <div style={{ fontSize: '64px', background: 'rgba(255,255,255,0.1)', padding: '15px 25px', borderRadius: '16px', backdropFilter: 'blur(5px)' }}>
            🩺
          </div>
        </div>

        {/* Tarjetas de Estadísticas (KPIs) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '25px', marginBottom: '40px' }}>
          
          <div style={{ background: 'white', padding: '25px', borderRadius: '16px', boxShadow: '0 8px 20px rgba(3, 105, 161, 0.06)', border: '1px solid #bae6fd', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <span style={{ color: '#64748b', fontSize: '13px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Médicos Registrados</span>
              <h3 style={{ margin: '8px 0 0 0', fontSize: '32px', color: '#0369a1', fontWeight: '700' }}>{stats.medicos}</h3>
            </div>
            <div style={{ background: '#f0f9ff', color: '#0284c7', fontSize: '28px', padding: '15px', borderRadius: '12px' }}>
              👨‍⚕️
            </div>
          </div>

          <div style={{ background: 'white', padding: '25px', borderRadius: '16px', boxShadow: '0 8px 20px rgba(3, 105, 161, 0.06)', border: '1px solid #bae6fd', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <span style={{ color: '#64748b', fontSize: '13px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Pacientes Activos</span>
              <h3 style={{ margin: '8px 0 0 0', fontSize: '32px', color: '#0369a1', fontWeight: '700' }}>{stats.pacientes}</h3>
            </div>
            <div style={{ background: '#f0f9ff', color: '#0284c7', fontSize: '28px', padding: '15px', borderRadius: '12px' }}>
              👥
            </div>
          </div>

          <div style={{ background: 'white', padding: '25px', borderRadius: '16px', boxShadow: '0 8px 20px rgba(3, 105, 161, 0.06)', border: '1px solid #bae6fd', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <span style={{ color: '#64748b', fontSize: '13px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Citas Programadas</span>
              <h3 style={{ margin: '8px 0 0 0', fontSize: '32px', color: '#0369a1', fontWeight: '700' }}>{stats.citas}</h3>
            </div>
            <div style={{ background: '#f0f9ff', color: '#0284c7', fontSize: '28px', padding: '15px', borderRadius: '12px' }}>
              📅
            </div>
          </div>

        </div>

        {/* Accesos Rápidos */}
        <h3 style={{ color: '#0369a1', fontSize: '18px', marginBottom: '20px', fontWeight: '600' }}>🚀 Accesos Rápidos a Módulos</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '25px' }}>
          
          <div onClick={() => navigate('/medicos')} style={{ background: 'white', padding: '25px', borderRadius: '16px', border: '1px solid #bae6fd', cursor: 'pointer', transition: 'all 0.3s', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
            <h4 style={{ margin: '0 0 8px 0', color: '#0369a1', fontSize: '16px' }}>Gestión de Médicos →</h4>
            <p style={{ margin: 0, fontSize: '13px', color: '#64748b', lineHeight: '1.4' }}>Agregar nuevos profesionales, asignar especialidades y ver el directorio.</p>
          </div>

          <div onClick={() => navigate('/pacientes')} style={{ background: 'white', padding: '25px', borderRadius: '16px', border: '1px solid #bae6fd', cursor: 'pointer', transition: 'all 0.3s', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
            <h4 style={{ margin: '0 0 8px 0', color: '#0369a1', fontSize: '16px' }}>Gestión de Pacientes →</h4>
            <p style={{ margin: 0, fontSize: '13px', color: '#64748b', lineHeight: '1.4' }}>Registrar pacientes, actualizar datos de contacto y antecedentes.</p>
          </div>

          <div onClick={() => navigate('/citas')} style={{ background: 'white', padding: '25px', borderRadius: '16px', border: '1px solid #bae6fd', cursor: 'pointer', transition: 'all 0.3s', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
            <h4 style={{ margin: '0 0 8px 0', color: '#0369a1', fontSize: '16px' }}>Gestión de Citas →</h4>
            <p style={{ margin: 0, fontSize: '13px', color: '#64748b', lineHeight: '1.4' }}>Programar consultas, verificar estados y llevar el control clínico.</p>
          </div>

        </div>

      </main>
    </div>
  );
}