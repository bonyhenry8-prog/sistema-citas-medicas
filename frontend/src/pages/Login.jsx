import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // O tu instancia de axios configurada

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Ajusta la ruta de tu API de autenticación si es necesario
      const response = await axios.post('http://localhost:8081/api/auth/login', {
        username,
        password
      });
      
      // Guardar token o estado de sesión si tu backend lo devuelve
      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setError('Credenciales incorrectas o error de conexión con el servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      {/* Tarjeta de Login */}
      <div style={styles.card}>
        <div style={styles.headerContainer}>
          <div style={styles.iconCircle}>
            <svg style={styles.crossIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </div>
          <h2 style={styles.title}>Sistema Médico Integral</h2>
          <p style={styles.subtitle}>Acceso exclusivo para personal autorizado</p>
        </div>

        {error && <div style={styles.errorAlert}>{error}</div>}

        <form onSubmit={handleLogin} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Usuario</label>
            <input
              type="text"
              placeholder="Ingrese su usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Contraseña</label>
            <input
              type="password"
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          <button 
            type="submit" 
            style={{
              ...styles.button,
              opacity: loading ? 0.7 : 1,
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
            disabled={loading}
          >
            {loading ? 'Verificando...' : 'Iniciar Sesión'}
          </button>
        </form>

        <div style={styles.footer}>
          <p style={styles.footerText}>Clínica Médica de Alta Calidad &copy; 2026</p>
        </div>
      </div>
    </div>
  );
}

// Estilos profesionales corporativos en línea para garantizar un diseño limpio de inmediato
const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #f0f4f8 0%, #d9e2ec 100%)',
    fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    padding: '20px',
  },
  card: {
    background: '#ffffff',
    padding: '40px 35px',
    borderRadius: '16px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.08), 0 4px 10px rgba(0, 0, 0, 0.04)',
    width: '100%',
    maxWidth: '420px',
    boxSizing: 'border-box',
  },
  headerContainer: {
    textAlign: 'center',
    marginBottom: '30px',
  },
  iconCircle: {
    width: '60px',
    height: '60px',
    background: '#0284c7',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 16px auto',
    boxShadow: '0 4px 12px rgba(2, 132, 199, 0.3)',
  },
  crossIcon: {
    width: '30px',
    height: '30px',
    color: '#ffffff',
  },
  title: {
    margin: '0 0 8px 0',
    color: '#0f172a',
    fontSize: '24px',
    fontWeight: '700',
    letterSpacing: '-0.5px',
  },
  subtitle: {
    margin: 0,
    color: '#64748b',
    fontSize: '14px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  label: {
    color: '#334155',
    fontSize: '13px',
    fontWeight: '600',
  },
  input: {
    padding: '12px 16px',
    borderRadius: '8px',
    border: '1px solid #cbd5e1',
    fontSize: '15px',
    color: '#1e293b',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    backgroundColor: '#f8fafc',
  },
  button: {
    padding: '14px',
    backgroundColor: '#0284c7',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    transition: 'background-color 0.2s, transform 0.1s',
    marginTop: '10px',
    boxShadow: '0 4px 12px rgba(2, 132, 199, 0.2)',
  },
  errorAlert: {
    backgroundColor: '#ffeeec',
    color: '#dc2626',
    padding: '12px',
    borderRadius: '8px',
    fontSize: '13px',
    marginBottom: '20px',
    textAlign: 'center',
    border: '1px solid #fecaca',
    fontWeight: '500',
  },
  footer: {
    marginTop: '30px',
    textAlign: 'center',
  },
  footerText: {
    color: '#94a3b8',
    fontSize: '12px',
    margin: 0,
  }
};