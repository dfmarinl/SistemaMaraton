import React from 'react';
import  { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function Registrocompetidores() {
  const navigate=useNavigate();
  const [nombre, setNombre] = useState('');
  const [documento, setDocumento] = useState('');
  const [codigo, setCodigo] = useState('');
  const [materia,setMateria]= useState('');
  const [comprobacionlider,setComprobacionLider]=useState('');
  const [contraseña, setContraseña] = useState('');
  const handleSeleccionChange = (e) => {
    setMateria(e.target.value);
  };
  const handleSelectChange = (e) => {
    setComprobacionLider(e.target.value === 'true');
  };
  
  const volver=()=>{
    navigate('/Competidor');
  
};

  const handleRegistroClick = async () => {
    try {
      const response = await axios.post('http://localhost:3001/registroCompetidor', {documento, contraseña,codigo,nombre,materia,comprobacionlider});
      console.log('Administrador registrado:', response.data);
      alert('Administrador registrado con éxito');
      navigate('/Competidor');


      
    } catch (error) {
      console.error('Error al registrar Administrador:', error);
      alert('error al registrar Administrador');

    }
  };





  return (
    <div class="Card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <h2>Registro Competidor</h2>
      <input
        type="text"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder="Nombre de usuario"
      />
      <input
        type="text"
        value={codigo}
        onChange={(e) => setCodigo(e.target.value)}
        placeholder="Codigo"
      />
      <input
        type="text"
        value={documento}
        onChange={(e) => setDocumento(e.target.value)}
        placeholder="Documento"
      />
      <label>
      
        <select value={materia} onChange={handleSeleccionChange}>
          <option value="">Materia:</option>
          <option value="PBasica">PBasica</option>
          <option value="POO">POO</option>
          <option value="PAvanzada">PAvanzada</option>
          <option value="Otros">Otros</option>
        </select>
      </label>
      
      <label>
      
        <select value={comprobacionlider} onChange={handleSelectChange}>
          <option value="">Es lider?:</option>
          <option value="true">Si</option>
          <option value="false">No</option>
          
        </select>
      </label>
      
      <input
        type="password"
        value={contraseña}
        onChange={(e) => setContraseña(e.target.value)}
        placeholder="Contraseña"
      />
    <button class="Boton" onClick={handleRegistroClick} >
       Crear Competidor
      </button>
    <button class="BotonVolver" onClick={volver}> volver</button>
  </div>
  )
}
