import React from 'react';
import  { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Registrosemestres() {
 
  const navigate=useNavigate();

  const [codigo,setCodigosemestre]=useState('');
  const [nombre,setNombre]=useState('');
  
  const volver=()=>{
    navigate(-1);
  
};
 

  const handleRegistroClick = async () => {
    try {
        const response = await axios.post('http://localhost:3001/Nuevosemestre/',{codigo,nombre});
        console.log('Equipo registrado:', response.data);
        alert('Equipo registrado con éxito');
        navigate('/MostrarSemestres');
  
        
      } catch (error) {
        console.error('Error al registrar Equipo:', error);
        alert('Error al registrar Equipo. Consulta la consola para más detalles.');
  
      }
  };





  return (
    <div class="Card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <h2>Registro Semestre</h2>
        <input
    type="text"
    value={codigo}
    onChange={(e) => setCodigosemestre(e.target.value)}
    placeholder="Codigosemestre"
    />

    <input
    type="text"
    value={nombre}
    onChange={(e) => setNombre(e.target.value)}
    placeholder="nombre"
    />

  
    <button class="Boton" onClick={handleRegistroClick} >
       Crear semestre nuevo
      </button>
      <button class="BotonVolver"onClick={volver}>VOLVER</button>
  </div>
  )
}
