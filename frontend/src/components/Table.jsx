import React from 'react';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const Table = ({ columns, data, onEdit, onDelete }) => {
  return (
    <div>
      {/* Version escritorio */}
      <div className="hidden sm:block overflow-x-auto rounded-lg shadow-lg">
        <table className="min-w-full table-auto border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              {columns.map((col) => (
                <th key={col.accessor} className="px-4 py-3 text-center font-semibold">
                  {col.Header}
                </th>
              ))}
              <th className="px-4 py-3 text-center font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr
                key={index}
                className={`border-b ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
              >
                {columns.map((col) => (
                  <td key={col.accessor} className="px-4 py-3 text-center text-gray-700">
                    {row[col.accessor]}
                  </td>
                ))}
                <td className="px-4 py-3 text-center flex justify-center space-x-3 items-center">
                  <button
                    onClick={() => onEdit(row)}
                    className="p-2 rounded-lg flex items-center  hover:scale-105 "
                  >
                    <FaEdit className="mr-1 text-yellow-600 text-lg" />
                  </button>
                  <button
                    onClick={() => onDelete(row)}
                    className="p-2 rounded-lg flex items-center  hover:scale-105 "
                  >
                    <MdDelete className="mr-1 text-red-600 text-lg" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Version movil */}
      <div className="block sm:hidden">
        {data.map((row, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-xl p-5 mb-4 border border-gray-200"
          >
            {columns.map((col) => (
              <div
                key={col.accessor}
                className="flex justify-between border-b py-2 text-gray-700"
              >
                <span className="font-semibold">{col.Header}:</span>
                <span className="text-gray-600">{row[col.accessor]}</span>
              </div>
            ))}
            <div className="flex justify-end space-x-3 mt-3">
              <button
                onClick={() => onEdit(row)}
                className="p-2 rounded-lg flex items-center  hover:scale-105 "
              >
                <FaEdit className="mr-1 text-yellow-600 text-lg" />
              </button>
              <button
                onClick={() => onDelete(row)}
                className="p-2 rounded-lg flex items-center hover:scale-105 "
              >
                <MdDelete className="mr-1 text-red-600 text-lg" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Table;
