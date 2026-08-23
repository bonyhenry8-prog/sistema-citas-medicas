import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosConfig from '../api/axiosConfig';

export default function Citas() {
  const navigate = useNavigate();
  const [citas, setCitas] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [doctores, setDoctores] = useState([]);
  const [horarios, setHorarios] = useState([]);

  const [form, setForm] = useState({
    asunto: '',
    motivo: '',
    fecha: '',
    hora: '',
    sintomas: '',
    enfermedades: '',
    medicamentos: '',
    notas_adicionales: '',
    estado: 'Pendiente',
    id_paciente: '',
    id_doctor: '',
    id_horario: ''
  });

  const fetchCitas = async () => {
    try {
      const response = await axiosConfig.get('/citas');
      setCitas(response.data);
    } catch (error) {
      console.error('Error al cargar citas:', error);
    }
  };

  const fetchRelaciones = async () => {
    try {
      const [resPacientes, resDoctores, resHorarios] = await Promise.all([
        axiosConfig.get('/pacientes').catch(() => ({ data: [] })),
        axiosConfig.get('/doctores').catch(() => ({ data: [] })),
        axiosConfig.get('/horarios').catch(() => ({ data: [] }))
      ]);
      setPacientes(resPacientes.data);
      setDoctores(resDoctores.data);
      setHorarios(resHorarios.data);
    } catch (error) {
      console.error('Error al cargar datos relacionados:', error);
    }
  };

  useEffect(() => {
    fetchCitas();
    fetchRelaciones();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosConfig.post('/citas', {
        asunto: form.asunto,
        motivo: form.motivo,
        fecha: form.fecha,
        hora: form.hora,
        sintomas: form.sintomas,
        enfermedades: form.enfermedades,
        medicamentos: form.medicamentos,
        notas_adicionales: form.notas_adicionales,
        estado: form.estado,
        id_paciente: Number(form.id_paciente),
        id_doctor: Number(form.id_doctor),
        id_horario: form.id_horario ? Number(form.id_horario) : null
      });

      alert('Cita médica registrada con éxito');
      setForm({
        asunto: '',
        motivo: '',
        fecha: '',
        hora: '',
        sintomas: '',
        enfermedades: '',
        medicamentos: '',
        notas_adicionales: '',
        estado: 'Pendiente',
        id_paciente: '',
        id_doctor: '',
        id_horario: ''
      });
      fetchCitas();
    } catch (error) {
      console.error('Error al guardar cita:', error);
      alert('Hubo un error al registrar la cita.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta cita?')) {
      try {
        await axiosConfig.delete(`/citas/${id}`);
        fetchCitas();
      } catch (error) {
        console.error('Error al eliminar cita:', error);
      }
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)', 
      padding: '40px 20px', 
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" 
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Botón de Regreso al Dashboard */}
        <div style={{ marginBottom: '20px' }}>
          <button 
            onClick={() => navigate('/dashboard')} 
            style={{ 
              background: '#ffffff', 
              color: '#0369a1', 
              border: '1px solid #38bdf8', 
              padding: '8px 16px', 
              borderRadius: '6px', 
              cursor: 'pointer', 
              fontWeight: '600',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
              transition: 'all 0.2s'
            }}>
            ← Volver al Dashboard
          </button>
        </div>

        {/* Cabecera */}
        <div style={{ 
          background: 'linear-gradient(135deg, #0369a1 0%, #0284c7 100%)', 
          color: 'white', 
          padding: '25px 30px', 
          borderRadius: '16px', 
          boxShadow: '0 10px 25px rgba(3, 105, 161, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '30px'
        }}>
          <div>
            <h2 style={{ margin: 0, fontSize: '28px', fontWeight: '700', letterSpacing: '0.5px' }}>Gestión de Citas Médicas</h2>
            <p style={{ margin: '5px 0 0 0', fontSize: '14px', opacity: 0.9 }}>Programación, historiales y seguimiento de consultas</p>
          </div>
          <div style={{ fontSize: '38px', background: 'rgba(255,255,255,0.15)', padding: '12px 18px', borderRadius: '12px' }}>
            📅
          </div>
        </div>

        {/* Formulario de Citas */}
        <form onSubmit={handleSubmit} style={{ 
          background: '#ffffff', 
          padding: '30px', 
          borderRadius: '16px', 
          boxShadow: '0 10px 25px rgba(3, 105, 161, 0.08)', 
          border: '1px solid #bae6fd',
          marginBottom: '40px' 
        }}>
          <h3 style={{ marginTop: 0, color: '#0369a1', fontSize: '18px', borderBottom: '2px solid #f0f9ff', paddingBottom: '12px', marginBottom: '20px', fontWeight: '600' }}>
            ✨ Registrar Nueva Cita
          </h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#0369a1', fontSize: '13px' }}>Asunto:</label>
              <input type="text" name="asunto" value={form.asunto} onChange={handleChange} required placeholder="Ej. Control general" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db', boxSizing: 'border-box', outline: 'none' }} />
            </div>

            <div>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#0369a1', fontSize: '13px' }}>Fecha:</label>
              <input type="date" name="fecha" value={form.fecha} onChange={handleChange} required style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db', boxSizing: 'border-box', outline: 'none' }} />
            </div>

            <div>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#0369a1', fontSize: '13px' }}>Hora:</label>
              <input type="time" name="hora" value={form.hora} onChange={handleChange} required style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db', boxSizing: 'border-box', outline: 'none' }} />
            </div>

            <div>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#0369a1', fontSize: '13px' }}>Paciente:</label>
              <select name="id_paciente" value={form.id_paciente} onChange={handleChange} required style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db', boxSizing: 'border-box', background: '#fff', outline: 'none' }}>
                <option value="">Seleccione un paciente</option>
                {pacientes.map((p) => (
                  <option key={p.id} value={p.id}>{p.nombre} {p.apellido}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#0369a1', fontSize: '13px' }}>Doctor:</label>
              <select name="id_doctor" value={form.id_doctor} onChange={handleChange} required style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db', boxSizing: 'border-box', background: '#fff', outline: 'none' }}>
                <option value="">Seleccione un doctor</option>
                {doctores.map((d) => (
                  <option key={d.id} value={d.id}>Dr(a). {d.nombre} {d.apellido}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#0369a1', fontSize: '13px' }}>Estado:</label>
              <select name="estado" value={form.estado} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db', boxSizing: 'border-box', background: '#fff', outline: 'none' }}>
                <option value="Pendiente">Pendiente</option>
                <option value="Confirmada">Confirmada</option>
                <option value="Atendida">Atendida</option>
                <option value="Cancelada">Cancelada</option>
              </select>
            </div>

            <div style={{ gridColumn: 'span 3' }}>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#0369a1', fontSize: '13px' }}>Motivo:</label>
              <input type="text" name="motivo" value={form.motivo} onChange={handleChange} placeholder="Motivo de la consulta" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db', boxSizing: 'border-box', outline: 'none' }} />
            </div>

            <div>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#0369a1', fontSize: '13px' }}>Síntomas:</label>
              <textarea name="sintomas" value={form.sintomas} onChange={handleChange} rows="2" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db', boxSizing: 'border-box', outline: 'none', resize: 'vertical' }} />
            </div>

            <div>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#0369a1', fontSize: '13px' }}>Enfermedades:</label>
              <textarea name="enfermedades" value={form.enfermedades} onChange={handleChange} rows="2" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db', boxSizing: 'border-box', outline: 'none', resize: 'vertical' }} />
            </div>

            <div>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#0369a1', fontSize: '13px' }}>Medicamentos:</label>
              <textarea name="medicamentos" value={form.medicamentos} onChange={handleChange} rows="2" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db', boxSizing: 'border-box', outline: 'none', resize: 'vertical' }} />
            </div>

            <div style={{ gridColumn: 'span 3' }}>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#0369a1', fontSize: '13px' }}>Notas Adicionales:</label>
              <textarea name="notas_adicionales" value={form.notas_adicionales} onChange={handleChange} rows="2" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db', boxSizing: 'border-box', outline: 'none', resize: 'vertical' }} />
            </div>
          </div>

          <button type="submit" style={{ 
            marginTop: '25px', 
            background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)', 
            color: 'white', 
            border: 'none', 
            padding: '12px 25px', 
            borderRadius: '8px', 
            cursor: 'pointer', 
            fontWeight: '600',
            fontSize: '15px',
            boxShadow: '0 4px 12px rgba(2, 132, 199, 0.3)',
            transition: 'all 0.3s ease'
          }}>
            Guardar Cita
          </button>
        </form>

        {/* Listado de Citas */}
        <h3 style={{ color: '#0369a1', fontSize: '18px', marginBottom: '15px', fontWeight: '600' }}>📋 Listado de Citas Programadas</h3>
        <div style={{ background: 'white', borderRadius: '16px', boxShadow: '0 10px 25px rgba(3, 105, 161, 0.08)', overflow: 'hidden', border: '1px solid #bae6fd' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f0f9ff', color: '#0369a1', borderBottom: '2px solid #bae6fd' }}>
                <th style={{ padding: '15px', fontSize: '13px', fontWeight: '700' }}>ID</th>
                <th style={{ padding: '15px', fontSize: '13px', fontWeight: '700' }}>Asunto</th>
                <th style={{ padding: '15px', fontSize: '13px', fontWeight: '700' }}>Fecha y Hora</th>
                <th style={{ padding: '15px', fontSize: '13px', fontWeight: '700' }}>Paciente ID</th>
                <th style={{ padding: '15px', fontSize: '13px', fontWeight: '700' }}>Doctor ID</th>
                <th style={{ padding: '15px', fontSize: '13px', fontWeight: '700' }}>Estado</th>
                <th style={{ padding: '15px', fontSize: '13px', fontWeight: '700', textAlign: 'center' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {citas.length > 0 ? (
                citas.map((cita, index) => (
                  <tr key={cita.id} style={{ borderBottom: '1px solid #e5e7eb', background: index % 2 === 0 ? '#fff' : '#fafafa' }}>
                    <td style={{ padding: '12px 15px', color: '#374151', fontWeight: '500' }}>{cita.id}</td>
                    <td style={{ padding: '12px 15px', color: '#111827', fontWeight: '600' }}>{cita.asunto}</td>
                    <td style={{ padding: '12px 15px', color: '#4b5563' }}>{cita.fecha} - {cita.hora}</td>
                    <td style={{ padding: '12px 15px', color: '#4b5563' }}>{cita.id_paciente}</td>
                    <td style={{ padding: '12px 15px', color: '#4b5563' }}>{cita.id_doctor}</td>
                    <td style={{ padding: '12px 15px' }}>
                      <span style={{ 
                        padding: '4px 10px', 
                        borderRadius: '20px', 
                        fontSize: '12px', 
                        fontWeight: '600',
                        backgroundColor: cita.estado === 'Confirmada' ? '#dcfce7' : cita.estado === 'Pendiente' ? '#fef9c3' : cita.estado === 'Atendida' ? '#e0f2fe' : '#fee2e2',
                        color: cita.estado === 'Confirmada' ? '#166534' : cita.estado === 'Pendiente' ? '#854d0e' : cita.estado === 'Atendida' ? '#0369a1' : '#991b1b'
                      }}>
                        {cita.estado}
                      </span>
                    </td>
                    <td style={{ padding: '12px 15px', textAlign: 'center' }}>
                      <button onClick={() => handleDelete(cita.id)} style={{ background: '#ef4444', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: '600' }}>Eliminar</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '30px', color: '#9ca3af', fontStyle: 'italic' }}>
                    No hay citas registradas en el sistema.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}