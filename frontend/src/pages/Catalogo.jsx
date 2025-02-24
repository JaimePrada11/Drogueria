import React from "react";
import useApi from "../hooks/useApi";
import CardBasic from "../components/CardBasic";
import List from "../components/List";
import Header from "../components/Header";
import { MdError } from "react-icons/md";

const Catalogo = () => {
    const { data: productos, loading, error } = useApi("productos");

    return (
        <>
            <Header />
            <main className="container mx-auto px-4 py-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                    Catálogo de Productos
                </h2>
                <p className="text-gray-600 text-center mb-6">
                    Explora nuestra amplia variedad de productos disponibles para ti.
                </p>

                {!loading && !error && (
                    <List class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
                        {productos && productos.length > 0 ? (
                            productos.map((item) => (
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
                {error && <p className="text-center text-red-500">{error}</p>}
            </main>
        </>
    );
};

export default Catalogo;
