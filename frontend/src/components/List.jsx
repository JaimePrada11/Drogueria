import React from 'react';

export default function List({ children }) {
    return (
        <ul className="flex flex-wrap items-center justify-center gap-6">
            {React.Children.map(children, (child, index) => (
                <li key={index} className="flex flex-col items-center justify-center w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
                    {child}
                </li>
            ))}
        </ul>
    );
}
