-- Insertar datos en la tabla `pais`
INSERT INTO pais (nombre, activo) VALUES 
('España', TRUE),
('Francia', TRUE),
('Alemania', TRUE),
('Italia', TRUE),
('Portugal', TRUE),
('Reino Unido', TRUE),
('Irlanda', TRUE),
('Noruega', TRUE),
('Suecia', TRUE),
('Finlandia', TRUE),
('Dinamarca', TRUE),
('Suiza', TRUE),
('Austria', TRUE),
('Bélgica', TRUE),
('Holanda', TRUE),
('Polonia', TRUE),
('República Checa', TRUE),
('Hungría', TRUE),
('Grecia', TRUE),
('Rumanía', TRUE);

-- Insertar datos en la tabla `provincia`
INSERT INTO provincia (nombre, cp, pais_id) VALUES 
('Barcelona', '08000', 1),
('Madrid', '28000', 1),
('Valencia', '46000', 1),
('Sevilla', '41000', 1),
('Zaragoza', '50000', 1),
('Málaga', '29000', 1),
('Murcia', '30000', 1),
('Palma de Mallorca', '07000', 1),
('Las Palmas', '35000', 1),
('Bilbao', '48000', 1),
('Alicante', '03000', 1),
('Córdoba', '14000', 1),
('Valladolid', '47000', 1),
('Vigo', '36200', 1),
('Gijón', '33200', 1),
('Granada', '18000', 1),
('La Coruña', '15000', 1),
('San Sebastián', '20000', 1),
('Santander', '39000', 1),
('Badajoz', '06000', 1);


-- Insertar datos en la tabla `ciudad`
INSERT INTO ciudad (nombre, provincia_id) VALUES 
('Barcelona', 1),
('Madrid', 2),
('Valencia', 3),
('Sevilla', 4),
('Zaragoza', 5),
('Málaga', 6),
('Murcia', 7),
('Palma de Mallorca', 8),
('Las Palmas', 9),
('Bilbao', 10),
('Alicante', 11),
('Córdoba', 12),
('Valladolid', 13),
('Vigo', 14),
('Gijón', 15),
('Granada', 16),
('La Coruña', 17),
('San Sebastián', 18),
('Santander', 19),
('Badajoz', 20);

-- Insertar datos en la tabla `tipo_empresa`
INSERT INTO tipo_empresa (nombre, descripcion) VALUES 
('Empresario individual', 'Empresa de un solo dueño'),
('Sociedad Limitada (S.L.)', 'Empresa con responsabilidad limitada'),
('Sociedad Anónima (S.A.)', 'Empresa con acciones en el mercado'),
('Asociaciones sin ánimo de lucro', 'Entidad que no persigue beneficios'),
('Sociedad Colectiva', 'Empresa con socios colectivos'),
('Sociedad Comanditaria', 'Empresa con socios colectivos y comanditarios'),
('Comunidad de Bienes', 'Entidad compartida por varios propietarios'),
('Sociedad Cooperativa', 'Empresa gestionada por sus miembros'),
('Shuemo','Empresa admin única');

-- Insertar datos en la tabla `tipo_moneda`
INSERT INTO tipo_moneda (nombre) VALUES 
('Euro'),
('Dólar estadounidense'),
('Libra esterlina'),
('Yen japonés'),
('Dólar canadiense'),
('Franco suizo'),
('Dólar australiano'),
('Corona sueca'),
('Peso mexicano'),
('Renminbi chino');

-- Insertar datos en la tabla `metodo_pago`
INSERT INTO metodo_pago (nombre) VALUES 
('Tarjeta de crédito'),
('Transferencia bancaria'),
('PayPal'),
('Bitcoin'),
('Cheque'),
('Tarjeta de débito'),
('Efectivo'),
('Vale'),
('Pago contra entrega'),
('Otro');

-- Insertar datos en la tabla `tipo_departamento`
INSERT INTO tipo_departamento (nombre, descripcion) VALUES 
('RRHH', 'Departamento de recursos humanos'),
('Finanzas y Contabilidad', 'Departamento de finanzas y contabilidad'),
('Marketing y Ventas', 'Departamento de marketing y ventas'),
('Operaciones', 'Departamento de operaciones'),
('Tecnología de la Información (TI)', 'Departamento de tecnología de la información'),
('Investigación y Desarrollo (I+D)', 'Departamento de investigación y desarrollo'),
('Servicio al Cliente', 'Departamento de servicio al cliente'),
('Legal', 'Departamento legal'),
('Compras', 'Departamento de compras'),
('Calidad', 'Departamento de calidad'),
('Planificación Estratégica', 'Departamento de planificación estratégica'),
('Relaciones Públicas y Comunicación', 'Departamento de relaciones públicas y comunicación'),
('Polivalente', 'Departamento polivalente');

-- Insertar datos en la tabla `departamento`
INSERT INTO departamento (nombre, descripcion, empresa_id, tipo_dept_id) VALUES 
('RRHH Corporativo', 'Gestiona recursos humanos', 1, 1),

-- Insertar datos en la tabla `rol`
INSERT INTO rol (nombre) VALUES 
('admin'),
('admin_empresa'),
('empleado');