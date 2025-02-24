import React from 'react';
import Table from '../components/Table';
import useApi from '../hooks/useApi';

const Inventario = () => {
    const { data: productosData, deleteData, loading, error } = useApi('productos');

    const columns = [
        { Header: 'SKU', accessor: '_sku' },
        { Header: 'Lote', accessor: '_lote' },
        { Header: 'Nombre', accessor: '_nombre' },
        { Header: 'Precio', accessor: '_precio' },
        { Header: 'Stock', accessor: '_stock' },
        { Header: 'Categoría', accessor: '_categoriaNombre' },
        { Header: 'Fecha de Entrada', accessor: '_fechaEntrada' },
          { Header: 'Fecha de Vencimiento', accessor: '_fechaVencimiento' }
];  

    const handleEdit = (row) => {
        console.log("Edit:", row);
    };

    const handleDelete = async (item) => {
        console.log(item)
        await deleteData(item._sku);
        console.log("Deleted:", item._sku);
        
    };

    const formatData = (data) => {
        return data.map(item => ({
            ...item,
            _fechaVencimiento: new Date(item._fechaVencimiento).toLocaleDateString(),
            _fechaEntrada: new Date(item._fechaEntrada).toLocaleDateString()
        }));
    };

    return (
        <div className="container mx-auto p-4">
            {loading && <p className="text-center text-gray-600">Cargando inventario...</p>}
            {error && <p className="text-center text-red-500">{error}</p>}
            {!loading && !error && (
                <Table
                    columns={columns}
                    data={formatData(productosData)}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            )}
        </div>
    );
};

export default Inventario;
