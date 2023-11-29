import { useState } from "react";
import "./Card.css";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
function CarSemestres({ codigo = "titulo por defecto", nombre = "descripcion por defecto" }) {
    
   const navigate=useNavigate();

    const verCompetencia= ()=>{
        navigate('/Mostrarcompetencias',{ state: { prop1: codigo } });
    }



    const BorraEquipo = async () => {
        const confirmacion = window.confirm('¿Estás seguro de que quieres eliminar el equipo?');
        if (confirmacion) {

            try {
                // Reemplaza la URL con tu endpoint de tipo DELETE
                const response = await axios.delete('http://localhost:3001/borrarSemestre/'+codigo);
          
                // Realiza alguna acción después de la eliminación exitosa
                console.log('Elemento eliminado con éxito', response.data);
                window.location.reload(true);

              } catch (error) {
                // Maneja errores en caso de que la eliminación falle
                console.error('Error al intentar eliminar el elemento', error);
              }



          alert('equipo eliminado');
        } else {
         
          alert('Eliminacion cancelada');
        }
      };

  
  
    return (
    <div className="Cuadrilla">
      <h2 style={{ color: 'cyan' }}>
        CODIGO DEL SEMESTRE :{codigo}
      </h2>
        NOMBRE DEL SEMESTRE: {nombre}
        <p></p> 
       
       
        <button className="Boton"onClick={BorraEquipo}>Borrar</button>
        <button className="Boton" onClick={verCompetencia}>Ver Competencias</button>

        
    </div>
  );
}

export default CarSemestres;