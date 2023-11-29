import React from 'react';
import  { useState, useEffect } from 'react';
import axios from 'axios';


export default function RegistroAdministrador() {

  const [nombre, setNombre] = useState('');
  const [documento, setDocumento] = useState('');
  const [contraseña, setContraseña] = useState('');
 

  const handleRegistroClick = async () => {
    try {
      const response = await axios.post('http://localhost:3001/registroAdministrador', {documento, contraseña,nombre});
      console.log('Administrador registrado:', response.data);
      alert('Administrador registrado con éxito');

      
    } catch (error) {
      console.error('Error al registrar Administrador:', error);
      alert('error al registrar Administrador');

    }
  };





  return (
    <div class="Card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <h2>Registro Administrador</h2>
      <input
        type="text"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder="Nombre de usuario"
      />
     
      <input
        type="text"
        value={documento}
        onChange={(e) => setDocumento(e.target.value)}
        placeholder="Documento"
      />  
      <input
        type="password"
        value={contraseña}
        onChange={(e) => setContraseña(e.target.value)}
        placeholder="Contraseña"
      />
    <button class="Boton" onClick={handleRegistroClick} >
       Crear Administrador
      </button>
  </div>
  )
}
