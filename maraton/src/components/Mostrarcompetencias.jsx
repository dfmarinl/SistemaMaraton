import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CardCompetencias from './CardCompetencias';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Mostrarcompetencias = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const codigosemestre = state?.prop1;
  const [competencias, setCompetencias] = useState([]);
  const competenciasList = competencias.map((v) => {
    return <CardCompetencias CodigoCompetencai={v.codigocompetencia} fechainicio={v.fechainicio} fechafin={v.fechafin} vigencia={v.periodovigente} categoria={v.categoria}/>;
  });
   
  const volver=()=>{
    navigate(-1);
  
};
   const handleNuevaCompetencia =() =>{
    navigate('/RegistroCompetencia')
   }
  useEffect(() => {
    const obtenerCompetencias = async () => {
      try {
        const response = await axios.get('http://localhost:3001/MostrarCompetenciasSemestre/'+codigosemestre);
        setCompetencias(response.data);
      } catch (error) {
        console.error('Error al obtener competencias:', error);
      }
    };

    obtenerCompetencias();
   
  }, []);
    
  return (
    <div class="Card">
        <h1>COMPETENCIAS VIGENTES</h1>
       <div className="container">{competenciasList}</div>
       
       <button class="Boton" onClick={handleNuevaCompetencia}>Nueva competencia</button>
       <button class="BotonVolver" onClick={volver}>volver</button>
       
    

    </div>
  );
};

export default Mostrarcompetencias;