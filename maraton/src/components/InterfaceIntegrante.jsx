import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';
import CardEquipos from './CardEquipos';
import CardEquipoLider from './CardEquipoLider';
import RegistroEquipo from './RegistroEquipo';

export default function InterfaceIntegrante() {
  const location = useLocation();
  const { state } = location;
  const documentointegrante = state?.prop1;
  const [equipo, setEquipo] = useState({});
  const tipo=false;
  const navigate = useNavigate();
  const[lider,setlider]=useState([]);

  const crearequipo=()=>{
    navigate('/RegistroEquipo',{ state: { prop1: documentointegrante } })
  };

  const volver=()=>{
    navigate('/');
  
};

  const mostracompetencias=()=>{
    navigate('/MostrarSemestresIntegrante',{ state: { prop1: equipo.codigoequipo ,prop2: documentointegrante, prop3:'false'} });

  };
  useEffect(() => {
    const obtenerEquipo = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/EquiposPorIntegrante/`+documentointegrante);
        const equiposData = response.data;
        if (equiposData.length > 0) {
          setEquipo(equiposData[0]); 
        }
      } catch (error) {
        console.error('Error al obtener equipos:', error);
      }
    };
    const obtenercredencial = async () => {
        try {
          const response = await axios.get('http://localhost:3001/eslider/'+documentointegrante);
          setlider(response.data[0].comprobacionlider);
        } catch (error) {
          console.error('Error al obtener competencias:', error);
        }
      };
    obtenercredencial();

    obtenerEquipo();
  }, []);
  

  return (
    <div class="Card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {Object.keys(equipo).length > 0 ? (
        <>
          <h1>  DATOS DE TU EQUIPO</h1>
          <CardEquipoLider CodigoEquipo={equipo.codigoequipo} nombreequipo={equipo.nombreequipo} documentointegrante={documentointegrante} />
        </>
      ) : (
        <div>
          <p>No hay equipos disponibles.</p>
          <button class="Boton" disabled={!lider} onClick={crearequipo}>Crear equipo</button>

        </div>
        

      )}
      <button class="Boton" onClick={mostracompetencias}>VER COMPETENCIAS</button>
      <button class="BotonVolver" onClick={volver}>VOLVER</button>
      
    </div>
  );
}

