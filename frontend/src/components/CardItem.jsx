import React from 'react';

const CardItemDetailed = ({ data }) => {
    return (
        <div className="flex flex-col font-sans items-center p-6 bg-white shadow rounded border border-gray-200">
            <div> 
                <img src={data.image} alt={data.nombre} className="w-64 rounded-md shadow-xl" />
                
            </div>
            <div className="flex flex-col items-center">
                <h2 className="font-medium text-lg">{data.nombre}</h2>
                <p className="mb-4">{data.descripcion}</p>
                <dl className="mt-2 text-sm leading-6 font-medium space-y-2">
                    <div className="flex items-center">
                        <dt className="text-slate-600 w-1/3">Precio:</dt>
                        <dd className="text-slate-800">${data.precio}</dd>
                    </div>
                    <div className="flex items-center">
                        <dt className="text-slate-600 w-1/3">Stock:</dt>
                        <dd className="text-slate-800">{data.stock}</dd>
                    </div>
                    <div className="flex items-center">
                        <dt className="text-slate-600 w-1/3">Lote:</dt>
                        <dd className="text-slate-800">{data.lote}</dd>
                    </div>
                    <div className="flex items-center">
                        <dt className="text-slate-600 w-1/3">Fecha de Vencimiento:</dt>
                        <dd className="text-slate-800">{new Date(data.fechaVencimiento).toLocaleDateString()}</dd>
                    </div>
                    <div className="flex items-center">
                        <dt className="text-slate-600 w-1/3">SKU:</dt>
                        <dd className="text-slate-800">{data.sku}</dd>
                    </div>
                    <div className="flex items-center">
                        <dt className="text-slate-600 w-1/3">Fecha de Entrada:</dt>
                        <dd className="text-slate-800">{new Date(data.fechaEntrada).toLocaleDateString()}</dd>
                    </div>
                </dl>
                <button className="mt-4 px-2 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
                    {data.categoriaNombre}
                </button>
            </div>
        </div>
    );
};


export default CardItemDetailed;
