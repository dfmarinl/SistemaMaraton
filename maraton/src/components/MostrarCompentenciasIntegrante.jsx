import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CardCompetenciasIntegrantes from './CardCompetenciasIntegrantes';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


const MostrarCompetenciasIntegrante = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const volver=()=>{
      navigate(-1);
    
  }

  const { state } = location;
  const codigosemestre = state?.prop1;
  const [competencias, setCompetencias] = useState([]);
  const competenciasList = competencias.map((v) => {
    return <CardCompetenciasIntegrantes CodigoCompetencai={v.codigocompetencia} fechainicio={v.fechainicio} fechafin={v.fechafin} vigencia={v.periodovigente} categoria={v.categoria} />;
  });

  
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
    <div>
        <h1>Competencias vigentes</h1>
       <div className="container">{competenciasList}</div>
       <button onClick={volver}>Volver</button>
    
    </div>
  );
};

export default MostrarCompetenciasIntegrante;