import React from 'react';
import  { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { differenceInDays } from 'date-fns';


export default function RegistroCopetencia() {
 
  const navigate=useNavigate();
  

  const [codigocompetencia, setCodigoCompetencia] = useState('');
  const [fechainicio, seteFechaInicio] = useState('');
  const [fechafin, setFechaFin] = useState('');
  const [periodovigente, setPeriodoVigente] = useState('');
  const [categoria, setCategoria] = useState('');
  const [semestres,setSemestres]=useState([]);
  const [codigosemestre,setSemestre]=useState([]);
  const handleSeleccionChange = (e) => {
    setCategoria(e.target.value);
  };

  const handleFechaChange = (date) => {
    seteFechaInicio(date);
    calcularDiferencia();

    
  };
  const handleFinChange = (date) => {
    setFechaFin(date);
    calcularDiferencia();
    alert(fechainicio)
  };
 
 
  const calcularDiferencia = () => {
    const diferenciaDias = differenceInDays(fechafin, fechainicio);
    setPeriodoVigente(0);
    setPeriodoVigente(diferenciaDias);
  };
  const handleRegistroClick = async () => {
    try {
      const response = await axios.post('http://localhost:3001/registroCompetencia', {codigocompetencia, fechainicio, fechafin, periodovigente, categoria,codigosemestre});
      alert('Competencia registrado con éxito');
      navigate('/Mostrarcompetencias',{state: { prop1: codigosemestre }});

      
    } catch (error) {

      alert('error al registrar Competencia');

    }
  };
    
  useEffect(() => {
    const obtenerSemestres = async () => {
      try {
        const response = await axios.get('http://localhost:3001/Semestres');
        setSemestres(response.data);
      } catch (error) {
        console.error('Error al obtener opciones:', error);
      }
    };

    obtenerSemestres();
  }, []);




  return (
    <div  class="Card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <h2>REGISTRO COMPETENCIA </h2>
      <input
        type="text"
        value={codigocompetencia}
        onChange={(e) => setCodigoCompetencia(e.target.value)}
        placeholder="CodigoCompetencia"
      />
     
     <label htmlFor="fecha">Selecciona una fecha de inicio:</label>
      <DatePicker
        id="fecha"
        selected={fechainicio}
        onChange={handleFechaChange}
        dateFormat="dd/MM/yyyy" 
      />

      
    <label htmlFor="fecha">Selecciona una fecha de fin:</label>
      <DatePicker
        id="fecha"
        selected={fechafin}
        onChange={handleFinChange}
        dateFormat="dd/MM/yyyy" 
      />
      <label>
      <select value={categoria} onChange={handleSeleccionChange}>
        <option value="">Categoria:</option>
        <option value="Basica">Basica</option>
        <option value="Intermedia">Intermedia</option>
        <option value="Avanzada">Avanzada</option>
        <option value="Elite">Elite</option>
      </select>
      </label>


      <label>
  Semestre:
  <select value={codigosemestre} onChange={(e) => setSemestre(e.target.value)}>
    <option value="">Semestre</option>
    {semestres.map((semestre) => (
      <option key={semestre.codigo} value={semestre.codigo}>
        {semestre.nombre}
      </option>
    ))}
  </select>
</label>



    <div>
        <label>Periodo vigente</label>
        <input type="text" value={periodovigente} readOnly />
    </div>
     

    <button class="Boton" onClick={handleRegistroClick} >
       Crear Competencia
    </button>
  </div>
  )
}
