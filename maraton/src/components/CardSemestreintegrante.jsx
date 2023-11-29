import { useState } from "react";
import "./Card.css";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CardSemestreintegrante({ codigo = "titulo por defecto", nombre = "descripcion por defecto" ,codigointegrantes="",codigoequipo="defecto",tipo='true'}) {
    
   const navigate=useNavigate();
   const[lider,setlider]=useState([]);

    const verCompetencia= ()=>{
        navigate('/MostarCompetenciasIntegrante',{ state: { prop1: codigo } });
    }
    
    const verCompetenciasDisponibles= ()=>{
      if(tipo=='true'){
      
      alert('Ingreso');
      navigate('/MostrarCompetenciasDiponibles',{ state: { prop1: codigoequipo ,prop2: codigo,prop3:codigointegrantes} });

    }

      else{
        alert('Aceptado');
        navigate('/MostarCompetenciasIntegrante',{ state: { prop1: codigo } });
      }
    }

    useEffect(() => {
    
      const obtenercredencial = async () => {
          try {
            const response = await axios.get('http://localhost:3001/eslider/'+codigointegrantes);
            setlider(response.data[0].comprobacionlider);
          } catch (error) {
            console.error('Error al obtener competencias:', error);
          }
        };
      obtenercredencial();     
    }, []);

  
  
    return (
    <div className="Card">
      <h2>
        Codigo del Semestre :{codigo}
      </h2>
        Semestre: {nombre} 
        <p></p> 
        {(!lider)? (
        <button onClick={verCompetencia}>Ver Competencias</button>
        ) : null}
       
        {lider? (
       <button class="Boton" onClick={verCompetenciasDisponibles}>Ver Competencias</button>
        ) : null}


        
    </div>
  );
}

export default CardSemestreintegrante;