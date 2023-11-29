import { useState } from "react";
import "./Card.css";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
function CardEquipoLider({ CodigoEquipo = "titulo por defecto", nombreequipo = "descripcion por defecto", documentointegrante=2}) {
    const[Integrantes,setIntegrantes]=useState([]);
    const[lider,setlider]=useState([]);
    const[tipe,setTipe]=useState('true');
    const[equipoinscrito,setEquipoinscrito]=useState();
    const navigate=useNavigate();
    const inscribir=()=>{
      navigate('/MostrarSemestresIntegrante',{ state: { prop1: CodigoEquipo ,prop2: documentointegrante,prop3:'true'} });
      
    }
    
    const ModificarEquipo=()=>{
         navigate('/ModificarEquipo',{ state: { prop1: CodigoEquipo, prop2:documentointegrante } });
    }
    const BorraEquipo = async () => {
        
        const confirmacion = window.confirm('¿Estás seguro de que quieres eliminar el equipo?');
        if (confirmacion) {

            try {
                // Reemplaza la URL con tu endpoint de tipo DELETE
                const response = await axios.delete('http://localhost:3001/BorrarEquipoLider/'+CodigoEquipo+'/'+documentointegrante);
          
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
  
      useEffect(() => {
        const obtenerIntegrantes = async () => {
          try {
            const response = await axios.get('http://localhost:3001/integrantesxEquipo/'+CodigoEquipo);
            setIntegrantes(response.data);
          } catch (error) {
            console.error('Error al obtener competencias:', error);
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

          const equipoinscrito = async () => {
            try {
              const response = await axios.get('http://localhost:3001/Equipoinscrito/'+CodigoEquipo);
              setEquipoinscrito(response);
            } catch (error) {
              console.error('Error al obtener competencias:', error);
            }
          };
        equipoinscrito();
        obtenercredencial();
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
        {lider ? (
       <button class="Boton" onClick={BorraEquipo} disabled={!lider}>Borrar</button>
        ) : null}

        {lider ? (
       <button class="Boton" disabled={equipoinscrito} onClick={inscribir}>Inscribir equipo</button> 
        ) : null}

        {lider ? (
               <button class="Boton" onClick={ModificarEquipo} disabled={!lider}>Modificar equipo</button> 
        ) : null}
        
    </div>
  );
}

export default CardEquipoLider;