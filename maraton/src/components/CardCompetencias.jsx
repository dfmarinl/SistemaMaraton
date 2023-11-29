import "./Card.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';


function CardCompetencias({ CodigoCompetencai = "titulo por defecto", fechainicio = "descripcion por defecto",fechafin="Fecha fin",vigencia="vigencia", categoria="algo" }) {
   
   const navigate = useNavigate();
   
    const Equipos = ()=>{
      
   }
   const Consultarequipos = () =>{
    navigate('/EquiposCompetencia', { state: { prop1: CodigoCompetencai } });
   };


   const modificarCompetencia = () =>{
    navigate('/ModificarCompetencia', { state: { prop1: CodigoCompetencai } });
   };
   
    const BorrarCompetencia = async () => {
        const confirmacion = window.confirm('¿Estás seguro de que quieres eliminar la competencia?');
        if (confirmacion) {

            try {
                // Reemplaza la URL con tu endpoint de tipo DELETE
                const response = await axios.delete('http://localhost:3001/BorrarCompetencia/'+CodigoCompetencai);
          
                // Realiza alguna acción después de la eliminación exitosa
                console.log('Elemento eliminado con éxito', response.data);
              } catch (error) {
                // Maneja errores en caso de que la eliminación falle
                console.error('Error al intentar eliminar el elemento', error);
              }

          alert('Competencia eliminada');
          window.location.reload(true);
          
        } else {
         
          alert('Eliminacion cancelada');
        }
      };
    return (
    <div className="Cuadrilla">
      <h2 style={{ color: 'cyan' }} >
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
        <button className="Boton" onClick={modificarCompetencia}>Editar</button>
        <button className="Boton" onClick={Consultarequipos}>Consultar equipos</button>
        <button className="Boton" onClick={BorrarCompetencia}>Borrar</button>
        
    </div>
  );
}

export default CardCompetencias;