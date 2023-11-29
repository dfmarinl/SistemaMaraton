import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Competidor = () => {
  const [documento, setNombre] = useState('');
  const [contraseña, setCodigo] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    navigate('/Registrocompetidores');
  };

  const handleInicioClick = async() =>{
    try {
      const response = await axios.post('http://localhost:3001/loginIntegrante', { documento, contraseña });

      if (response.data.success) {
        alert('Inicio de sesión exitoso');
        navigate('/InterfaceIntegrante',{ state: { prop1: documento } });


      } else {
        alert('Credenciales incorrectas');
        
      }
    } catch (error) {
      alert('Error en el login:', error);
    }
  }

  return (
    <div class="Card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2>LOGIN COMPETIDOR</h2>
      <input
        type="text"
        value={documento}
        onChange={(e) => setNombre(e.target.value)}
        placeholder="Documento"
      />
      <input
        type="password"
        value={contraseña}
        onChange={(e) => setCodigo(e.target.value)}
        placeholder="Contraseña"
      />
      <button class="Boton" onClick={handleInicioClick} >
        Iniciar Sesión
      </button>
      <button class="Boton" onClick={handleRegister}>Registrarse</button>

      
    </div>
  );
};

export default Competidor;

