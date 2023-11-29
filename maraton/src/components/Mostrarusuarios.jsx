import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card';

const MostrarUsuarios = () => {
    
  const [usuarios, setUsuarios] = useState([]);
  const usuariolist = usuarios.map((v) => {
    return <Card title={v.nombre} description={v.codigo} />;
  });
  useEffect(() => {
    const obtenerUsuarios = async () => {
      try {
        const response = await axios.get('http://localhost:3001/items');
        setUsuarios(response.data);
      } catch (error) {
        console.error('Error al obtener usuarios:', error);
      }
    };

    obtenerUsuarios();
  }, []);
    
  return (
    <div>
       <div className="container">{usuariolist}</div>
      <h2>Lista de Usuarios</h2>
      <ul>
        {usuarios.map((usuario) => (
          <li key={usuario.id}>
            <p>Nombre: {usuario.nombre}</p>
            <p>Código: {usuario.codigo}</p>

          </li>
        ))}
      </ul>

    </div>
  );
};

export default MostrarUsuarios;
