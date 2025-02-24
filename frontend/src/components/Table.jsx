import React from 'react';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const Table = ({ columns, data, onEdit, onDelete }) => {
    return (
        <div>
            <div className="overflow-x-auto rounded-lg shadow-lg">
                <table className="min-w-full table-auto border-collapse rounded-lg">
                    <thead>
                        <tr className="bg-gray-100 rounded-t-lg">
                            {columns.map((col) => (
                                <th key={col.accessor} className="px-4 py-2 text-center text-gray-700">{col.Header}</th>
                            ))}
                            <th className="px-4 py-2 text-center text-gray-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, index) => (
                            <tr key={index} className={`bg-white`}>
                                {columns.map((col) => (
                                    <td key={col.accessor} className="px-4 py-2 text-center text-gray-600">{row[col.accessor]}</td>
                                ))}
                                <td className="px-4 py-2 text-left flex space-x-2 items-center">
                                    <button
                                        onClick={() => onEdit(row)}
                                        className="px-3 py-1 rounded-md flex items-center transition-transform duration-300 hover:scale-105"
                                    >
                                        <FaEdit className="mr-1 text-yellow-500 text-xl" />
                                    </button>
                                    <button
                                        onClick={() => onDelete(row)}
                                        className="px-3 py-1 rounded-md flex items-center transition-transform duration-300 hover:scale-105"
                                    >
                                        <MdDelete className="mr-1 text-red-500 text-xl" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Table;
