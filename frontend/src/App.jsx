import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Inventario from "./pages/Inventario";
import Catalogo from "./pages/Catalogo";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<Catalogo />} />
        <Route path="/inventario" element={<Inventario />} />
      </Routes>
    </>
  );
}

export default App;
