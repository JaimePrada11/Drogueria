import React from 'react';

const CardBasic = ({ data }) => {
    return (
        <div className="relative flex flex-col font-sans items-center p-4 bg-white shadow rounded border border-gray-200 w-80">
            <div className="w-full flex justify-center">
                <img src={data.image} alt={data.nombre} className="w-full h-auto object-contain rounded-md shadow-xl" />
            </div>
            
            <div className="flex flex-col items-center mt-4 w-full relative">
                <h2 className="font-medium text-lg text-center">{data.nombre}</h2>
                
                <p className="mb-4 text-center text-sm text-gray-600">{data.descripcion}</p>
                <button className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 w-full">
                    Ver Producto
                </button>
            </div>
            
            <button className="absolute top-2 right-2 px-2 py-1 bg-blue-500 text-white text-xs rounded shadow hover:bg-blue-300 cursor-pointer">
                {data.categoriaNombre}
            </button>
        </div>
    );
};

export default CardBasic;
