import { useState } from "react";
import "./Card.css";
import axios from "axios";
import { useEffect } from "react";
function CardEquipos({ CodigoEquipo = "titulo por defecto", nombreequipo = "descripcion por defecto" }) {
    const[Integrantes,setIntegrantes]=useState([]);
    
    const BorraEquipo = async () => {
        const confirmacion = window.confirm('¿Estás seguro de que quieres eliminar el equipo?');
        if (confirmacion) {

            try {
                // Reemplaza la URL con tu endpoint de tipo DELETE
                const response = await axios.delete('http://localhost:3001/BorrarEquipo/'+CodigoEquipo);
          
                // Realiza alguna acción después de la eliminación exitosa
                console.log('Elemento eliminado con éxito', response.data);

              } catch (error) {
                // Maneja errores en caso de que la eliminación falle
                console.error('Error al intentar eliminar el elemento', error);
              }



          alert('equipo eliminado');
          window.location.reload(true);

        } else {
         
          alert('Eliminacion cancelada');
        }
      };
  
      useEffect(() => {
        const obtenerIntegrantes = async () => {
          try {
            const response = await axios.get('http://localhost:3001/integrantesxEquipo/'+CodigoEquipo);
            setIntegrantes(response.data);
          } catch (error) {
            console.error('Error al obtener competencias:', error);
          }
        };
    
        obtenerIntegrantes();
       
      }, []);
  
  
    return (
    <div className="Cuadrilla">
      <h2 style={{ color: 'cyan' }}>
        Codigo del equipo :{CodigoEquipo}
      </h2>
        Nombre del Equipo: {nombreequipo}
        <p></p> 
        Integrantes: 
        <ul>
        {Integrantes.map((v) => (
          <li key={v.codigointegrante}>
            <p>Nombre: {v.nombre} Código: {v.codigo} Materia: {v.materia}</p>
          </li>
        ))}
      </ul>
      
        <button class="Boton" onClick={BorraEquipo}>Borrar</button>

        
    </div>
  );
}

export default CardEquipos;