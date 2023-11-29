DROP DATABASE IF EXISTS BDMaraton;
DROP TABLE integrantesXequipo;

/*Tabla de Integrantes*/
CREATE TABLE integrante (
	documento INT PRIMARY KEY,
	contrasena VARCHAR(100),
	
	codigo INT,
	nombre VARCHAR(100),
	materia VARCHAR(30),
	comprobacionLider BOOLEAN
);

/*Tabla de Administradores*/
CREATE TABLE administradores (
	documento INT PRIMARY KEY,
	contrasena VARCHAR(100),
	
	nombre VARCHAR(100)
);

/*Tabla de Competencia*/
CREATE TABLE competencia (
	codigoCompetencia INT PRIMARY KEY,
	fechaInicio DATE,
	fechaFin DATE,
	periodoVigente VARCHAR(60),
	categoria VARCHAR(60)
);

/*Tabla de equipos*/
CREATE TABLE equipos (
	codigoEquipo SERIAL PRIMARY KEY,
	nombreEquipo VARCHAR(60)
);

/*Tabla de integrantesXequipo*/
CREATE TABLE integrantesXequipo (
	codigoEquipo INT,
	documentoIntegrante INT,
	
	/*Foreing Keys*/
	FOREIGN KEY (codigoEquipo) REFERENCES equipos(codigoEquipo),
	FOREIGN KEY (documentoIntegrante) REFERENCES integrante(documento)
);


/*Tabla de equiposXcompetencia*/
CREATE TABLE equiposXcompetencia (
	codigoCompetencia INT,
	codigoEquipo INT,
	
	/*Foreing Keys*/
	FOREIGN KEY (codigoCompetencia) REFERENCES competencia(codigoCompetencia),
	FOREIGN KEY (codigoEquipo) REFERENCES equipos(codigoEquipo)
);


 
CREATE TABLE semestre(
	codigo INT PRIMARY KEY,
	nombre VARCHAR(100)
);

CREATE TABLE semestreXcompetencia (
	codigoCompetencia INT,
	codigoSemestre INT,
	
	FOREIGN KEY (codigoCompetencia) REFERENCES competencia(codigoCompetencia),
	FOREIGN KEY (codigoSemestre ) REFERENCES semestre(codigo)
);





















