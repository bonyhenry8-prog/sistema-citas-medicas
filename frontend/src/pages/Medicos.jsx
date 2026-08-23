import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosConfig from '../api/axiosConfig';

export default function Medicos() {
  const navigate = useNavigate();
  const [medicos, setMedicos] = useState([]);
  
  // Lista inicial de respaldo por si el backend no responde o está vacío
  const [especialidades, setEspecialidades] = useState([
    { id: 1, nombre: 'Cardiología' },
    { id: 2, nombre: 'Pediatría' },
    { id: 3, nombre: 'Dermatología' },
    { id: 4, nombre: 'Ginecología' },
    { id: 5, nombre: 'Oftalmología' },
    { id: 6, nombre: 'Ortopedia' }
  ]);
  
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    sexo: 'M',
    fecha_nacimiento: '',
    direccion: '',
    telefono: '',
    foto: '',
    id_especialidad: '',
    nuevaEspecialidad: ''
  });
  
  const [previewFoto, setPreviewFoto] = useState(null);

  const fetchMedicos = async () => {
    try {
      const response = await axiosConfig.get('/doctores');
      setMedicos(response.data);
    } catch (error) {
      console.error('Error al cargar médicos desde la base de datos:', error);
    }
  };

  const fetchEspecialidades = async () => {
    try {
      const response = await axiosConfig.get('/especialidades');
      if (response.data && response.data.length > 0) {
        setEspecialidades(response.data);
      }
    } catch (error) {
      console.error('Usando especialidades predeterminadas (backend no disponible o vacío):', error);
    }
  };

  useEffect(() => {
    fetchMedicos();
    fetchEspecialidades();
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
      let idEspecialidadFinal = form.id_especialidad;

      // Si selecciona "nueva" y escribió una especialidad personalizada
      if (form.id_especialidad === 'nueva' && form.nuevaEspecialidad.trim() !== '') {
        try {
          const resEsp = await axiosConfig.post('/especialidades', { nombre: form.nuevaEspecialidad.trim() });
          idEspecialidadFinal = resEsp.data.id || resEsp.data;
          await fetchEspecialidades();
        } catch (err) {
          console.error('Error al crear nueva especialidad en la BD:', err);
        }
      }

      // Estructura enviada al backend ajustada para JPA / Spring Boot
      await axiosConfig.post('/doctores', {
        nombre: form.nombre,
        apellido: form.apellido,
        sexo: form.sexo,
        fechaNacimiento: form.fecha_nacimiento || null,
        direccion: form.direccion,
        telefono: form.telefono,
        foto: form.foto,
        id_especialidad: Number(idEspecialidadFinal)
      });

      alert('¡Médico guardado con éxito en la base de datos!');
      setForm({
        nombre: '',
        apellido: '',
        sexo: 'M',
        fecha_nacimiento: '',
        direccion: '',
        telefono: '',
        foto: '',
        id_especialidad: '',
        nuevaEspecialidad: ''
      });
      setPreviewFoto(null);
      fetchMedicos(); // Refresca la tabla automáticamente con los registros de PostgreSQL
    } catch (error) {
      console.error('Error al guardar médico:', error);
      alert('Hubo un error al guardar el médico en la base de datos.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este médico de la base de datos?')) {
      try {
        await axiosConfig.delete(`/doctores/${id}`);
        fetchMedicos();
      } catch (error) {
        console.error('Error al eliminar médico:', error);
        alert('No se pudo eliminar el registro.');
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
            <h2 style={{ margin: 0, fontSize: '28px', fontWeight: '700', letterSpacing: '0.5px' }}>Directorio de Médicos</h2>
            <p style={{ margin: '5px 0 0 0', fontSize: '14px', opacity: 0.9 }}>Gestión de profesionales sincronizados con PostgreSQL</p>
          </div>
          <div style={{ fontSize: '38px', background: 'rgba(255,255,255,0.15)', padding: '12px 18px', borderRadius: '12px' }}>
            👨‍⚕️
          </div>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} style={{ 
          background: '#ffffff', 
          padding: '30px', 
          borderRadius: '16px', 
          boxShadow: '0 10px 25px rgba(3, 105, 161, 0.08)', 
          border: '1px solid #bae6fd',
          marginBottom: '40px' 
        }}>
          <h3 style={{ marginTop: 0, color: '#0369a1', fontSize: '18px', borderBottom: '2px solid #f0f9ff', paddingBottom: '12px', marginBottom: '20px', fontWeight: '600' }}>
            ✨ Registro de Nuevo Médico
          </h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#0369a1', fontSize: '13px' }}>Nombre:</label>
              <input type="text" name="nombre" value={form.nombre} onChange={handleChange} required style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db', boxSizing: 'border-box', outline: 'none' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#0369a1', fontSize: '13px' }}>Apellido:</label>
              <input type="text" name="apellido" value={form.apellido} onChange={handleChange} required style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db', boxSizing: 'border-box', outline: 'none' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#0369a1', fontSize: '13px' }}>Sexo:</label>
              <select name="sexo" value={form.sexo} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db', boxSizing: 'border-box', background: '#fff', outline: 'none' }}>
                <option value="M">Masculino (M)</option>
                <option value="F">Femenino (F)</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#0369a1', fontSize: '13px' }}>Fecha de Nacimiento:</label>
              <input type="date" name="fecha_nacimiento" value={form.fecha_nacimiento} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db', boxSizing: 'border-box', outline: 'none' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#0369a1', fontSize: '13px' }}>Teléfono:</label>
              <input type="text" name="telefono" value={form.telefono} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db', boxSizing: 'border-box', outline: 'none' }} />
            </div>
            
            {/* Selección de Especialidad */}
            <div>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#0369a1', fontSize: '13px' }}>Especialidad:</label>
              <select name="id_especialidad" value={form.id_especialidad} onChange={handleChange} required style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db', boxSizing: 'border-box', background: '#fff', outline: 'none' }}>
                <option value="">Seleccione una especialidad</option>
                {especialidades.map((esp) => (
                  <option key={esp.id} value={esp.id}>{esp.nombre}</option>
                ))}
                <option value="nueva">➕ Agregar otra especialidad...</option>
              </select>
            </div>

            {/* Input condicional si selecciona "Agregar otra especialidad" */}
            {form.id_especialidad === 'nueva' && (
              <div style={{ gridColumn: 'span 3', background: '#f0f9ff', padding: '15px', borderRadius: '8px', border: '1px dashed #0284c7' }}>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#0369a1', fontSize: '13px' }}>Nombre de la Nueva Especialidad:</label>
                <input type="text" name="nuevaEspecialidad" value={form.nuevaEspecialidad} onChange={handleChange} placeholder="Ej. Neurología" required style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #38bdf8', boxSizing: 'border-box', outline: 'none', background: '#fff' }} />
              </div>
            )}

            <div style={{ gridColumn: 'span 3' }}>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#0369a1', fontSize: '13px' }}>Dirección:</label>
              <input type="text" name="direccion" value={form.direccion} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db', boxSizing: 'border-box', outline: 'none' }} />
            </div>

            {/* Sección de Fotografía */}
            <div style={{ gridColumn: 'span 3', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#f0f9ff', padding: '15px 20px', border: '1px solid #bae6fd', borderRadius: '10px' }}>
              <div>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#0369a1', fontSize: '13px' }}>Fotografía del Médico:</label>
                <input type="file" accept="image/*" onChange={handleImageChange} style={{ fontSize: '13px' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span style={{ fontSize: '11px', color: '#0369a1', marginBottom: '4px', fontWeight: '700' }}>VISTA PREVIA</span>
                <div style={{ width: '65px', height: '65px', border: '2px solid #0284c7', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', background: '#ffffff', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
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
            Guardar Médico
          </button>
        </form>

        {/* Tabla de Registros */}
        <h3 style={{ color: '#0369a1', fontSize: '18px', marginBottom: '15px', fontWeight: '600' }}>📋 Listado de Médicos en la Base de Datos</h3>
        <div style={{ background: 'white', borderRadius: '16px', boxShadow: '0 10px 25px rgba(3, 105, 161, 0.08)', overflow: 'hidden', border: '1px solid #bae6fd' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f0f9ff', color: '#0369a1', borderBottom: '2px solid #bae6fd' }}>
                <th style={{ padding: '15px', fontSize: '13px', fontWeight: '700', textAlign: 'center' }}>Foto</th>
                <th style={{ padding: '15px', fontSize: '13px', fontWeight: '700' }}>ID</th>
                <th style={{ padding: '15px', fontSize: '13px', fontWeight: '700' }}>Nombres y Apellidos</th>
                <th style={{ padding: '15px', fontSize: '13px', fontWeight: '700' }}>Sexo</th>
                <th style={{ padding: '15px', fontSize: '13px', fontWeight: '700' }}>Teléfono</th>
                <th style={{ padding: '15px', fontSize: '13px', fontWeight: '700' }}>Especialidad ID</th>
                <th style={{ padding: '15px', fontSize: '13px', fontWeight: '700', textAlign: 'center' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {medicos.length > 0 ? (
                medicos.map((med, index) => (
                  <tr key={med.id || index} style={{ borderBottom: '1px solid #e5e7eb', background: index % 2 === 0 ? '#fff' : '#fafafa' }}>
                    <td style={{ padding: '12px 15px', textAlign: 'center' }}>
                      {med.foto ? (
                        <img src={med.foto} alt="Med" style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #0284c7' }} />
                      ) : (
                        <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: '#e0f2fe', color: '#0369a1', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', fontSize: '12px', fontWeight: 'bold' }}>N/A</div>
                      )}
                    </td>
                    <td style={{ padding: '12px 15px', color: '#374151', fontWeight: '500' }}>{med.id}</td>
                    <td style={{ padding: '12px 15px', color: '#111827', fontWeight: '600' }}>{med.nombre} {med.apellido}</td>
                    <td style={{ padding: '12px 15px', color: '#4b5563' }}>{med.sexo}</td>
                    <td style={{ padding: '12px 15px', color: '#4b5563' }}>{med.telefono}</td>
                    <td style={{ padding: '12px 15px', color: '#4b5563' }}>
                      {med.id_especialidad || (med.especialidad ? med.especialidad.id : 'N/A')}
                    </td>
                    <td style={{ padding: '12px 15px', textAlign: 'center' }}>
                      <button onClick={() => handleDelete(med.id)} style={{ background: '#ef4444', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: '600' }}>Eliminar</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '30px', color: '#9ca3af', fontStyle: 'italic' }}>
                    No hay médicos registrados en el sistema o la base de datos está vacía.
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