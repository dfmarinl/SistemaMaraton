// server/server.js
const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3001;

// Configuración de la conexión a PostgreSQL
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Maraton',
  password: '1235',
  port: 5432,
});

//swagger
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc=require("swagger-jsdoc");
const swaggerSpec={
  definition:{
    openapi:"3.0.0",
    info:{
      title: "swager",
      version:"1.0.0",
    },
    servers:[
      {
        url:"http://localhost:3001"
      }
    ]
    
  },
  apis: ['server.js'],
}

//middleware swagger
app.use("/api-doc",swaggerUI.serve,swaggerUI.setup(swaggerJsDoc(swaggerSpec)));

// Middleware para permitir peticiones desde el frontend
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

// Middleware para analizar el cuerpo de las solicitudes JSON
app.use(express.json());

app.get('/items', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM usuario');
    res.json(result.rows);
  } catch (error) {
    console.error('Error en la consulta:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});




app.post('/registro', async (req, res) => {
  const { nombre, codigo } = req.body;

  try {
    const result = await pool.query('INSERT INTO usuario (nombre, codigo) VALUES ($1, $2) RETURNING *', [nombre, codigo]);

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al agregar usuario:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

app.post('/login', async (req, res) => {
  const { nombre, codigo } = req.body;

  try {
    const result = await pool.query('SELECT * FROM usuario WHERE nombre = $1 AND codigo = $2', [nombre, codigo]);

    if (result.rows.length > 0) {

      res.json({ success: true, message: 'Inicio de sesión exitoso ' });
    } else {
      res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
    }
  } catch (error) {
    console.error('Error en el login:', error);
    res.status(500).json({ success: false, message: 'Error en el servidor' });
  }
});
/**
 * @swagger
 * tags:
 *   name: Integrante
 *   description: Operaciones relacionadas con integrantes
 */

/**
 * @swagger
 * /loginIntegrante:
 *   post:
 *     summary: Inicia sesión como integrante.
 *     description: Endpoint para iniciar sesión como integrante.
 *     tags: [Integrante]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               documento:
 *                 type: string
 *                 description: Documento del integrante.
 *               contraseña:
 *                 type: string
 *                 description: Contraseña del integrante.
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Inicio de sesión exitoso
 *       401:
 *         description: Credenciales incorrectas.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Credenciales incorrectas
 *       500:
 *         description: Error en el servidor.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Error en el servidor
 */

app.post('/loginIntegrante', async (req, res) => {
  const {documento,contraseña } = req.body;

  try {
    const result = await pool.query('SELECT * FROM integrante WHERE documento = $1 AND contrasena = $2', [documento, contraseña]);

    if (result.rows.length > 0) {

      res.json({ success: true, message: 'Inicio de sesión exitoso ' });
    } else {
      res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
    }
  } catch (error) {
    console.error('Error en el login:', error);
    res.status(500).json({ success: false, message: 'Error en el servidor' });
  }
});

/**
 * @swagger
 * /registroCompetidor:
 *   post:
 *     summary: Registra un nuevo competidor (integrante).
 *     description: Endpoint para registrar un nuevo competidor (integrante).
 *     tags: [Integrante]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               documento:
 *                 type: string
 *                 description: Documento del competidor.
 *               contraseña:
 *                 type: string
 *                 description: Contraseña del competidor.
 *               codigo:
 *                 type: string
 *                 description: Código del competidor.
 *               nombre:
 *                 type: string
 *                 description: Nombre del competidor.
 *               materia:
 *                 type: string
 *                 description: Materia del competidor.
 *               comprobacionlider:
 *                 type: boolean
 *                 description: Indica si el competidor es líder o no.
 *     responses:
 *       200:
 *         description: Competidor registrado con éxito.
 *         content:
 *           application/json:
 *             example:
 *               documento: "123456789"
 *               contraseña: "contraseña123"
 *               codigo: "COMP001"
 *               nombre: "Competidor Ejemplo"
 *               materia: "Materia Ejemplo"
 *               comprobacionlider: false
 *       500:
 *         description: Error en el servidor.
 *         content:
 *           application/json:
 *             example:
 *               error: "Error en el servidor"
 */

app.post('/registroCompetidor', async (req, res) => {
  const { documento, contraseña,codigo,nombre,materia,comprobacionlider } = req.body;

  try {
    const result = await pool.query('INSERT INTO integrante (documento, contrasena, codigo, nombre, materia, comprobacionlider) VALUES ($1, $2,$3,$4,$5,$6) RETURNING *', [documento, contraseña,codigo,nombre,materia,comprobacionlider]);

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al agregar usuario:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

/**
 * @swagger
 * tags:
 *   name: Administrador
 *   description: Operaciones relacionadas con administradores
 */

/**
 * @swagger
 * /registroAdministrador:
 *   post:
 *     summary: Registro de un nuevo administrador.
 *     description: Endpoint para registrar un nuevo administrador.
 *     tags: [Administrador]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               documento:
 *                 type: string
 *               contraseña:
 *                 type: string
 *               nombre:
 *                 type: string
 *             required:
 *               - documento
 *               - contraseña
 *               - nombre
 *     responses:
 *       200:
 *         description: Administrador registrado con éxito.
 *         content:
 *           application/json:
 *             example:
 *               - documento: "123456789"
 *                 contraseña: "contraseña123"
 *                 nombre: "Administrador1"
 *       500:
 *         description: Error en el servidor.
 *         content:
 *           application/json:
 *             example:
 *               error: "Error en el servidor"
 */

app.post('/registroAdministrador', async (req, res) => {
  const { documento, contraseña,nombre } = req.body;

  try {
    const result = await pool.query('INSERT INTO administradores (documento, contrasena, nombre) VALUES ($1, $2,$3) RETURNING *', [documento, contraseña,nombre]);

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al agregar usuario:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

/**
 * @swagger
 * /loginAd:
 *   post:
 *     summary: Inicio de sesión para administradores.
 *     description: Endpoint para que un administrador inicie sesión.
 *     tags: [Administrador]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               documento:
 *                 type: string
 *               contraseña:
 *                 type: string
 *             required:
 *               - documento
 *               - contraseña
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "Inicio de sesión exitoso"
 *       401:
 *         description: Credenciales incorrectas.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Credenciales incorrectas"
 *       500:
 *         description: Error en el servidor.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Error en el servidor"
 */


app.post('/loginAd', async (req, res) => {
  const { documento, contraseña } = req.body;

  try {
    const result = await pool.query('SELECT * FROM administradores WHERE documento = $1 AND contrasena = $2', [documento, contraseña]);

    if (result.rows.length > 0) {

      res.json({ success: true, message: 'Inicio de sesión exitoso ' });
    } else {
      res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
    }
  } catch (error) {
    console.error('Error en el login:', error);
    res.status(500).json({ success: false, message: 'Error en el servidor' });
  }
});

/**
 * @swagger
 * /Admin:
 *   get:
 *     summary: Obtener la lista de administradores.
 *     description: Endpoint para obtener la lista de administradores.
 *     tags: [Administrador]
 *     responses:
 *       200:
 *         description: Lista de administradores obtenida con éxito.
 *         content:
 *           application/json:
 *             example:
 *               - documento: "123456789"
 *                 contrasena: "clave123"
 *                 nombre: "Admin1"
 *               - documento: "987654321"
 *                 contrasena: "clave456"
 *                 nombre: "Admin2"
 *       500:
 *         description: Error en el servidor.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Error en el servidor"
 */

app.get('/Admin', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM administradores');
    res.json(result.rows);
  } catch (error) {
    console.error('Error en la consulta:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

/**
 * @swagger
 * tags:
 *   name: Competencias
 *   description: Operaciones relacionadas con competencias
 */

/**
 * @swagger
 * /Competencias:
 *   get:
 *     summary: Obtener todas las competencias.
 *     description: Endpoint para obtener información sobre todas las competencias.
 *     tags: [Competencias]
 *     responses:
 *       200:
 *         description: Lista de competencias obtenida con éxito.
 *         content:
 *           application/json:
 *             example:
 *               - codigoCompetencia: "1"
 *                 nombreCompetencia: "Competencia A"
 *                 descripcion: "Descripción de la Competencia A"
 *               - codigoCompetencia: "2"
 *                 nombreCompetencia: "Competencia B"
 *                 descripcion: "Descripción de la Competencia B"
 *       500:
 *         description: Error en el servidor.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Error en el servidor"
 */

app.get('/Competencias', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM competencia');
    res.json(result.rows);
  } catch (error) {
    console.error('Error en la consulta:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});
/**
 * @swagger
 * /BorrarCompetenciaes/{id}:
 *   delete:
 *     summary: Eliminar una competencia por ID.
 *     description: Endpoint para eliminar una competencia mediante su ID.
 *     tags: [Competencias]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la competencia a eliminar.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Competencia eliminada con éxito.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "Competencia eliminada exitosamente"
 *       404:
 *         description: Competencia no encontrada.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Competencia no encontrada"
 *       500:
 *         description: Error en el servidor.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Error en el servidor"
 */


app.delete('/BorrarCompetenciaes/:id', async (req, res) => {
  const codigocompetencia = req.params.id;
  try {
    const result = await pool.query('DELETE FROM competencia WHERE codigocompetencia = $1 RETURNING *', [codigocompetencia]);
    if (result.rows.length > 0) {
      res.json({ success: true, message: 'Usuario eliminado con éxito' });
    } else {
      res.status(404).json({ success: false, message: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    res.status(500).json({ success: false, message: 'Error en el servidor' });
  }
});

/**
 * @swagger
 * /Equipos/{Competencia}:
 *   get:
 *     summary: Obtener la lista de equipos por competencia
 *     tags:
 *       - Competencias
 *     parameters:
 *       - in: path
 *         name: Competencia
 *         required: true
 *         description: Código de la competencia
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Lista de equipos obtenida con éxito
 *         content:
 *           application/json:
 *             example:
 *               - codigoEquipo: "equipo1"
 *                 nombreEquipo: "Equipo 1"
 *               - codigoEquipo: "equipo2"
 *                 nombreEquipo: "Equipo 2"
 */



app.get('/Equipos/:Competencia', async (req, res) => {
  const codigocompetencia = req.params.Competencia;
  try {
    const result = await pool.query(
      'SELECT equipos.* FROM equipos INNER JOIN equiposXcompetencia ON equipos.codigoEquipo = equiposXcompetencia.codigoEquipo WHERE equiposXcompetencia.codigoCompetencia = $1',
      [codigocompetencia]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error en la consulta:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});
/**
 * @swagger
 * /MostarCompetencia/{idCompetencia}:
 *   get:
 *     summary: Obtener información detallada de una competencia por ID
 *     tags:
 *       - Competencias
 *     parameters:
 *       - in: path
 *         name: idCompetencia
 *         required: true
 *         description: ID de la competencia a mostrar
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Información detallada de la competencia obtenida con éxito
 *         content:
 *           application/json:
 *             example:
 *               - codigocompetencia: "comp1"
 *                 nombreCompetencia: "Competencia 1"
 *                 fechaInicio: "2023-01-01"
 *                 fechaFin: "2023-01-15"
 *                 periodoVigente: 15
 *                 categoria: "Elite"
 *               - codigocompetencia: "comp2"
 *                 nombreCompetencia: "Competencia 2"
 *                 fechaInicio: "2023-02-01"
 *                 fechaFin: "2023-02-15"
 *                 periodoVigente: 14
 *                 categoria: "Avanzada"
 *       '404':
 *         description: Competencia no encontrada
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Competencia no encontrada"
 */


app.get('/MostarCompetencia/:idCompetencia', async (req, res) => {
  const codigocompetencia = req.params.idCompetencia;
  try {
    const result = await pool.query(
      'SELECT * FROM competencia WHERE codigocompetencia = $1',
      [codigocompetencia]
    );
    res.json(result.rows);
    console.log('Resultados:', result.rows);

  } catch (error) {
    console.error('Error en la consulta:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

/**
 * @swagger
 * /BorrarEquipo/{codigoEquipo}:
 *   delete:
 *     summary: Eliminar un equipo por código
 *     tags:
 *       - Equipos
 *     parameters:
 *       - in: path
 *         name: codigoEquipo
 *         required: true
 *         schema:
 *           type: string
 *         description: Código único del equipo que se va a eliminar
 *     responses:
 *       '200':
 *         description: Equipo eliminado con éxito
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Equipo eliminado exitosamente
 *       '404':
 *         description: Equipo no encontrado
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Equipo no encontrado
 *       '500':
 *         description: Error en el servidor al eliminar equipo
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Error en el servidor
 */

app.delete('/BorrarEquipo/:codigoEquipo', async (req, res) => {
  const codigoEquipo = req.params.codigoEquipo;

  try {
    
    const competenciasAsociadas = await pool.query('SELECT * FROM equiposXcompetencia WHERE codigoEquipo = $1', [codigoEquipo]);

    if (competenciasAsociadas.rows.length > 0) {
      
      await pool.query('DELETE FROM equiposXcompetencia WHERE codigoEquipo = $1', [codigoEquipo]);
    }

    const result = await pool.query('DELETE FROM equipos WHERE codigoEquipo = $1 RETURNING *', [codigoEquipo]);
    
    if (result.rows.length > 0) {
      res.json({ success: true, message: 'Equipo eliminado exitosamente' });
    } else {
      res.status(404).json({ success: false, message: 'Equipo no encontrado' });
    }
  } catch (error) {
    console.error('Error al eliminar equipo:', error);
    res.status(500).json({ success: false, message: 'Error en el servidor' });
  }
});


/**
 * @swagger
 * /registroCompetencia:
 *   post:
 *     summary: Registrar una nueva competencia
 *     tags:
 *       - Competencias
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               codigocompetencia:
 *                 type: string
 *                 description: Código único de la competencia
 *               fechainicio:
 *                 type: string
 *                 format: date
 *                 description: Fecha de inicio de la competencia (YYYY-MM-DD)
 *               fechafin:
 *                 type: string
 *                 format: date
 *                 description: Fecha de fin de la competencia (YYYY-MM-DD)
 *               periodovigente:
 *                 type: integer
 *                 description: Periodo de vigencia de la competencia en días
 *               categoria:
 *                 type: string
 *                 description: Categoría de la competencia (Basica, Intermedia, Avanzada, Elite)
 *               codigosemestre:
 *                 type: string
 *                 description: Código del semestre asociado a la competencia
 *     responses:
 *       '200':
 *         description: Competencia registrada con éxito
 *         content:
 *           application/json:
 *             example:
 *               codigocompetencia: "comp1"
 *               fechainicio: "2023-01-01"
 *               fechafin: "2023-01-15"
 *               periodovigente: 15
 *               categoria: "Elite"
 *       '500':
 *         description: Error en el servidor al agregar la competencia
 *         content:
 *           application/json:
 *             example:
 *               error: "Error en el servidor"
 */


app.post('/registroCompetencia', async (req, res) => {
  const { codigocompetencia, fechainicio, fechafin, periodovigente, categoria,codigosemestre } = req.body;

  try {
    const result = await pool.query('INSERT INTO competencia (codigocompetencia, fechainicio, fechafin, periodovigente, categoria) VALUES ($1, $2,$3,$4,$5) RETURNING *', [codigocompetencia, fechainicio, fechafin, periodovigente, categoria]);

    res.json(result.rows[0]);
    if(result.rows[0]){
      const result= await pool.query('INSERT INTO semestrexcompetencia(codigocompetencia, codigosemestre)VALUES ($1, $2)',[codigocompetencia,codigosemestre]);
      res.json(result.rows[0]);

    }
    

  } catch (error) {
    console.error('Error al agregar Competencia:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});
/**
 * @swagger
 * /BorrarCompetencia/{codigoCompetencia}:
 *   delete:
 *     summary: Eliminar una competencia por código
 *     tags:
 *       - Competencias
 *     parameters:
 *       - in: path
 *         name: codigoCompetencia
 *         required: true
 *         schema:
 *           type: string
 *         description: Código único de la competencia a eliminar
 *     responses:
 *       '200':
 *         description: Competencia eliminada con éxito
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Competencia eliminada exitosamente
 *       '404':
 *         description: Competencia no encontrada
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Competencia no encontrada
 *       '500':
 *         description: Error en el servidor al eliminar la competencia
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Error en el servidor
 */



app.delete('/BorrarCompetencia/:codigoCompetencia', async (req, res) => {
  const codigocompetencia = req.params.codigoCompetencia;

  try {
    const asociadosEnSemestre = await pool.query('SELECT * FROM semestrexcompetencia WHERE codigocompetencia = $1', [codigocompetencia]);

    if (asociadosEnSemestre.rows.length > 0) {
      await pool.query('DELETE FROM semestrexcompetencia WHERE codigocompetencia = $1', [codigocompetencia]);
    } 
      const competenciasAsociadas = await pool.query('SELECT * FROM equiposXcompetencia WHERE codigocompetencia = $1', [codigocompetencia]);

      if (competenciasAsociadas.rows.length > 0) {
        await pool.query('DELETE FROM equiposXcompetencia WHERE codigocompetencia = $1', [codigocompetencia]);
      }

      const result = await pool.query('DELETE FROM competencia WHERE codigocompetencia = $1 RETURNING *', [codigocompetencia]);

      if (result.rows.length > 0) {
        res.json({ success: true, message: 'Competencia eliminada exitosamente' });
      } else {
        res.status(404).json({ success: false, message: 'Competencia no encontrada' });
      }
    
  } catch (error) {
    console.error('Error al eliminar competencia:', error);
    res.status(500).json({ success: false, message: 'Error en el servidor' });
  }
});

/**
 * @swagger
 * /ModificarCompetencia/{codigoCompetencia}:
 *   put:
 *     summary: Modificar una competencia por código
 *     tags:
 *       - Competencias
 *     parameters:
 *       - in: path
 *         name: codigoCompetencia
 *         required: true
 *         schema:
 *           type: string
 *         description: Código único de la competencia a modificar
 *       - in: body
 *         name: body
 *         required: true
 *         description: Datos actualizados de la competencia
 *         schema:
 *           type: object
 *           properties:
 *             fechainicio:
 *               type: string
 *               description: Nueva fecha de inicio de la competencia (formato YYYY-MM-DD)
 *             fechafin:
 *               type: string
 *               description: Nueva fecha de fin de la competencia (formato YYYY-MM-DD)
 *             periodovigente:
 *               type: integer
 *               description: Nuevo periodo vigente de la competencia
 *             categoria:
 *               type: string
 *               description: Nueva categoría de la competencia
 *     responses:
 *       '200':
 *         description: Competencia actualizada con éxito
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Competencia actualizada con éxito
 *               competencia:
 *                 codigocompetencia: 1
 *                 fechainicio: '2023-01-01'
 *                 fechafin: '2023-01-31'
 *                 periodovigente: 30
 *                 categoria: 'Avanzada'
 *       '404':
 *         description: Competencia no encontrada
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Competencia no encontrada
 *       '500':
 *         description: Error en el servidor al actualizar la competencia
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Error en el servidor
 */


app.put('/ModificarCompetencia/:codigoCompetencia', async (req, res) => {
  const codigocompetencia = req.params.codigoCompetencia;
  const { fechainicio, fechafin, periodovigente, categoria } = req.body;

  try {
    const result = await pool.query(
      'UPDATE competencia SET fechainicio = $1, fechafin = $2, periodovigente = $3, categoria = $4 WHERE codigocompetencia = $5 RETURNING *',
      [fechainicio, fechafin, periodovigente, categoria, codigocompetencia]
    );

    if (result.rows.length > 0) {
      res.json({ success: true, message: 'Competencia actualizada con éxito', competencia: result.rows[0] });
    } else {
      res.status(404).json({ success: false, message: 'Competencia no encontrada' });
    }
  } catch (error) {

    console.error('Error al actualizar competencia:', error);
    res.status(500).json({ success: false, message: 'Error en el servidor' });
  }
});

//Apis equipos 
/**
 * @swagger
 * /EquiposPorIntegrante/{documentoIntegrante}:
 *   get:
 *     summary: Obtener equipos por documento de integrante
 *     tags:
 *       - Equipos
 *     parameters:
 *       - in: path
 *         name: documentoIntegrante
 *         required: true
 *         schema:
 *           type: string
 *         description: Documento único del integrante para obtener los equipos asociados
 *     responses:
 *       '200':
 *         description: Equipos obtenidos con éxito
 *         content:
 *           application/json:
 *             example:
 *               - codigoEquipo: "123"
 *                 nombreEquipo: "Equipo A"
 *                 descripcion: "Descripción del Equipo A"
 *               - codigoEquipo: "456"
 *                 nombreEquipo: "Equipo B"
 *                 descripcion: "Descripción del Equipo B"
 *       '500':
 *         description: Error en el servidor al obtener equipos por integrante
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Error en el servidor
 */
app.get('/EquiposPorIntegrante/:documentoIntegrante', async (req, res) => {
  const documentoIntegrante = req.params.documentoIntegrante;

  try {
    const result = await pool.query(
      'SELECT equipos.* FROM equipos INNER JOIN integrantesxequipo ON equipos.codigoequipo = integrantesxequipo.codigoequipo WHERE integrantesxequipo.documentointegrante = $1',
      [documentoIntegrante]
    );
    res.json(result.rows);
    console.log('Resultados:', result.rows);
   

  } catch (error) {
    console.error('Error en la consulta:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

/**
 * @swagger
 * /integrantesxEquipo/{codigoEquipo}:
 *   get:
 *     summary: Obtener integrantes por código de equipo
 *     tags:
 *       - Equipos
 *     parameters:
 *       - in: path
 *         name: codigoEquipo
 *         required: true
 *         schema:
 *           type: string
 *         description: Código único del equipo para obtener los integrantes asociados
 *     responses:
 *       '200':
 *         description: Integrantes obtenidos con éxito
 *         content:
 *           application/json:
 *             example:
 *               - nombre: "Juan Pérez"
 *                 materia: "Programación Avanzada"
 *                 codigo: "001"
 *                 documento: "123456789"
 *               - nombre: "Ana Gómez"
 *                 materia: "Bases de Datos"
 *                 codigo: "002"
 *                 documento: "987654321"
 *       '500':
 *         description: Error en el servidor al obtener integrantes por equipo
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Error en el servidor
 */


app.get('/integrantesxEquipo/:codigoEquipo', async (req, res) => {
  const codigoEquipo = req.params.codigoEquipo;

  try {
    const result = await pool.query(
      'SELECT integrante.nombre, integrante.materia,integrante.codigo,integrante.documento FROM integrante INNER JOIN integrantesxequipo ON integrante.documento = integrantesxequipo.documentointegrante WHERE integrantesxequipo.codigoequipo = $1',
      [codigoEquipo]
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Error en la consulta:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});
/**
 * @swagger
 * /BorrarEquipoLider/{codigoEquipo}/{codigoIntegrante}:
 *   delete:
 *     summary: Eliminar equipo liderado por un integrante
 *     tags:
 *       - Equipos
 *     parameters:
 *       - in: path
 *         name: codigoEquipo
 *         required: true
 *         schema:
 *           type: string
 *         description: Código único del equipo a eliminar
 *       - in: path
 *         name: codigoIntegrante
 *         required: true
 *         schema:
 *           type: string
 *         description: Código único del integrante líder asociado al equipo
 *     responses:
 *       '200':
 *         description: Equipo eliminado con éxito
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Equipo eliminado exitosamente
 *       '404':
 *         description: Equipo no encontrado
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Equipo no encontrado
 *       '500':
 *         description: Error en el servidor al eliminar equipo
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Error en el servidor
 */

app.delete('/BorrarEquipoLider/:codigoEquipo/:codigoIntegrante', async (req, res) => {
  const codigoEquipo = req.params.codigoEquipo;
  const codigoIntegrante = req.params.codigoIntegrante;

  try {
    const equipoAsignado = await pool.query(
      'SELECT * FROM integrantesxequipo WHERE codigoequipo = $1',
      [codigoEquipo]
    );

    if (equipoAsignado.rows.length > 0) {
      await pool.query('DELETE FROM integrantesxequipo WHERE codigoequipo = $1', [codigoEquipo]);
    }

    const competenciasAsociadas = await pool.query(
      'SELECT * FROM equiposXcompetencia WHERE codigoEquipo = $1',
      [codigoEquipo]
    );

    if (competenciasAsociadas.rows.length > 0) {
      await pool.query('DELETE FROM equiposXcompetencia WHERE codigoEquipo = $1', [codigoEquipo]);
    }

    const result = await pool.query('DELETE FROM equipos WHERE codigoEquipo = $1 RETURNING *', [codigoEquipo]);

    if (result.rows.length > 0) {
      res.json({ success: true, message: 'Equipo eliminado exitosamente' });
    } else {
      res.status(404).json({ success: false, message: 'Equipo no encontrado' });
    }
  } catch (error) {
    console.error('Error al eliminar equipo:', error);
    res.status(500).json({ success: false, message: 'Error en el servidor' });
  }
});
/**
 * @swagger
 * /eslider/{codigoEquipo}:
 *   get:
 *     summary: Verifica si un integrante es líder de equipo.
 *     description: Endpoint para verificar si un integrante es líder de equipo.
 *     tags: [Integrante]
 *     parameters:
 *       - in: path
 *         name: codigoEquipo
 *         required: true
 *         description: Código del equipo del integrante.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Información sobre si el integrante es líder o no.
 *         content:
 *           application/json:
 *             example:
 *               - comprobacionlider: true
 *       500:
 *         description: Error en el servidor.
 *         content:
 *           application/json:
 *             example:
 *               error: "Error en el servidor"
 */

app.get('/eslider/:codigoEquipo', async (req, res) => {
  const codigoEquipo = req.params.codigoEquipo;

  try {
    const result = await pool.query(
      'select comprobacionlider from integrante where documento=$1',
      [codigoEquipo]
    );
    if(result.rows[0].comprobacionlider){
      console.log("holalider");
    }
    console.log('Resultados:', result.rows);

    res.json(result.rows);
  } catch (error) {
    console.error('Error en la consulta:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});
/**
 * @swagger
 * /esAdmin/{documento}:
 *   get:
 *     summary: Verificar si un usuario es administrador
 *     tags:
 *       - Administrador
 *     parameters:
 *       - in: path
 *         name: documento
 *         required: true
 *         description: Documento del administrador a verificar
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: El usuario es administrador
 *         content:
 *           application/json:
 *             example:
 *               true
 *       '404':
 *         description: El usuario no es administrador
 *         content:
 *           application/json:
 *             example:
 *               false
 *       '500':
 *         description: Error en el servidor al verificar el estado de administrador
 *         content:
 *           application/json:
 *             example:
 *               error: "Error en el servidor"
 */



app.get('/esAdmin/:documento', async (req, res) => {
  const documento = req.params.documento;

  try {
    const result = await pool.query(
      'select * from administradores where documento=$1',
      [documento]
    );
    if(result.rows.length > 0){
      console.log("holaAdmin");
      res.json(true);
    }else{
      res.json(false);
    }

    
  } catch (error) {
    console.error('Error en la consulta:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

/**
 * @swagger
 * /BorrarIntegrante/{codigoequipo}/{documento}:
 *   delete:
 *     summary: Eliminar integrante de un equipo
 *     tags:
 *       - Equipos
 *     parameters:
 *       - in: path
 *         name: codigoequipo
 *         required: true
 *         schema:
 *           type: string
 *         description: Código único del equipo del cual se eliminará el integrante
 *       - in: path
 *         name: documento
 *         required: true
 *         schema:
 *           type: string
 *         description: Documento único del integrante que se eliminará del equipo
 *     responses:
 *       '200':
 *         description: Integrante eliminado del equipo con éxito
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Integrante eliminado del equipo
 *       '404':
 *         description: Integrante no encontrado
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Integrante no encontrado
 *       '500':
 *         description: Error en el servidor al eliminar integrante del equipo
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Error en el servidor
 */

app.delete('/BorrarIntegrante/:codigoequipo/:documento', async (req, res) => {
  const codigoequipo = req.params.codigoequipo;
  const documento = req.params.documento;

  try {
    const result = await pool.query('DELETE FROM integrantesxequipo WHERE codigoequipo = $1 and documentointegrante=$2 RETURNING *', [codigoequipo,documento]);
    if (result.rows.length > 0) {
      res.json({ success: true, message: 'Integrante eliminado del equipo' });
    } else {
      res.status(404).json({ success: false, message: 'Integrante no encontrado' });
    }
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    res.status(500).json({ success: false, message: 'Error en el servidor' });
  }
});

/**
 * @swagger
 * /agregarIntegrante/{codigoequipo}:
 *   post:
 *     summary: Agregar un integrante a un equipo
 *     tags:
 *       - Equipos
 *     parameters:
 *       - in: path
 *         name: codigoequipo
 *         required: true
 *         schema:
 *           type: string
 *         description: Código único del equipo al cual se agregará el integrante
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               documento:
 *                 type: string
 *                 description: Documento único del nuevo integrante
 *               contraseña:
 *                 type: string
 *                 description: Contraseña del nuevo integrante
 *               codigo:
 *                 type: string
 *                 description: Código del nuevo integrante
 *               nombre:
 *                 type: string
 *                 description: Nombre del nuevo integrante
 *               materia:
 *                 type: string
 *                 description: Materia del nuevo integrante
 *               comprobacionlider:
 *                 type: boolean
 *                 description: Indica si el nuevo integrante es líder o no
 *     responses:
 *       '200':
 *         description: Integrante agregado al equipo con éxito
 *         content:
 *           application/json:
 *             example:
 *               codigoequipo: 123
 *               documentointegrante: "ABC123"
 *               fechaingreso: "2023-11-19T00:00:00Z"
 *       '400':
 *         description: El integrante ya está inscrito en un equipo
 *         content:
 *           application/json:
 *             example:
 *               error: "El integrante ya está inscrito en un equipo."
 *       '500':
 *         description: Error en el servidor al agregar integrante al equipo
 *         content:
 *           application/json:
 *             example:
 *               error: "Error en el servidor"
 */
app.post('/agregarIntegrante/:codigoequipo', async (req, res) => {
  const codigoequipo = req.params.codigoequipo;
  const { documento, contraseña, codigo, nombre, materia, comprobacionlider } = req.body;

  try {
    const integranteExistente = await pool.query(
      'SELECT * FROM integrante WHERE documento = $1',
      [documento]
    );

    if (integranteExistente.rows.length > 0) {
      const integranteInscrito = await pool.query(
        'SELECT * FROM integrantesxequipo WHERE documentointegrante = $1',
        [documento]
      );

      if (integranteInscrito.rows.length > 0) {
        res.status(400).json({ error: 'El integrante ya está inscrito en un equipo.' });
      } else {
        const result = await pool.query(
          'INSERT INTO integrantesxequipo (codigoequipo, documentointegrante) VALUES ($1, $2) RETURNING *',
          [codigoequipo, documento]
        );

        res.json(result.rows[0]);
      }
    } else {
      const nuevoIntegrante = await pool.query(
        'INSERT INTO integrante (documento, contrasena, codigo, nombre, materia, comprobacionlider) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [documento, contraseña, codigo, nombre, materia, comprobacionlider]
      );

      const result = await pool.query(
        'INSERT INTO integrantesxequipo (codigoequipo, documentointegrante) VALUES ($1, $2) RETURNING *',
        [codigoequipo, documento]
      );

      res.json(result.rows[0]);
    }
  } catch (error) {
    console.error('Error al agregar integrante:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

/**
 * @swagger
 * /NumeroIntegrantes/{codigoEquipo}:
 *   get:
 *     summary: Verificar si un equipo tiene el número suficiente de integrantes
 *     tags:
 *       - Equipos
 *     parameters:
 *       - in: path
 *         name: codigoEquipo
 *         required: true
 *         schema:
 *           type: string
 *         description: Código único del equipo a verificar
 *     responses:
 *       '200':
 *         description: El equipo tiene el número suficiente de integrantes
 *         content:
 *           application/json:
 *             example:
 *               true
 *       '404':
 *         description: El equipo no tiene el número suficiente de integrantes
 *         content:
 *           application/json:
 *             example:
 *               false
 *       '500':
 *         description: Error en el servidor al verificar el número de integrantes del equipo
 *         content:
 *           application/json:
 *             example:
 *               error: "Error en el servidor"
 */
app.get('/NumeroIntegrantes/:codigoEquipo', async (req, res) => {
  const codigoEquipo = req.params.codigoEquipo;

  try {
    const result = await pool.query(
      'SELECT integrante.nombre, integrante.materia,integrante.codigo,integrante.documento FROM integrante INNER JOIN integrantesxequipo ON integrante.documento = integrantesxequipo.documentointegrante WHERE integrantesxequipo.codigoequipo = $1',
      [codigoEquipo]
    );
    
    const tieneSuficientesIntegrantes = result.rows.length == 3;

    res.json(tieneSuficientesIntegrantes);
    
  } catch (error) {
    console.error('Error en la consulta:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});
/**
 * @swagger
 * /infoEquipo/{codigoEquipo}:
 *   get:
 *     summary: Obtener información de un equipo por su código
 *     tags:
 *       - Equipos
 *     parameters:
 *       - in: path
 *         name: codigoEquipo
 *         required: true
 *         schema:
 *           type: string
 *         description: Código único del equipo a consultar
 *     responses:
 *       '200':
 *         description: Información del equipo obtenida exitosamente
 *         content:
 *           application/json:
 *             example:
 *               - codigoequipo: "C123"
 *                 nombre: "Equipo 1"
 *                 descripcion: "Descripción del equipo 1"
 *                 fecha_creacion: "2023-01-01"
 *       '404':
 *         description: No se encontró información para el equipo especificado
 *         content:
 *           application/json:
 *             example:
 *               error: "Equipo no encontrado"
 *       '500':
 *         description: Error en el servidor al obtener información del equipo
 *         content:
 *           application/json:
 *             example:
 *               error: "Error en el servidor"
 */

app.get('/infoEquipo/:codigoEquipo', async (req, res) => {
  const codigoEquipo = req.params.codigoEquipo;

  try {
    const result = await pool.query(
      'Select * from equipos where codigoequipo=$1',
      [codigoEquipo]
    );
    res.json(result.rows);
    console.log('Resultados:', result.rows);

    
  } catch (error) {
    console.error('Error en la consulta:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

/**
 * @swagger
 * /registroEquipo/{lider}:
 *   post:
 *     summary: Registrar un nuevo equipo con un líder
 *     tags:
 *       - Equipos
 *     parameters:
 *       - in: path
 *         name: lider
 *         required: true
 *         schema:
 *           type: string
 *         description: Documento del líder que se asociará al equipo
 *       - in: body
 *         name: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             codigoEquipo:
 *               type: string
 *             nombreequipo:
 *               type: string
 *         description: Datos del equipo a registrar
 *     responses:
 *       '200':
 *         description: Equipo registrado exitosamente con el líder asociado
 *         content:
 *           application/json:
 *             example:
 *               equipo:
 *                 codigoequipo: "E123"
 *                 nombreequipo: "Equipo 1"
 *                 fecha_creacion: "2023-01-01"
 *               lider: "123456789"
 *       '400':
 *         description: El código del equipo ya está en uso
 *         content:
 *           application/json:
 *             example:
 *               error: "El código del equipo ya está en uso."
 *       '500':
 *         description: Error en el servidor al registrar el equipo
 *         content:
 *           application/json:
 *             example:
 *               error: "Error en el servidor"
 */

app.post('/registroEquipo/:lider', async (req, res) => {
  const { codigoEquipo, nombreequipo } = req.body;
  const codigolider = req.params.lider;

  try {
    const equipoResult = await pool.query(
      'INSERT INTO equipos (codigoequipo, nombreequipo) VALUES ($1, $2) RETURNING *',
      [codigoEquipo, nombreequipo]
    );
  
    await pool.query(
      'INSERT INTO integrantesxequipo (codigoequipo, documentointegrante) VALUES ($1, $2) RETURNING *',
      [codigoEquipo, codigolider]
    );
  
    const result = {
      equipo: equipoResult.rows[0],
      lider: codigolider,
    };
  
    res.json(result);
  } catch (error) {
    console.error('Error en el servidor:', error);
  
    if (error.code === '23505') {
      res.status(400).json({ error: 'El código del equipo ya está en uso.' });
    } else {
      res.status(500).json({ error: 'Error en el servidor' });
    }
  }
  
});

/**
 * @swagger
 * /CompetenciasDisponibles/{codigoEquipo}:
 *   get:
 *     summary: Obtener competencias disponibles para un equipo según las materias de sus integrantes
 *     tags:
 *       - Competencias
 *     parameters:
 *       - in: path
 *         name: codigoEquipo
 *         required: true
 *         schema:
 *           type: string
 *         description: Código único del equipo
 *     responses:
 *       '200':
 *         description: Competencias disponibles obtenidas con éxito
 *         content:
 *           application/json:
 *             example:
 *               - codigocompetencia: 1
 *                 fechainicio: '2023-01-01'
 *                 fechafin: '2023-01-31'
 *                 periodovigente: 30
 *                 categoria: 'Avanzada'
 *               - codigocompetencia: 2
 *                 fechainicio: '2023-02-01'
 *                 fechafin: '2023-02-28'
 *                 periodovigente: 27
 *                 categoria: 'Elite'
 *       '500':
 *         description: Error en el servidor al obtener competencias disponibles
 *         content:
 *           application/json:
 *             example:
 *               error: 'Error en el servidor'
 */
app.get('/CompetenciasDisponibles/:codigoEquipo', async (req, res) => {
  const codigoEquipo = req.params.codigoEquipo;

  try {
    const materiasIntegrantes = await pool.query(
      'SELECT DISTINCT materia FROM integrante WHERE documento IN (SELECT documentointegrante FROM integrantesxequipo WHERE codigoequipo = $1)',
      [codigoEquipo]
    );

    let competenciasDisponibles = [];

    if (materiasIntegrantes.rows.some((materia) => materia.materia === 'Otros')) {
      const competenciasElite = await pool.query('SELECT * FROM competencia WHERE categoria = $1', ['Elite']);
      competenciasDisponibles = competenciasElite.rows;
    } else if (materiasIntegrantes.rows.some((materia) => materia.materia === 'PAvanzada')) {
      const competenciasEliteMedia = await pool.query('SELECT * FROM competencia WHERE categoria IN ($1, $2)', ['Avanzada', 'Elite']);
      competenciasDisponibles = competenciasEliteMedia.rows;
    }else if (materiasIntegrantes.rows.some((materia) => materia.materia === 'POO')) {
      const competenciasEliteMedia = await pool.query('SELECT * FROM competencia WHERE categoria IN ($1, $2,$3)', ['Elite','Avanzada', 'Intermedia']);
      competenciasDisponibles = competenciasEliteMedia.rows;
    } else if (materiasIntegrantes.rows.every((materia) => materia.materia === 'PBasica')) {
      const competenciasTodas = await pool.query('SELECT * FROM competencia');
      competenciasDisponibles = competenciasTodas.rows;
    } 

    res.json(competenciasDisponibles);
  } catch (error) {
    console.error('Error al determinar competencias disponibles:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

/**
 * @swagger
 * /CompetenciasDisponiblesSemestre/{codigoEquipo}/{codigoSemestre}:
 *   get:
 *     summary: Obtener competencias disponibles para un equipo y semestre específicos según las materias de sus integrantes
 *     tags:
 *       - Competencias
 *     parameters:
 *       - in: path
 *         name: codigoEquipo
 *         required: true
 *         schema:
 *           type: string
 *         description: Código único del equipo
 *       - in: path
 *         name: codigoSemestre
 *         required: true
 *         schema:
 *           type: string
 *         description: Código único del semestre
 *     responses:
 *       '200':
 *         description: Competencias disponibles obtenidas con éxito
 *         content:
 *           application/json:
 *             example:
 *               - codigocompetencia: 1
 *                 fechainicio: '2023-01-01'
 *                 fechafin: '2023-01-31'
 *                 periodovigente: 30
 *                 categoria: 'Avanzada'
 *               - codigocompetencia: 2
 *                 fechainicio: '2023-02-01'
 *                 fechafin: '2023-02-28'
 *                 periodovigente: 27
 *                 categoria: 'Elite'
 *       '500':
 *         description: Error en el servidor al obtener competencias disponibles
 *         content:
 *           application/json:
 *             example:
 *               error: 'Error en el servidor'
 */

app.get('/CompetenciasDisponiblesSemestre/:codigoEquipo/:codigoSemestre', async (req, res) => {
  const codigoEquipo = req.params.codigoEquipo;
  const codigoSemestre = req.params.codigoSemestre;


  try {
    const materiasIntegrantes = await pool.query(
      'SELECT DISTINCT materia FROM integrante WHERE documento IN (SELECT documentointegrante FROM integrantesxequipo WHERE codigoequipo = $1)',
      [codigoEquipo]
    );

    let competenciasDisponibles = [];

    if (materiasIntegrantes.rows.some((materia) => materia.materia === 'Otros')) {
      const competenciasElite = await pool.query('SELECT * FROM competencia INNER JOIN semestrexcompetencia ON competencia.codigocompetencia = semestrexcompetencia.codigocompetencia WHERE semestrexcompetencia.codigosemestre =$1 and competencia.categoria=$2', [codigoSemestre,'Elite']);
      competenciasDisponibles = competenciasElite.rows;
    } else if (materiasIntegrantes.rows.some((materia) => materia.materia === 'PAvanzada')) {
      const competenciasEliteMedia = await pool.query('SELECT * FROM competencia INNER JOIN semestrexcompetencia ON competencia.codigocompetencia = semestrexcompetencia.codigocompetencia WHERE semestrexcompetencia.codigosemestre =$3 and competencia.categoria IN ($1,$2 ) ', ['Avanzada', 'Elite',codigoSemestre]);
      competenciasDisponibles = competenciasEliteMedia.rows;
    }else if (materiasIntegrantes.rows.some((materia) => materia.materia === 'POO')) {
      const competenciasEliteMedia = await pool.query('SELECT * FROM competencia INNER JOIN semestrexcompetencia ON competencia.codigocompetencia = semestrexcompetencia.codigocompetencia WHERE semestrexcompetencia.codigosemestre =$4 and competencia.categoria IN ($1, $2,$3) ', ['Elite','Avanzada', 'Intermedia',codigoSemestre]);
      competenciasDisponibles = competenciasEliteMedia.rows;
    } else if (materiasIntegrantes.rows.every((materia) => materia.materia === 'PBasica')) {
      const competenciasTodas = await pool.query('SELECT * FROM competencia INNER JOIN semestrexcompetencia ON competencia.codigocompetencia = semestrexcompetencia.codigocompetencia WHERE semestrexcompetencia.codigosemestre =$1',[codigoSemestre]);
      competenciasDisponibles = competenciasTodas.rows;
    } 

    res.json(competenciasDisponibles);
  } catch (error) {
    console.error('Error al determinar competencias disponibles:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});


/**
 * @swagger
 * /Equipoinscrito/{codigoequipo}:
 *   get:
 *     summary: Verificar si un equipo está inscrito en alguna competencia
 *     tags:
 *       - Equipos
 *     parameters:
 *       - in: path
 *         name: codigoequipo
 *         required: true
 *         schema:
 *           type: string
 *         description: Código del equipo a verificar
 *     responses:
 *       '200':
 *         description: El equipo está inscrito en alguna competencia
 *         content:
 *           application/json:
 *             example: true
 *       '401':
 *         description: El equipo no está inscrito en ninguna competencia
 *         content:
 *           application/json:
 *             example: false
 *       '500':
 *         description: Error en el servidor al realizar la verificación
 *         content:
 *           application/json:
 *             example:
 *               error: "Error en el servidor"
 */







app.get('/Equipoinscrito/:codigoequipo', async (req, res) => {
  const codigoequipo = req.params.codigoequipo;
  try {
    const result = await pool.query(
      'SELECT equipos.* FROM equipos INNER JOIN equiposXcompetencia ON equipos.codigoEquipo = equiposXcompetencia.codigoEquipo WHERE equiposXcompetencia.codigoequipo = $1',
      [codigoequipo]
    );
    if (result.rows.length > 0) {

      res.json(true);
    } else {
      res.status(401).json( false);
    }

  } catch (error) {
    console.error('Error en la consulta:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

/**
 * @swagger
 * /InscripcionEquipo:
 *   post:
 *     summary: Inscribir un equipo a una competencia
 *     tags:
 *       - Equipos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               CodigoCompetencai:
 *                 type: string
 *                 description: Código de la competencia a la que se inscribe el equipo
 *               codigoequipo:
 *                 type: string
 *                 description: Código del equipo que se inscribe a la competencia
 *             required:
 *               - CodigoCompetencai
 *               - codigoequipo
 *     responses:
 *       '200':
 *         description: Equipo inscrito exitosamente en la competencia
 *         content:
 *           application/json:
 *             example:
 *               // Estructura de la respuesta cuando se inscribe exitosamente
 *       '500':
 *         description: Error en el servidor al inscribir el equipo a la competencia
 *         content:
 *           application/json:
 *             example:
 *               error: "Error en el servidor"
 */

app.post('/InscripcionEquipo', async (req, res) => {

  const { CodigoCompetencai, codigoequipo} = req.body;

  try {
    const result = await pool.query('insert into equiposxcompetencia(codigocompetencia, codigoequipo) values ($1,$2) RETURNING *', [CodigoCompetencai,codigoequipo]);

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al inscribir equipo a competencia:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});
/**
 * @swagger
 * /Semestres:
 *   get:
 *     summary: Obtener todos los semestres
 *     tags:
 *       - Semestres
 *     responses:
 *       '200':
 *         description: Lista de todos los semestres
 *         content:
 *           application/json:
 *             example:
 *               - codigosemestre: 1
 *                 nombre: "2022-1"
 *               - codigosemestre: 2
 *                 nombre: "2022-2"
 *       '500':
 *         description: Error en el servidor al obtener la lista de semestres
 *         content:
 *           application/json:
 *             example:
 *               error: "Error en el servidor"
 */


app.get('/Semestres', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM semestre');
    res.json(result.rows);
  } catch (error) {
    console.error('Error en la consulta:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});
/**
 * @swagger
 * /MostrarCompetenciasSemestre/{idsemestre}:
 *   get:
 *     summary: Obtener competencias asociadas a un semestre específico
 *     tags:
 *       - Competencias
 *     parameters:
 *       - in: path
 *         name: idsemestre
 *         required: true
 *         schema:
 *           type: string
 *         description: Código único del semestre
 *     responses:
 *       '200':
 *         description: Competencias asociadas al semestre obtenidas con éxito
 *         content:
 *           application/json:
 *             example:
 *               - codigocompetencia: 1
 *                 fechainicio: '2023-01-01'
 *                 fechafin: '2023-01-31'
 *                 periodovigente: 30
 *                 categoria: 'Avanzada'
 *               - codigocompetencia: 2
 *                 fechainicio: '2023-02-01'
 *                 fechafin: '2023-02-28'
 *                 periodovigente: 27
 *                 categoria: 'Elite'
 *       '500':
 *         description: Error en el servidor al obtener competencias asociadas al semestre
 *         content:
 *           application/json:
 *             example:
 *               error: 'Error en el servidor'
 */

app.get('/MostrarCompetenciasSemestre/:idsemestre', async (req, res) => {
  const codigosemestre = req.params.idsemestre;

  try {
    const result = await pool.query('SELECT * FROM competencia INNER JOIN semestrexcompetencia ON competencia.codigocompetencia = semestrexcompetencia.codigocompetencia WHERE semestrexcompetencia.codigosemestre = $1 ',[codigosemestre]);
    res.json(result.rows);
  } catch (error) {
    console.error('Error en la consulta:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

/**
 * @swagger
 * /Nuevosemestre:
 *   post:
 *     summary: Crear un nuevo semestre
 *     tags:
 *       - Semestres
 *     requestBody:
 *       description: Datos del nuevo semestre
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             codigo: 3
 *             nombre: "2023-1"
 *     responses:
 *       '200':
 *         description: Nuevo semestre creado exitosamente
 *         content:
 *           application/json:
 *             example:
 *               codigosemestre: 3
 *               nombre: "2023-1"
 *       '500':
 *         description: Error en el servidor al crear un nuevo semestre
 *         content:
 *           application/json:
 *             example:
 *               error: "Error en el servidor"
 */


app.post('/Nuevosemestre', async (req, res) => {
  const { codigo, nombre} = req.body;

  try {
    const result = await pool.query('insert into semestre(codigo, nombre) values ($1,$2) RETURNING *', [codigo,nombre]);

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al inscribir equipo a competencia:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

const axios = require('axios'); 

/**
 * @swagger
 * /borrarSemestre/{codigoSemestre}:
 *   delete:
 *     summary: Eliminar un semestre por código
 *     tags:
 *       - Semestres
 *     parameters:
 *       - in: path
 *         name: codigoSemestre
 *         required: true
 *         description: Código del semestre a eliminar
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Semestre eliminado exitosamente
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "Semestre eliminado exitosamente"
 *       '404':
 *         description: Semestre no encontrado
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Semestre no encontrado"
 *       '500':
 *         description: Error en el servidor al eliminar semestre
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Error en el servidor"
 */

app.delete('/borrarSemestre/:codigoSemestre', async (req, res) => {
  const codigoSemestre = req.params.codigoSemestre;

  try {
    const competenciasAsociadas = await pool.query(
      'SELECT * FROM semestrexcompetencia WHERE codigoSemestre = $1',
      [codigoSemestre]
    );

    if (competenciasAsociadas.rows.length > 0) {
      for (const competencia of competenciasAsociadas.rows) {
        await axios.delete(`http://localhost:3001/borrarCompetencia/${competencia.codigocompetencia}`);
      }

      await pool.query('DELETE FROM semestrexcompetencia WHERE codigosemestre = $1', [
        codigoSemestre,
      ]);
    }

    const result = await pool.query('DELETE FROM semestre WHERE codigo = $1 RETURNING *', [
      codigoSemestre,
    ]);

    if (result.rows.length > 0) {
      res.json({ success: true, message: 'Semestre eliminado exitosamente' });
    } else {
      res.status(404).json({ success: false, message: 'Semestre no encontrado' });
    }
  } catch (error) {
    console.error('Error al eliminar semestre:', error);
    res.status(500).json({ success: false, message: 'Error en el servidor' });
  }
});





// Escuchar en el puerto especificado
app.listen(port, () => {
  console.log(`Servidor backend escuchando en el puerto ${port}`);
});
