import React, { useState } from "react";
import List from "../components/List";
import CardBasic from "../components/CardBasic";
import useApi from "../hooks/useApi";
import { FaPills, FaSyringe, FaBandAid, FaPrescriptionBottle, FaSearch } from "react-icons/fa";

const Home = () => {
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");

    const endpoint = selectedCategory
        ? `productos/categoria/${selectedCategory}`
        : "productos";
    const { data: productosData, loading, error } = useApi(endpoint);
    const { data: categoriaData } = useApi("categorias");

    // Definimos un arreglo de iconos genéricos en orden fijo
    const icons = [FaPills, FaSyringe, FaBandAid, FaPrescriptionBottle];

    let displayedProducts = [];
    if (!selectedCategory && !search) {
        displayedProducts =
            productosData && productosData.length > 0
                ? [...productosData].sort(() => 0.5 - Math.random()).slice(0, 6)
                : [];
    } else {
        displayedProducts = productosData || [];
        if (search) {
            displayedProducts = displayedProducts.filter((item) =>
                item._nombre.toLowerCase().includes(search.toLowerCase())
            );
        }
    }

    const handleCategoryClick = (categoryName) => {
        if (selectedCategory === categoryName) {
            setSelectedCategory("");
        } else {
            setSelectedCategory(categoryName);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <div className="w-full mb-6">
                <img
                    src="https://images.pexels.com/photos/3683051/pexels-photo-3683051.jpeg"
                    className="shadow-xl w-full h-82 object-cover rounded-lg"
                    alt="Background"
                />
            </div>

            {loading && <p className="text-center text-gray-600">Cargando productos...</p>}
            {error && <p className="text-center text-red-500">{error}</p>}

            <div className="my-4 flex gap-4 flex-wrap justify-center">
                {categoriaData &&
                    categoriaData.slice(0, 4).map((cat, i) => {
                        const Icon = icons[i % icons.length];
                        return (
                            <button
                                key={cat._id || cat.id || cat.nombre}
                                onClick={() => handleCategoryClick(cat.nombre)}
                                className={`w-24 h-24 p-4 rounded-lg flex flex-col items-center justify-center gap-2 transition-all duration-300 ${
                                    selectedCategory === cat.nombre
                                        ? "bg-blue-500 text-white shadow-lg"
                                        : "bg-gray-200 text-gray-800 hover:bg-blue-300"
                                }`}
                            >
                                <Icon className="text-4xl" />
                                <span className="text-sm">{cat.nombre}</span>
                            </button>
                        );
                    })}
            </div>

            <div className="my-4 flex justify-center">
                <div className="w-full max-w-md relative">
                    <input
                        type="text"
                        placeholder="Buscar producto..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full p-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"
                    />
                    <FaSearch className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500" />
                </div>
            </div>

            {!loading && !error && !selectedCategory && (
                <div className="my-4 text-center text-xl font-bold">
                    Nuestros Recomendados
                </div>
            )}

            {!loading && !error && (
                <List className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {displayedProducts.length > 0 ? (
                        displayedProducts.map((item) => (
                            <CardBasic
                                key={item._sku}
                                data={{
                                    nombre: item._nombre,
                                    descripcion: item._descripcion,
                                    categoriaNombre: item._categoriaNombre,
                                    image: item._imagen
                                }}
                            />
                        ))
                    ) : (
                        <p className="text-center">No se encontraron productos.</p>
                    )}
                </List>
            )}
        </div>
    );
};

export default Home;
