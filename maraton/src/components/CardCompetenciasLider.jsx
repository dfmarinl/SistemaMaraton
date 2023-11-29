import "./Card.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';


function CardCompetenciasLider({ CodigoCompetencai = "titulo por defecto", fechainicio = "descripcion por defecto",fechafin="Fecha fin",vigencia="vigencia", categoria="algo",codigoequipo="",integrante="" }) {
   
   const navigate = useNavigate();
   
   const incripcionequipo = async () => {
    try {
        const response = await axios.post('http://localhost:3001/InscripcionEquipo/', {CodigoCompetencai,codigoequipo});
        console.log('Equipo registrado:', response.data);
        alert('Equipo registrado con éxito');
        navigate('/InterfaceIntegrante',{ state: { prop1: integrante } })


        
  
        
      } catch (error) {
        console.error('Error al registrar Equipo:', error);
        alert('Error al registrar Equipo. Consulta la consola para más detalles.');
  
      }
  };

   

    return (
    <div className="Card">
      <h2>
        {CodigoCompetencai}
      </h2>
      
        Fecha de inicio: {fechainicio}
       <p> </p>
        Categoria: {categoria}
        <p></p>

        Fecha de finalizacion: {fechafin}
        <p></p>
        Vigencia : {vigencia} dias
        <p></p>   
        <button className="Boton" onClick={incripcionequipo} >INSCRIBIR</button>

       
        
    </div>
  );
}

export default CardCompetenciasLider;