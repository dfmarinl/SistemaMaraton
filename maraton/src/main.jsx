import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Card from './components/Card.jsx';
import Administrador from './components/Administrador.jsx';
import Competidor from './components/Competidor.jsx';
import MostrarUsuarios from './components/Mostrarusuarios.jsx';
import InterfaceAdmin from './components/InterfaceAdmin.jsx';
import Registrocompetidores from './components/Registrocompetidores.jsx';
import RegistroAdministrador from './components/RegistroAdministrador.jsx';
import CardCompetencias from './components/CardCompetencias.jsx';
import Mostrarcompetencias from './components/Mostrarcompetencias.jsx';
import Mostarequipos from './components/Mostarequipos.jsx';
import RegistroCopetencia from './components/RegistroCompetencia.jsx';
import ModificarCompetencia from './components/ModificarCompetencia.jsx';
import InterfaIntegrante from './components/InterfaceIntegrante.jsx';
import InterfaceIntegrante from './components/InterfaceIntegrante.jsx';
import ModificarEquipo from './components/ModificarEquipo.jsx';
import AgregarIntegrante from './components/AgregarIntegrante.jsx';
import RegistroEquipo from './components/RegistroEquipo.jsx';
import MostrarCompetenciasIntegrante from './components/MostrarCompentenciasIntegrante.jsx';
import MostrarCompetenciasDisponible from './components/MostrarCompetenciasDisponible.jsx';
import MostrarSemestres from './components/MostrarSemestres.jsx';
import Registrosemestres from './components/registrosemestres.jsx';
import Mostrarsemestresintegrante from './components/Mostrasemestreintegrante.jsx';

const router = createBrowserRouter([
  
  {
  path: "/",
  element: <App />,
  },
  {
    path: "Card",
    element: <Card />,
  },
  
  {
    path: "Administrador",
    element: <Administrador />,
  },

  {
    path: "/MostarCompetenciasIntegrante",
    element: <MostrarCompetenciasIntegrante prop1="Valor1" />,
  },

  {
    path: "MostrarSemestres",
    element: <MostrarSemestres porp1="Valor1" />,
  },

  {
    path: "/MostrarSemestresIntegrante",
    element: <Mostrarsemestresintegrante  porp1="Valor1" prop2="Valor2" prop3="Valor3"/>,
  },

  {
    path: "/RegistroSemestres",
    element: <Registrosemestres />,
  },


  {
    path: "Competidor",
    element: <Competidor />,
  },

  {
    path: '/InterfaceAdmin2',
    element: <InterfaceAdmin prop1="Valor1" prop2="Valor2" />,
  },

  
  {
    path: '/MostrarCompetenciasDiponibles',
    element: <MostrarCompetenciasDisponible prop1="Valor1"  prop2="Valor2" prop3="Valor3"/>,
  },

  {
    path: '/RegistroEquipo',
    element: <RegistroEquipo prop1="Valor1" />,
  },
  
  
  {
    path: '/AgregarIntegrante',
    element: <AgregarIntegrante prop1="Valor1" prop2="Valor" />,
  },
  
  {
    path: '/ModificarEquipo',
    element: <ModificarEquipo prop1="Valor1" prop2="Valor2" />,
  },
  


  {
    path: '/InterfaceIntegrante',
    element: <InterfaceIntegrante prop1="Valor1"/>,
  },


  {
    path:'/Modificarcompetencia',
    element: <ModificarCompetencia prop1="valor1" />,
  },

  {
    path: '/EquiposCompetencia',
    element: <Mostarequipos prop1="valor1"/>,
  },
 

  {
    path: "/Mostrarusuarios",
    element: <MostrarUsuarios />,
  },

  {
    path: "RegistroCompetencia",
    element: <RegistroCopetencia/>,
  },
  
  {
    path: "/InterfaceAdmin",
    element: <InterfaceAdmin />,
  },
 
  
 


  {
    path: "/Registrocompetidores",
    element: <Registrocompetidores />,
  },

  {
    path: "/RegistroAdministrador",
    element: <RegistroAdministrador />,
  },

  {
    path: "/Competencias",
    element:<CardCompetencias/>,

  },

  {
    path: "/Mostrarcompetencias",
    element:<Mostrarcompetencias prop1="valor1"/>,
  },

 


])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>,
)
