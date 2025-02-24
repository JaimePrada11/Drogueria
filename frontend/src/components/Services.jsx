import React from 'react'
import { FaHome, FaUserMd, FaCheckCircle, FaClock } from 'react-icons/fa';

const Services = () => {
    return (
        <div>
            <div className="container mx-auto p-4 rounded-lg mt-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Nuestros Servicios</h2>
                <p className="text-gray-700 mb-6 text-center">
                    En <strong>MiDroguería</strong> ofrecemos una variedad de servicios para garantizar tu bienestar y comodidad.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex flex-col items-center text-center  p-6 rounded-lg ">
                        <FaHome className="mb-3 text-5xl text-blue-600" />
                        <strong className="mb-2 text-lg">Entrega a domicilio</strong>
                        <p className="text-sm text-gray-600">
                            Recibe tus medicamentos y productos de salud en la puerta de tu casa.
                        </p>
                    </div>

                    <div className="flex flex-col items-center text-center  p-6 rounded-lg ">
                        <FaCheckCircle className="mb-3 text-5xl text-blue-600" />
                        <strong className="mb-2 text-lg">Productos de alta calidad</strong>
                        <p className="text-sm text-gray-600">
                            Garantizamos la mejor calidad en cada uno de nuestros productos.
                        </p>
                    </div>

                    <div className="flex flex-col items-center text-center p-6 rounded-lg">
                        <FaClock className="mb-3 text-5xl text-blue-600" />
                        <strong className="mb-2 text-lg">Atención 24/7</strong>
                        <p className="text-sm text-gray-600">
                            Siempre disponibles para atender tus necesidades de salud en cualquier momento.
                        </p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Services
