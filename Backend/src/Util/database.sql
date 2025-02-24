-- Insertar Categorías
INSERT IGNORE INTO Categoria (nombre) VALUES 
('Vitamínicos'), 
('Medicamentos'), 
('Suplementos'), 
('Cuidado Personal'); 

-- Insertar Productos
INSERT IGNORE INTO Productos (imagen, nombre, descripcion, precio, stock, fechaEntrada, lote, fechaVencimiento, categoriaId, sku) VALUES 
('https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/ncs/ncs00885/y/8.jpg', 'Vitamina B', 'Prueba', 12.21, 12, NOW(), 'ksm', '1222-12-12', 1, 'SKU-VCRRVVGWG'), 
('https://www.drogueriascafam.com.co/61179/ofvita-c.jpg', 'Vitamina C', 'Refuerza el sistema inmunológico', 15.99, 20, NOW(), 'L123', '2024-10-10', 1, 'SKU-ABC123'), 
('https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/now/now01652/y/68.jpg', 'Omega 3', 'Ácidos grasos esenciales', 25.50, 18, NOW(), 'L789', '2025-05-15', 3, 'SKU-OMEGA3'),  
('https://phabcart.imgix.net/cdn/scdn/images/uploads/m0459_web.jpg?auto=compress&lossless=1&w=385', 'Paracetamol', 'Alivia el dolor y la fiebre', 8.99, 50, NOW(), 'P001', '2026-06-20', 2, 'SKU-PARACETAMOL'), 
('https://tantovital.com/images/productos/7702605101511.webp', 'Ibuprofeno', 'Antiinflamatorio y analgésico', 10.99, 40, NOW(), 'I002', '2025-12-30', 2, 'SKU-IBUPROFENO'), 
('https://www.beautyboost.com.co/cdn/shop/files/COLAGENOCOLAMBIENTADO.jpg?v=1693583760', 'Colágeno Hidrolizado', 'Mejora la salud de la piel y articulaciones', 30.50, 25, NOW(), 'C003', '2025-08-10', 3, 'SKU-COLAGENO'), 
('https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/nrt/nrt53086/l/47.jpg', 'Magnesio', 'Mineral esencial para el cuerpo', 18.75, 30, NOW(), 'M004', '2026-01-25', 3, 'SKU-MAGNESIO'), 
('https://http2.mlstatic.com/D_NQ_NP_989388-MLU78045110447_072024-O.webp', 'Crema Hidratante', 'Hidrata y nutre la piel', 22.99, 15, NOW(), 'CH005', '2025-09-15', 4, 'SKU-CREMA'), 
('https://cosmetis.com/media/catalog/product/cache/8357f3cfca25f65dc286e017d4e3bdcd/d/e/dercosshampooanticaspaseca.jpg', 'Shampoo Anticaspa', 'Elimina la caspa y fortalece el cabello', 14.50, 28, NOW(), 'S006', '2026-03-10', 4, 'SKU-SHAMPOO'), 
('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREtkIA0IJWDc4zXVDNlZ_PBAgDswBEbJKf_Q&s', 'Proteína Whey', 'Suplemento para el crecimiento muscular', 45.00, 10, NOW(), 'PW007', '2024-11-20', 3, 'SKU-PROTEINA'); 
