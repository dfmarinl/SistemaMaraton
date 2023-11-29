import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function ModificarEquipo() {
  const location = useLocation();
  const { state } = location;
  const CodigoEquipo = state?.prop1;
  const documentointegrante = state?.prop2;
  const[integrantes,setIntegrantes]=useState([]);
  const[confirmacionAgregar,setComfirmacion]=useState([]);
  const[equipo,setEquipo]=useState([]);
  const[lider,setlider]=useState('');
  
  const navigate=useNavigate();

     const volver=()=>{
       navigate(-1);
     };
     const obtenercredencial = async (codigoper) => {
      try {
        const response = await axios.get('http://localhost:3001/eslider/'+codigoper);
        setlider(response.data[0].comprobacionlider);
      } catch (error) {
        console.error('Error al obtener competencias:', error);
      }
    };

  useEffect(() => {
    const obtenerIntegrantes = async () => {
        try {
            const response = await axios.get('http://localhost:3001/integrantesxEquipo/'+CodigoEquipo);
            setIntegrantes(response.data);
          } catch (error) {
            console.error('Error al obtener competencias:', error);
          }
    };
    const botonactivo = async () => {
        try {
            const response = await axios.get('http://localhost:3001/NumeroIntegrantes/'+CodigoEquipo);
            setComfirmacion(response.data);
          } catch (error) {
            console.error('Error al obtener competencias:', error);
          }
    };
  



    const obtenerEquipo = async () => {
        try {
            const response = await axios.get('http://localhost:3001/infoEquipo/'+CodigoEquipo);
            setEquipo(response.data[0]);
          } catch (error) {
            console.error('Error al obtener competencias:', error);
          }
    };
    obtenerEquipo();
    botonactivo();
    obtenerIntegrantes();
  }, []);

  const borrarIntegrante = async (documento) => {
    obtenercredencial(documento);
    
    if (documentointegrante!=documento) {
      const confirmacion = window.confirm('¿Estás seguro de que quieres eliminar al integrante?');
      if (confirmacion) {
        try {
          const response = await axios.delete('http://localhost:3001/BorrarIntegrante/' + CodigoEquipo + '/' + documento);
        } catch (error) {
          console.error('Error al borrar integrante:', error);
        }
        alert('Integrante eliminado');
        window.location.reload(true);
      } else {
        alert('Eliminación cancelada');
      }
    } else {
      alert('El integrante es líder y no puede ser eliminado');
    }
  };
  
  const agregarIntegrante = async () => {
    navigate('/AgregarIntegrante',{ state: { prop1: CodigoEquipo, prop2:documentointegrante } })
};

  

    
  return (
    <div className="Card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    
      <div>lider: {documentointegrante}
      <h2>{equipo.nombreequipo}</h2>
      <table class="Tabla">
        <thead>
          <tr>
            <th>Documento</th>
            <th>Nombre</th>
            <th>Materia</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {integrantes.map((i) => (
            <tr key={i.nombre}>
              <td>{i.documento}</td>
              <td>{i.nombre}</td>
              <td>{i.materia}</td>
              <td>
                <button className="Boton"  onClick={() => borrarIntegrante(i.documento)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <button className="Boton" onClickCapture={agregarIntegrante} disabled={confirmacionAgregar}>Agregar Integrante</button>
    <button className="BotonVolver" onClick={volver}>VOLVER</button>


    </div>
    
  );
}
