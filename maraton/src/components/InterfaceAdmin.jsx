import React from 'react';
import Card from './Card';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function InterfaceAdmin( ) {

  const location = useLocation();
  const { state } = location;
  return (
    
        <div>
          <Card title="Competencias" description="Si quieres consultar las competencias activas"></Card>
          <Card title="Equipos" description="Quieres consulatar los equipos inscritos"></Card>
          <Link to="/Mostrarcompetencias">hola</Link>
          <p>Prop1: {state?.prop1}</p>
          <p>Prop2: {state?.prop2}</p>
          
        </div>
      
  )
}
