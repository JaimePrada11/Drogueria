// Form.jsx
import React from 'react';

const Form = ({ fields, initialData, onChange }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {fields.map(field => (
        <div key={field.name} className="flex flex-col">
          <label 
            htmlFor={field.name} 
            className="mb-1 font-semibold text-gray-700"
          >
            {field.label}
          </label>
          {field.type === 'select' ? (
            <select
              id={field.name}
              name={field.name}
              value={initialData[field.name] || ""}
              onChange={onChange}
              onBlur={field.onBlur}  // Si se define onBlur, se pasa
              className="p-2 border border-gray-300 rounded"
              required={field.required}
            >
              {field.options && field.options.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={field.type}
              id={field.name}
              name={field.name}
              value={initialData[field.name] || ""}
              onChange={onChange}
              onBlur={field.onBlur}  // Se asigna onBlur si existe
              className="p-2 border border-gray-300 rounded"
              required={field.required}
              list={field.list} // Permite usar datalist si se especifica
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Form;
