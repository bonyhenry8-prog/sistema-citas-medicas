import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosConfig from '../api/axiosConfig';

export default function Pacientes() {
  const navigate = useNavigate();
  const [pacientes, setPacientes] = useState([]);
  const [form, setForm] = useState({
    nombres: '',
    apellidos: '',
    fechaNacimiento: '',
    sexo: 'M',
    direccion: '',
    telefono: '',
    email: '',
    telegramId: '',
    foto: '',
    medicamento: '',
    alergias: '',
    estado: 'Activo'
  });
  
  const [previewFoto, setPreviewFoto] = useState(null);

  const fetchPacientes = async () => {
    try {
      const response = await axiosConfig.get('/pacientes');
      setPacientes(response.data);
    } catch (error) {
      console.error('Error al cargar pacientes:', error);
    }
  };

  useEffect(() => {
    fetchPacientes();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewFoto(reader.result);
        setForm({ ...form, foto: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosConfig.post('/pacientes', {
        nombres: form.nombres,
        apellidos: form.apellidos,
        fechaNacimiento: form.fechaNacimiento,
        sexo: form.sexo,
        direccion: form.direccion,
        telefono: form.telefono,
        email: form.email,
        telegramId: form.telegramId,
        foto: form.foto,
        medicamento: form.medicamento,
        alergias: form.alergias,
        estado: form.estado
      });
      alert('Paciente guardado con éxito');
      setForm({
        nombres: '',
        apellidos: '',
        fechaNacimiento: '',
        sexo: 'M',
        direccion: '',
        telefono: '',
        email: '',
        telegramId: '',
        foto: '',
        medicamento: '',
        alergias: '',
        estado: 'Activo'
      });
      setPreviewFoto(null);
      fetchPacientes();
    } catch (error) {
      console.error('Error al guardar paciente:', error);
      alert('Hubo un error al guardar el paciente.');
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)', 
      padding: '40px 20px', 
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" 
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Botón de Regresar al Dashboard */}
        <div style={{ marginBottom: '20px' }}>
          <button 
            onClick={() => navigate('/dashboard')} 
            style={{ 
              background: '#ffffff', 
              color: '#047857', 
              border: '1px solid #10b981', 
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

        {/* Cabecera Diferenciada en tonos Esmeralda */}
        <div style={{ 
          background: 'linear-gradient(135deg, #065f46 0%, #047857 100%)', 
          color: 'white', 
          padding: '25px 30px', 
          borderRadius: '16px', 
          boxShadow: '0 10px 25px rgba(6, 95, 70, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '30px'
        }}>
          <div>
            <h2 style={{ margin: 0, fontSize: '28px', fontWeight: '700', letterSpacing: '0.5px' }}>Directorio de Pacientes</h2>
            <p style={{ margin: '5px 0 0 0', fontSize: '14px', opacity: 0.9 }}>Control de expedientes, historiales y seguimiento clínico</p>
          </div>
          <div style={{ fontSize: '38px', background: 'rgba(255,255,255,0.15)', padding: '12px 18px', borderRadius: '12px' }}>
            🩺
          </div>
        </div>

        {/* Formulario Estilizado con Gama Menta/Verde */}
        <form onSubmit={handleSubmit} style={{ 
          background: '#ffffff', 
          padding: '30px', 
          borderRadius: '16px', 
          boxShadow: '0 10px 25px rgba(4, 120, 87, 0.08)', 
          border: '1px solid #a7f3d0',
          marginBottom: '40px' 
        }}>
          <h3 style={{ marginTop: 0, color: '#065f46', fontSize: '18px', borderBottom: '2px solid #ecfdf5', paddingBottom: '12px', marginBottom: '20px', fontWeight: '600' }}>
            ✨ Registro de Nuevo Paciente
          </h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#065f46', fontSize: '13px' }}>Nombres:</label>
              <input type="text" name="nombres" value={form.nombres} onChange={handleChange} required style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db', boxSizing: 'border-box', outline: 'none' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#065f46', fontSize: '13px' }}>Apellidos:</label>
              <input type="text" name="apellidos" value={form.apellidos} onChange={handleChange} required style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db', boxSizing: 'border-box', outline: 'none' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#065f46', fontSize: '13px' }}>Fecha de Nacimiento:</label>
              <input type="date" name="fechaNacimiento" value={form.fechaNacimiento} onChange={handleChange} required style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db', boxSizing: 'border-box', outline: 'none' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#065f46', fontSize: '13px' }}>Sexo:</label>
              <select name="sexo" value={form.sexo} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db', boxSizing: 'border-box', background: '#fff', outline: 'none' }}>
                <option value="M">Masculino (M)</option>
                <option value="F">Femenino (F)</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#065f46', fontSize: '13px' }}>Teléfono:</label>
              <input type="text" name="telefono" value={form.telefono} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db', boxSizing: 'border-box', outline: 'none' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#065f46', fontSize: '13px' }}>Email:</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db', boxSizing: 'border-box', outline: 'none' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#065f46', fontSize: '13px' }}>Dirección:</label>
              <input type="text" name="direccion" value={form.direccion} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db', boxSizing: 'border-box', outline: 'none' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#065f46', fontSize: '13px' }}>Telegram ID:</label>
              <input type="text" name="telegramId" value={form.telegramId} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db', boxSizing: 'border-box', outline: 'none' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#065f46', fontSize: '13px' }}>Estado:</label>
              <select name="estado" value={form.estado} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db', boxSizing: 'border-box', background: '#fff', outline: 'none' }}>
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#065f46', fontSize: '13px' }}>Medicamento:</label>
              <input type="text" name="medicamento" value={form.medicamento} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db', boxSizing: 'border-box', outline: 'none' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#065f46', fontSize: '13px' }}>Alergias:</label>
              <input type="text" name="alergias" value={form.alergias} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db', boxSizing: 'border-box', outline: 'none' }} />
            </div>

            {/* Sección de Fotografía */}
            <div style={{ gridColumn: 'span 3', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#f0fdf4', padding: '15px 20px', border: '1px solid #a7f3d0', borderRadius: '10px' }}>
              <div>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#047857', fontSize: '13px' }}>Fotografía del Paciente:</label>
                <input type="file" accept="image/*" onChange={handleImageChange} style={{ fontSize: '13px' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span style={{ fontSize: '11px', color: '#047857', marginBottom: '4px', fontWeight: '700' }}>VISTA PREVIA</span>
                <div style={{ width: '65px', height: '65px', border: '2px solid #059669', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', background: '#ffffff', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                  {previewFoto ? (
                    <img src={previewFoto} alt="Vista previa" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <span style={{ fontSize: '10px', color: '#9ca3af', textAlign: 'center' }}>Sin foto</span>
                  )}
                </div>
              </div>
            </div>

          </div>

          <button type="submit" style={{ 
            marginTop: '25px', 
            background: 'linear-gradient(135deg, #059669 0%, #047857 100%)', 
            color: 'white', 
            border: 'none', 
            padding: '12px 25px', 
            borderRadius: '8px', 
            cursor: 'pointer', 
            fontWeight: '600',
            fontSize: '15px',
            boxShadow: '0 4px 12px rgba(5, 150, 105, 0.3)',
            transition: 'all 0.3s ease'
          }}>
            Guardar Paciente
          </button>
        </form>

        {/* Tabla de Registros */}
        <h3 style={{ color: '#065f46', fontSize: '18px', marginBottom: '15px', fontWeight: '600' }}>📋 Listado de Pacientes Activos</h3>
        <div style={{ background: 'white', borderRadius: '16px', boxShadow: '0 10px 25px rgba(4, 120, 87, 0.08)', overflow: 'hidden', border: '1px solid #a7f3d0' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f0fdf4', color: '#065f46', borderBottom: '2px solid #a7f3d0' }}>
                <th style={{ padding: '15px', fontSize: '13px', fontWeight: '700', textAlign: 'center' }}>Foto</th>
                <th style={{ padding: '15px', fontSize: '13px', fontWeight: '700' }}>ID</th>
                <th style={{ padding: '15px', fontSize: '13px', fontWeight: '700' }}>Nombres y Apellidos</th>
                <th style={{ padding: '15px', fontSize: '13px', fontWeight: '700' }}>Teléfono</th>
                <th style={{ padding: '15px', fontSize: '13px', fontWeight: '700' }}>Email</th>
                <th style={{ padding: '15px', fontSize: '13px', fontWeight: '700' }}>Estado</th>
                <th style={{ padding: '15px', fontSize: '13px', fontWeight: '700', textAlign: 'center' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {pacientes.length > 0 ? (
                pacientes.map((pac, index) => (
                  <tr key={pac.id} style={{ borderBottom: '1px solid #e5e7eb', background: index % 2 === 0 ? '#fff' : '#fafafa' }}>
                    <td style={{ padding: '12px 15px', textAlign: 'center' }}>
                      {pac.foto ? (
                        <img src={pac.foto} alt="Pac" style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #059669' }} />
                      ) : (
                        <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: '#d1fae5', color: '#065f46', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', fontSize: '12px', fontWeight: 'bold' }}>N/A</div>
                      )}
                    </td>
                    <td style={{ padding: '12px 15px', color: '#374151', fontWeight: '500' }}>{pac.id}</td>
                    <td style={{ padding: '12px 15px', color: '#111827', fontWeight: '600' }}>{pac.nombres} {pac.apellidos}</td>
                    <td style={{ padding: '12px 15px', color: '#4b5563' }}>{pac.telefono}</td>
                    <td style={{ padding: '12px 15px', color: '#4b5563' }}>{pac.email}</td>
                    <td style={{ padding: '12px 15px' }}>
                      <span style={{ 
                        background: pac.estado === 'Activo' ? '#d1fae5' : '#fee2e2', 
                        color: pac.estado === 'Activo' ? '#065f46' : '#991b1b', 
                        padding: '4px 10px', 
                        borderRadius: '6px', 
                        fontSize: '12px', 
                        fontWeight: '700' 
                      }}>
                        {pac.estado}
                      </span>
                    </td>
                    <td style={{ padding: '12px 15px', textAlign: 'center' }}>
                      <button style={{ background: '#ef4444', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: '600' }}>Eliminar</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '30px', color: '#9ca3af', fontStyle: 'italic' }}>
                    No hay pacientes registrados en el sistema.
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