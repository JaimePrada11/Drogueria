import React, { useMemo, useState } from "react";
import List from "../components/List";
import CardBasic from "../components/CardBasic";
import useApi from "../hooks/useApi";
import { FaPills, FaSyringe, FaBandAid, FaPrescriptionBottle, FaSearch } from "react-icons/fa";

const Home = () => {
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");

    // Llamada para obtener TODOS los productos (sin filtro) para el cálculo inicial de categorías
    const { data: allProductosData } = useApi("productos");
    // Llamada para obtener productos filtrados según la categoría seleccionada (o todos si no hay filtro)
    const endpoint = selectedCategory ? `productos/categoria/${selectedCategory}` : "productos";
    const { data: productosData, loading, error } = useApi(endpoint);
    const { data: categoriaData } = useApi("categorias");

    const icons = [FaPills, FaSyringe, FaBandAid, FaPrescriptionBottle];

    // Calcular el orden inicial de categorías basándose en allProductosData (que no cambia)
    const sortedCategories = useMemo(() => {
        if (!allProductosData || !categoriaData) return [];
        const count = {};
        allProductosData.forEach(producto => {
            const nombre = producto._categoriaNombre;
            if (nombre) {
                count[nombre] = (count[nombre] || 0) + 1;
            }
        });
        return [...categoriaData]
            .sort((a, b) => (count[b.nombre] || 0) - (count[a.nombre] || 0))
            .slice(0, 4);
    }, [allProductosData, categoriaData]);

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
        setSelectedCategory(prev => (prev === categoryName ? "" : categoryName));
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

            {/* Mostrar siempre las 4 categorías en el orden calculado inicialmente */}
            <div className="my-4 flex gap-4 flex-wrap justify-center">
                {sortedCategories.map((cat, i) => {
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

            {/* Barra de búsqueda */}
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
