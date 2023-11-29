import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CardCompetencias from './CardCompetencias';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import CardCompetenciasLider from './CardCompetenciasLider';
import Card from './Card';
import CarSemestres from './CarSemestres';
import CardSemestreintegrante from './CardSemestreintegrante';


const Mostrarsemestresintegrante = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const codigoequipo = state?.prop1;
  const codigointegrante = state?.prop2;
  const inscribir = state?.prop3;
  const [semestres, setSemestres] = useState([]);
  const competenciasList = semestres.map((v) => {
    return <CardSemestreintegrante codigo={v.codigo} nombre={v.nombre}  codigointegrantes={codigointegrante} codigoequipo={codigoequipo} tipo={inscribir}/>;
  });
  
  const volver=()=>{
    navigate('/InterfaceIntegrante',{ state: { prop1: codigointegrante } })

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
    <div>
       <div className="container">{competenciasList}</div>
       <button class="BotonVolver" onClick={volver}>VOLVER</button>
       
    

    </div>
  );
};
export default Mostrarsemestresintegrante ;