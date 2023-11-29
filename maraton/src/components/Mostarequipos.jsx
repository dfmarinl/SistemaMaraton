import axios from 'axios';
import CardEquipos from './CardEquipos';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const Mostarequipos = () => {
  const location = useLocation();
  const { state } = location;
  const codigocompetencia = state?.prop1;
  const navigate=useNavigate();
  
  const volver=()=>{
    navigate(-1);
  
};

  const [equipos, setEquipos] = useState([]);
  const equipolist = equipos.map((v) => {
    return <CardEquipos CodigoEquipo={v.codigoequipo} nombreequipo={v.nombreequipo}/>;
  });
  useEffect(() => {
    const obtenerEquipos = async () => {
      try {
        const response = await axios.get('http://localhost:3001/Equipos/'+codigocompetencia);
        setEquipos(response.data);
      } catch (error) {
        console.error('Error al obtener competencias:', error);
      }
    };

    obtenerEquipos();
   
  }, []);


    
  return (
    <div>
       <div className="container">{equipolist}</div>
       <button class="BotonVolver" onClick={volver}>VOLVER</button>
      
    </div>
  );
};

export default Mostarequipos;