import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { differenceInDays } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';

export default function ModificarCompetencia() {
  const location = useLocation();
  const { state } = location;
  const codigocompetencia = state?.prop1;
  const [competencia, setCompetencia] = useState([]);
  const [categoria, setCategoria] = useState([]);
  const fechaInicial = new Date(); 
  const [fechainicio, setFechainicio] = useState(fechaInicial);
  const [fechafin, setFechafin] = useState(fechaInicial);
  const [vigencia, setVigencia] = useState([]);
  
  const volver=()=>{
    navigate(-1);
  
};
 
  const navigate=useNavigate();

  const handleSeleccionChange = (e) => {
    setCategoria(e.target.value);
  };

  const handleFechaChange = (date) => {
    setFechainicio(date);
    calcularDiferencia();
  };

  const handleFinChange = (date) => {
    setFechafin(date);
    calcularDiferencia();
  };

  const calcularDiferencia = () => {
    if (fechainicio && fechafin) {
      const diferenciaDias = differenceInDays(fechafin, fechainicio);
      setVigencia(diferenciaDias);
    }
  };

  useEffect(() => {
    const obtenerCompetencia = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/MostarCompetencia/`+codigocompetencia);
        const competenciaData = response.data[0];

        setCompetencia(competenciaData);
        setCategoria(competenciaData.categoria);
        setFechainicio(new Date(competenciaData.fechainicio));
        setFechafin(new Date(competenciaData.fechafin));
        setVigencia(competenciaData.periodovigente);
        calcularDiferencia();
      } catch (error) {
        console.error('Error al obtener competencia:', error);
      }
    };
    
     

    obtenerCompetencia();
  }, []);

  const manejoModify = async () => {
    try {
      const response = await axios.put('http://localhost:3001/ModificarCompetencia/'+codigocompetencia, {fechainicio, fechafin, vigencia, categoria});
      alert('Competencia modificada con éxito');
      navigate('/MostrarSemestres');

      
    } catch (error) {

      alert('error al modificar Competencia');
      

    }
  };
    
  return (
    <div class="Card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2>{competencia.categoria}</h2>
      <input type="text" value={codigocompetencia} placeholder="CodigoCompetencia" readOnly />

      <label>
        <select value={categoria} onChange={handleSeleccionChange}>
        <option value="">Categoria:</option>
        <option value="Basica">Basica</option>
        <option value="Intermedia">Intermedia</option>
        <option value="Avanzada">Avanzada</option>
        <option value="Elite">Elite</option>
        </select>
      </label>

      
      <div>
        <label>Fecha Inicio:</label>
        <DatePicker selected={fechainicio} onChange={handleFechaChange} dateFormat="yyyy/MM/dd" />
      </div>

      <div>
        <label>Fecha Fin:</label>
        <DatePicker selected={fechafin} onChange={handleFinChange} dateFormat="yyyy/MM/dd" />
      </div>

      <div>
        <label>Periodo vigente:</label>
        <input type="text" value={vigencia} readOnly />
      </div>
      <button class="Boton" onClick={manejoModify}>Modificar</button>
      <button class="BotonVolver" onClick={volver}>volver</button>
    </div>
    
  );
}
