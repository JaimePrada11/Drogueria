import React, { useMemo, useState } from "react";
import List from "../components/List";
import CardBasic from "../components/CardBasic";
import useApi from "../hooks/useApi";
import { FaPills, FaSyringe, FaBandAid, FaPrescriptionBottle, FaSearch } from "react-icons/fa";
import Header from "../components/Header";
import Services from "../components/Services";
import { MdError } from "react-icons/md";


const Home = () => {
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");

    const { data: allProductosData } = useApi("productos");
    const endpoint = selectedCategory ? `productos/categoria/${selectedCategory}` : "productos";
    const { data: productosData, loading, error } = useApi(endpoint);
    const { data: categoriaData } = useApi("categorias");

    const icons = [FaPills, FaSyringe, FaBandAid, FaPrescriptionBottle];

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
        <>
            <Header />

            <div className="container mx-auto p-4  rounded-lg mt-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Droguería Online: Domicilio las 24 Horas</h2>
                <p className="text-gray-700 mb-4">¡Hola, Bienvenido a MiDrogueria! Encuentra todo lo que necesitas en un solo lugar, desde medicamentos hasta productos de despensa.</p>
            </div>

            <div className="container mx-auto p-4">
                <div className="w-full mb-6">
                    <img
                        src="https://images.pexels.com/photos/5910953/pexels-photo-5910953.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                        className="shadow-xl w-full h-82 object-cover rounded-lg"
                        alt="Background"
                    />
                </div>

                <Services />

                {loading && <p className="text-center text-gray-600">Cargando productos...</p>}
                {error && <p className="text-center text-red-500">{error}</p>}

                <div className="my-4 flex gap-4 flex-wrap justify-center">
                    {sortedCategories.map((cat, i) => {
                        const Icon = icons[i % icons.length];
                        return (
                            <button
                                key={cat._id || cat.id || cat.nombre}
                                onClick={() => handleCategoryClick(cat.nombre)}
                                className={`w-24 h-24 p-4 rounded-lg flex flex-col items-center justify-center gap-2 transition-all duration-300 ${selectedCategory === cat.nombre
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
                    <div className="my-4 text-left pl-20 text-xl font-bold">
                        Nuestros Recomendados
                    </div>
                )}

                {!loading && !error && (
                    <List >
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
                            <div className="flex flex-col items-center justify-center p-8 rounded-lg  my-8">
                                <MdError className="text-gray-400 text-6xl mb-4" />
                                <p className="text-gray-500 text-xl text-center">No se encontraron productos.</p>
                            </div>
                        )}
                    </List>
                )}
            </div>





            <div className="container mx-auto p-4 text-center text-sm text-gray-500 mt-4">
                © {new Date().getFullYear()} MiDrogueria. Todos los derechos reservados.
            </div>

        </>

    );
};

export default Home;
