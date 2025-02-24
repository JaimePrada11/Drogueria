import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="shadow-lg">
            <nav className="container mx-auto flex items-center justify-between py-4 px-6">
                <div className="text-blue-900 font-extrabold text-3xl tracking-wider">
                    <Link to="/">MiDrogueria</Link>
                </div>
                
                {/* Botón de menú hamburguesa */}
                <button 
                    className="md:hidden text-blue-500 focus:outline-none" 
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>

                {/* Menú de navegación */}
                <div className={`absolute md:static top-16 left-0 w-full bg-white md:w-auto md:flex md:space-x-8 md:items-center p-4 md:p-0 ${isOpen ? 'block' : 'hidden'}`}>
                    <Link to="/" className="block text-blue-500 font-semibold text-lg transition-colors duration-300 hover:text-blue-600 py-2 md:py-0">Inicio</Link>
                    <Link to="/productos" className="block text-blue-500 font-semibold text-lg transition-colors duration-300 hover:text-blue-600 py-2 md:py-0">Productos</Link>
                    <Link to="/inventario" className="block text-blue-500 font-semibold text-lg transition-colors duration-300 hover:text-blue-600 py-2 md:py-0">Inventario</Link>
                </div>
            </nav>
        </header>
    );
};

export default Header;
