import "./Card.css";
import React, { useState, useEffect } from 'react';


function CardCompetenciasIntegrantes({ CodigoCompetencai = "titulo por defecto", fechainicio = "descripcion por defecto",fechafin="Fecha fin",vigencia="vigencia", categoria="algo" }) {
   
    const Equipos = ()=>{
      
   }
    
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
        
        
    </div>
  );
}

export default CardCompetenciasIntegrantes;