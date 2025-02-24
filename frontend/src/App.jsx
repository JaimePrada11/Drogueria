import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './pages/home';
import Inventario from './pages/Inventario';
import Catalogo from './pages/Catalogo';

function App() {

  return (
    <>
      <Router>

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/productos' element={<Catalogo />} />
          <Route path='/inventario' element={<Inventario />} />

        </Routes>
      </Router>
    </>
  )
}

export default App
