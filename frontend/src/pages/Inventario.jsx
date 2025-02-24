import React, { useState, useEffect } from 'react';
import Table from '../components/Table';
import useApi from '../hooks/useApi';
import Form from '../components/Form';
import axios from 'axios';

const Inventario = () => {
    const { data: productosData, deleteData, putData, postData, refetch, loading, error } = useApi('productos');
    const [editingProduct, setEditingProduct] = useState(null);
    const [formData, setFormData] = useState({});
    const [categorySuggestions, setCategorySuggestions] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/api/categorias")
            .then(res => setCategorySuggestions(res.data))
            .catch(err => console.error("Error fetching categories:", err));
    }, []);

    const handleCategoryBlur = (e) => {
        let value = e.target.value.trim();
        if (value.length > 0) {
            value = value.charAt(0).toUpperCase() + value.slice(1);
            if (!value.endsWith('s') && !value.endsWith('S')) {
                value += 's';
            }
        }
        setFormData(prev => ({ ...prev, _categoriaNombre: value }));
    };

    const displayColumns = [
        { Header: 'SKU', accessor: '_sku' },
        { Header: 'Lote', accessor: '_lote' },
        { Header: 'Nombre', accessor: '_nombre' },
        { Header: 'Precio', accessor: '_precio' },
        { Header: 'Stock', accessor: '_stock' },
        { Header: 'Categoría', accessor: '_categoriaNombre' },
        { Header: 'Fecha de Entrada', accessor: '_fechaEntradaDisplay' },
        { Header: 'Fecha de Vencimiento', accessor: '_fechaVencimientoDisplay' }
    ];

    const formFields = [
        { name: '_imagen', label: 'Imagen URL', type: 'text', required: true },
        { name: '_nombre', label: 'Nombre', type: 'text', required: true },
        { name: '_descripcion', label: 'Descripción', type: 'text', required: true },
        { name: '_precio', label: 'Precio', type: 'number', required: true },
        { name: '_stock', label: 'Stock', type: 'number', required: true },
        { name: '_lote', label: 'Lote', type: 'text', required: true },
        {
            name: '_categoriaNombre',
            label: 'Categoría',
            type: 'text',
            required: true,
            list: 'categorias',
            onBlur: handleCategoryBlur
        },
        { name: '_fechaVencimiento', label: 'Fecha de Vencimiento', type: 'date', required: true },

    ];

    const formatData = (data) => {
        return data.map(item => ({
            ...item,
            _fechaEntradaDisplay: new Date(item._fechaEntrada).toLocaleDateString(),
            _fechaVencimientoDisplay: new Date(item._fechaVencimiento).toLocaleDateString()
        }));
    };

    const handleEdit = (row) => {
        const rawProduct = productosData.find(p => p._sku === row._sku);
        if (!rawProduct) return;
        setEditingProduct(rawProduct);
        const updatedFormData = { ...rawProduct };
        if (updatedFormData._fechaVencimiento) {
            const dateObj = new Date(updatedFormData._fechaVencimiento);
            updatedFormData._fechaVencimiento = !isNaN(dateObj.getTime())
                ? dateObj.toISOString().split('T')[0]
                : "";
        }
        setFormData(updatedFormData);
    };

    const handleCreate = () => {
        setEditingProduct({});
        setFormData({
            _imagen: '',
            _nombre: '',
            _descripcion: '',
            _precio: '',
            _stock: '',
            _lote: '',
            _fechaVencimiento: '',
            _categoriaNombre: '',
        });
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            imagen: formData._imagen,
            nombre: formData._nombre,
            descripcion: formData._descripcion,
            precio: formData._precio,
            stock: formData._stock,
            lote: formData._lote,
            fechaVencimiento: formData._fechaVencimiento,
            categoriaNombre: formData._categoriaNombre,
        };
        if (editingProduct && editingProduct._sku) {
            await putData(formData._sku, payload);
        } else {
            await postData(payload);
        }
        await refetch();
        setEditingProduct(null);
    };

    const handleCancelEdit = () => {
        setEditingProduct(null);
    };

    const handleDelete = async (item) => {
        await deleteData(item._sku);
        await refetch();
    };

    return (
        <div className="container mx-auto p-4">

            <h1 className="text-4xl font-bold text-center mb-6">
                Inventario
            </h1>
            <div className="flex justify-end mb-4">
                <button
                    onClick={handleCreate}
                    className="px-4 py-2 bg-green-500 text-white rounded text-sm"
                >
                    Nuevo Producto
                </button>
            </div>

            {loading && <p className="text-center text-gray-600">Cargando inventario...</p>}
            {error && <p className="text-center text-red-500">{error}</p>}
            {!loading && !error && (
                <Table
                    columns={displayColumns}
                    data={formatData(productosData)}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            )}


            {/* Modal para creación/edición */}
            {editingProduct !== null && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 overflow-auto">
                    <div className="bg-white p-6 rounded shadow-md w-full max-w-md mx-4">
                        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
                            {editingProduct && editingProduct._sku ? "Editar Producto" : "Nuevo Producto"}
                        </h2>
                        <form onSubmit={handleFormSubmit}>
                            <Form
                                fields={formFields}
                                initialData={formData}
                                onChange={handleFormChange}
                            />
                            <div className="mt-4 flex justify-end">
                                <button
                                    type="button"
                                    onClick={handleCancelEdit}
                                    className="mr-2 px-4 py-2 bg-gray-500 text-white rounded text-sm"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-500 text-white rounded text-sm"
                                >
                                    Guardar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <datalist id="categorias">
                {categorySuggestions.map(cat => (
                    <option key={cat.id} value={cat.nombre} />
                ))}
            </datalist>
        </div>
    );
};

export default Inventario;
