import React from 'react';
import  { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

export default function RegistroEquipo() {
  const location = useLocation();
  const { state } = location;
  const navigate=useNavigate();
  const documentointegrante = state?.prop1;
  const [nombreequipo, setNombre] = useState('');
  const [codigoEquipo,setCodigoEquipo]=useState('');
  const volver=()=>{
    navigate(-1);
  
};
 

  const handleRegistroClick = async () => {
    try {
        const response = await axios.post('http://localhost:3001/registroEquipo/'+documentointegrante, {codigoEquipo,nombreequipo});
        console.log('Equipo registrado:', response.data);
        alert('Equipo registrado con éxito');
        navigate('/InterfaceIntegrante',{ state: { prop1: documentointegrante } });
  
        
      } catch (error) {
        console.error('Error al registrar Equipo:', error);
        alert('Error al registrar Equipo. Consulta la consola para más detalles.');
  
      }
  };





  return (
    <div class="Card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <h2>Registro Equipo {documentointegrante}</h2>
        <input
    type="text"
    value={nombreequipo}
    onChange={(e) => setNombre(e.target.value)}
    placeholder="Nombre del equipo"
    />

    <input
    type="text"
    value={codigoEquipo}
    onChange={(e) => setCodigoEquipo(e.target.value)}
    placeholder="Codigo"
    />

  
    <button class="Boton" onClick={handleRegistroClick} >
       Crear Equipo
      </button>
      <button class="BotonVolver" onClick={volver}>Volver</button>
  </div>
  )
}
