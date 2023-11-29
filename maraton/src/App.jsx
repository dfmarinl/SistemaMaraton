import "./App.css";
import Card from "./components/Card";
import CardEquipos from "./components/CardEquipos";
function App() {

  return (
    <div className="container">
      <Card title="ADMINISTRADOR" description="INGRESA AQUI SI ERES ADMINISTRADOR"></Card>
      <Card title="COMPETIDOR" description="INGRESA AQUI SI ERES COMPETIDOR"></Card>
      
    </div>
  );
}

export default App;