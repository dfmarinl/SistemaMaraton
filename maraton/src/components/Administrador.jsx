import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import "./Card.css";

function Administrador() {
  const [botonHabilitado, setBotonHabilitado] = useState(true);
  const [documento, setDocumento] = useState('');
  const [contraseña, setContraseña] = useState('');
  const navigate = useNavigate();

  const handleRegistroClick = async () => {
    navigate('/RegistroAdministrador');
  };


  const volver = () => {
    navigate('/');

  };
  const handleInicioClick = async () => {
    try {
      const response = await axios.post('http://localhost:3001/loginAd', { documento, contraseña });

      if (response.data.success) {
        alert('Inicio de sesión exitoso');
        navigate('/MostrarSemestres');



      } else {
        alert('Credenciales incorrectas');

      }
    } catch (error) {
      alert('Error en el login:', error);
    }
  };


  useEffect(() => {
    const fetchDataFromDatabase = async () => {
      try {
        const response = await axios.get('http://localhost:3001/Admin');
        const resultadoConsulta = response.data;
        setBotonHabilitado(resultadoConsulta.length === 0);
      } catch (error) {
        console.error('Error al realizar la consulta:', error);
        setBotonHabilitado(false);
      }
    };
    fetchDataFromDatabase();
  }, []);


  return (
    <div className="Card" >
      <h2 style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>LOGIN ADMINISTRADOR</h2>

      <input className="Barra"
        type="text"
        value={documento}
        onChange={(e) => setDocumento(e.target.value)}
        placeholder="DOCUMENTO"
      />
      <input className="Barra"
        type="password"
        value={contraseña}
        onChange={(e) => setContraseña(e.target.value)}
        placeholder="CONTRASEÑA"
      />

      <button onClick={handleInicioClick}  className="Boton">
        INICIAR SESION
      </button>
      <button onClick={volver} className="BotonVolver">VOLVER</button>
      <br />
      <button className="Boton" onClick={handleRegistroClick} disabled={!botonHabilitado} >
        CREAR ADMINISTRADOR
      </button>

    </div>
  )
}

export default Administrador