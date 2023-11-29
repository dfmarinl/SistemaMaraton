import React from 'react';
import  { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';



export default function AgregarIntegrante() {
    const location = useLocation();
  const { state } = location;
  const CodigoEquipo = state?.prop1;
  const documentointegrante =state?.prop2;
  const [nombre, setNombre] = useState('');
  const [documento, setDocumento] = useState('');
  const [codigo, setCodigo] = useState('');
  const [materia,setMateria]= useState('');
  const [comprobacionlider,setComprobacionLider]=useState(false);
  const [contraseña, setContraseña] = useState('');
  const navigate=useNavigate();
  const handleSeleccionChange = (e) => {
    setMateria(e.target.value);
  };
  const handleSelectChange = (e) => {
    setComprobacionLider(e.target.value === 'true');
  };

  const handleRegistroClick = async () => {
    try {
      const response = await axios.post('http://localhost:3001/agregarIntegrante/'+CodigoEquipo, {documento, contraseña,codigo,nombre,materia,comprobacionlider});
      console.log('Administrador registrado:', response.data);
      alert('integranteagregado registrado con éxito');
      navigate('/ModificarEquipo',{ state: { prop1: CodigoEquipo,prop2:documentointegrante } })

      
    } catch (error) {
      console.error('Error al registrar Administrador:', error);
      alert('error al registrar Administrador');

    }
  };





  return (
    <div class="Card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <h2>Registro Competidor {CodigoEquipo}</h2>
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
      <input
        type="password"
        value={contraseña}
        onChange={(e) => setContraseña(e.target.value)}
        placeholder="Contraseña"
      />
    <button class="Boton" onClick={handleRegistroClick} >
       Crear Competidor
      </button>
  </div>
  )
}
