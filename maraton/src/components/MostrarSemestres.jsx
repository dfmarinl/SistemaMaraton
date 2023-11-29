import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CardCompetencias from './CardCompetencias';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import CardCompetenciasLider from './CardCompetenciasLider';
import Card from './Card';
import CarSemestres from './CarSemestres';
import CardSemestreintegrante from './CardSemestreintegrante';

const MostrarSemestres = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const codigoequipo = state?.prop1;
  const [semestres, setSemestres] = useState([]);
  const competenciasList = semestres.map((v) => {
    return <CarSemestres codigo={v.codigo} nombre={v.nombre} />;
  });
  
  const volver=()=>{
    navigate('/');
  
};
 
  const registrosemestre=()=>{
    navigate('/RegistroSemestres')
  }
  
  useEffect(() => {
    const obtenerSemestres = async () => {
      try {
        const response = await axios.get('http://localhost:3001/Semestres/');
        setSemestres(response.data);
      } catch (error) {
        console.error('Error al obtener competencias:', error);
      }
    };

    obtenerSemestres();
   
  }, []);
    
  return (
    <div className="Card" >
        <h1>SEMESTRES ACTIVOS </h1>
       <div className="container">{competenciasList}</div>
       <button className="Boton" onClick={registrosemestre}>REGISTRAR SEMESTRE</button>
       <button className="BotonVolver"onClick={volver} >VOLVER</button>
       
    

    </div>
  );
};
export default MostrarSemestres ;