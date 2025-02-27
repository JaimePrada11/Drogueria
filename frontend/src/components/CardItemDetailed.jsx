import React from 'react';

const CardItemDetailed = ({ data }) => {
    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-200">
            <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0">
                    <img src={data.image} alt={data.nombre} className="w-64 rounded-md shadow-md" />
                </div>
                <div className="flex flex-col flex-grow">
                    <h2 className="font-bold text-2xl text-gray-800 mb-2">{data.nombre}</h2>
                    <p className="text-gray-600 mb-4">{data.descripcion}</p>
                    <div className="flex items-center gap-2">
                        <span className="text-yellow-500 text-xl">★★★★★</span>
                        <span className="text-gray-600">({data.reviews})</span>
                    </div>
                    <div className="text-lg font-semibold text-red-600 mt-2">
                        ${data.precio} <span className="text-gray-500 line-through text-sm">${data.precioAnterior}</span>
                    </div>
                    <button className="mt-4 px-4 py-2 bg-pink-500 text-white font-semibold rounded-lg hover:bg-pink-600">Comprar</button>
                </div>
            </div>
            
            <div className="mt-6 p-4 border-t">
                <h3 className="font-bold text-lg text-gray-800 mb-2">Especificaciones:</h3>
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
                    <div><strong>Marca:</strong> {data.marca}</div>
                    <div><strong>Presentación:</strong> {data.presentacion}</div>
                    <div><strong>ID Invima:</strong> {data.invima}</div>
                    <div><strong>Unidad:</strong> {data.unidad}</div>
                    <div><strong>SKU:</strong> {data.sku}</div>
                    <div><strong>Fecha de Vencimiento:</strong> {new Date(data.fechaVencimiento).toLocaleDateString()}</div>
                </div>
            </div>
        </div>
    );
};

export default CardItemDetailed;
