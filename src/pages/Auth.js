// pages/Auth.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const [accessCode, setAccessCode] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://fantasyfootball-comc.onrender.com/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ accesscode: accessCode }),
      });

      const data = await response.json();

      if (response.ok && data.idusuario) {
        // Guardar el usuario en localStorage o estado global si lo deseas
        localStorage.setItem('user', JSON.stringify(data));
        alert(`¡Bienvenido, ${data.name}!`);
        navigate('/');
      } else {
        alert('Código de acceso inválido');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al validar el código');
    }
  };

  return (
    <div style={{ backgroundColor: '#000000', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ backgroundColor: '#333333', padding: '40px', borderRadius: '10px', width: '100%', maxWidth: '400px' }}>
        <h1 style={{ color: '#FF69B4', fontSize: '2rem', textAlign: 'center', marginBottom: '20px' }}>Iniciar Sesión</h1>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ color: '#FF69B4', display: 'block', marginBottom: '5px' }} htmlFor="accesscode">
              Código de Acceso
            </label>
            <input
              type="text"
              id="accesscode"
              value={accessCode}
              onChange={(e) => setAccessCode(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '5px', backgroundColor: '#555555', color: '#ffffff' }}
              placeholder="Tu código de acceso"
            />
          </div>
          <button
            type="submit"
            style={{ width: '100%', backgroundColor: '#FF69B4', color: '#000000', padding: '10px', borderRadius: '5px', fontWeight: 'bold' }}
          >
            Iniciar Sesión
          </button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '20px' }}>
          ¿No tienes cuenta? <a href="#" style={{ color: '#FF69B4', textDecoration: 'underline' }}>Regístrate</a>
        </p>
      </div>
    </div>
  );
};

export default Auth;