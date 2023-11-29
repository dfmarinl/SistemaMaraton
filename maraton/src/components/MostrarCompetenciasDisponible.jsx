import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CardCompetencias from './CardCompetencias';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import CardCompetenciasLider from './CardCompetenciasLider';

const MostrarCompetenciasDisponible = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const codigoequipo = state?.prop1;
  const codigosemestre= state?.prop2;
  const codigolider=state?.prop3;
  const [competencias, setCompetencias] = useState([]);
  const competenciasList = competencias.map((v) => {
    return <CardCompetenciasLider CodigoCompetencai={v.codigocompetencia} fechainicio={v.fechainicio} fechafin={v.fechafin} vigencia={v.periodovigente} categoria={v.categoria} codigoequipo={codigoequipo} integrante={codigolider}/>;
  });
  const volver=()=>{
    navigate(-1);
  
}
  
  useEffect(() => {
    const obtenerCompetencias = async () => {
      try {
        const response = await axios.get('http://localhost:3001/CompetenciasDisponiblesSemestre/'+codigoequipo+'/'+codigosemestre);
        setCompetencias(response.data);
      } catch (error) {
        console.error('Error al obtener competencias:', error);
      }
    };

    obtenerCompetencias();
   
  }, []);
    
  return (
    <div className="Card" >
        <h1>Competencias disponibles</h1>
       <div className="Cuadrilla">{competenciasList}</div>
       <button className="BotonVolver" onClick={volver}>volver</button>
       
    

    </div>
  );
};
export default MostrarCompetenciasDisponible ;