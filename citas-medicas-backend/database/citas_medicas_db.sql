-- Crear la base de datos (si no existe)
CREATE DATABASE citas_medicas;

-- Conectarse a la base de datos (o seleccionarla en pgAdmin)
\c citas_medicas;

-- 1. Tabla de Especialidades
CREATE TABLE especialidades (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);

-- 2. Tabla de Doctores
CREATE TABLE doctores (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    sexo VARCHAR(20),
    fecha_nacimiento DATE,
    direccion VARCHAR(255),
    telefono VARCHAR(20),
    foto VARCHAR(255),
    id_especialidade INT,
    CONSTRAINT fk_especialidad FOREIGN KEY (id_especialidade) REFERENCES especialidades(id)
);

-- 3. Tabla de Pacientes
CREATE TABLE pacientes (
    id SERIAL PRIMARY KEY,
    nombres VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    fecha_nacimiento DATE,
    sexo VARCHAR(20),
    direccion VARCHAR(255),
    telefono VARCHAR(20),
    email VARCHAR(100),
    telegram_id VARCHAR(50),
    foto VARCHAR(255),
    medicamento VARCHAR(255),
    alergias VARCHAR(255),
    estado VARCHAR(50)
);

-- 4. Tabla de Horarios
CREATE TABLE horarios (
    id SERIAL PRIMARY KEY,
    doctor_id INT,
    fecha DATE,
    hora_inicio TIME,
    hora_fin TIME,
    disponible BOOLEAN,
    CONSTRAINT fk_doctor_horario FOREIGN KEY (doctor_id) REFERENCES doctores(id)
);

-- 5. Tabla de Citas
CREATE TABLE citas (
    id SERIAL PRIMARY KEY,
    asunto VARCHAR(150),
    motivo TEXT,
    fecha DATE,
    hora TIME,
    sintomas TEXT,
    enfermedades TEXT,
    medicamentos TEXT,
    notas_adicionales TEXT,
    estado VARCHAR(50),
    id_paciente INT,
    id_doctor INT,
    id_horario INT,
    CONSTRAINT fk_paciente FOREIGN KEY (id_paciente) REFERENCES pacientes(id),
    CONSTRAINT fk_doctor FOREIGN KEY (id_doctor) REFERENCES doctores(id),
    CONSTRAINT fk_horario FOREIGN KEY (id_horario) REFERENCES horarios(id)
);