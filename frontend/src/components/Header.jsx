import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className=" shadow-lg">
            <nav className="container mx-auto flex items-center justify-between py-4 px-6">
                <div className="text-blue-900 font-extrabold text-3xl tracking-wider">
                    <Link to="/"  >
                        MiDrogueria

                    </Link>

                </div>
                <div className="flex space-x-8">
                    <Link
                        to="/"
                        className="text-blue-500 font-semibold text-lg transition-colors duration-300 hover:text-blue-600"
                    >
                        Inicio
                    </Link>
                    <Link
                        to="/productos"
                        className="text-blue-500 font-semibold text-lg transition-colors duration-300 hover:text-blue-600"
                    >
                        Productos
                    </Link>
                    <Link
                        to="/inventario"
                        className="text-blue-500  font-semibold text-lg transition-colors duration-300 hover:text-blue-600"
                    >
                        Inventario
                    </Link>
                </div>
            </nav>
        </header>
    );
};

export default Header;
