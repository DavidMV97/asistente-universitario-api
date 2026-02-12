# CRUD Asistente Universitario (Node.js + Express + MySQL) — Arquitectura MVC

Este proyecto implementa un CRUD para **Estudiantes, Docentes, Materias, Cursos y Notas** usando **Node.js**, **Express** y **MySQL** con una estructura **MVC** (Routes → Controllers → Services → Models/Repositories).

---

## 1) Requisitos

- Node.js **>= 18**
- MySQL (por ejemplo **XAMPP**) corriendo en `localhost`
- Git (opcional)

---

## 2) Crear el proyecto (paso a paso)

### 2.1 Crear carpeta e inicializar Node
```bash
mkdir asistente-universitario-api
cd asistente-universitario-api
npm init -y
```

### 2.2 Instalar dependencias
```bash
npm i express cors dotenv mysql2
npm i -D nodemon
```

### 2.3 Crear scripts en package.json (Edita package.json y agrega:)
```bash
{
  "name": "asistente-universitario-api",
  "version": "1.0.0",
  "main": "src/app.js",
  "scripts": {
    "dev": "nodemon src/app.js",
    "start": "node src/app.js"
  }
}
```
## 3) Crear la estructura MVC (carpeta por carpeta)

### ¿Qué hace cada carpeta en esta arquitectura MVC + capas?
config/
```bash
¿Para qué sirve?
    Configuración general del proyecto.

Qué va aquí:
    Variables de entorno (.env → env.js)
    Configuración de puertos, credenciales, flags
    Configs de entorno (dev / prod)
```

db/
```bash
¿Para qué sirve?
    Conexiones a bases de datos.

Qué va aquí:
    Pool de MySQL / MSSQL / PostgreSQL
    Configuración de conexión
    Reintentos o timeout de conexión
```

models/
```bash
¿Para qué sirve?
    Representar la estructura del dominio (las entidades).
    
Qué va aquí:
    Estructura de datos (Estudiante, Docente, Curso, ...)
    Validaciones de campos
    Tipos / esquemas (si usas Joi, Zod, Sequelize, Mongoose)
```

repositories/
```bash
¿Para qué sirve?
    Acceso a datos (SQL puro).
    
Qué va aquí:
    SELECT, INSERT, UPDATE, DELETE
    Llamadas a la BD
    Nada de reglas de negocio
```

services/
```bash
¿Para qué sirve?
    Reglas de negocio y lógica del sistema.
    
Qué va aquí:
    Validaciones (ej: “el semestre debe ser > 0”)
    Cálculos (ej: nota definitiva)
    Orquestar múltiples repositorios
```

controllers/
```bash
¿Para qué sirve?
    Controlar las peticiones HTTP.
    
Qué va aquí:
    Leer req.params, req.body, req.query
    Llamar a los services
    Enviar respuestas (res.json)
```

routes/
```bash
¿Para qué sirve?
    Definir las rutas (endpoints).
    
Qué va aquí:
    URLs
    Métodos HTTP (GET, POST, PUT, DELETE)
    Asociar rutas con controllers
```

middlewares/
```bash
¿Para qué sirve?
    Código que se ejecuta antes o después del controller.
    
Qué va aquí:
    Manejo de errores
    Autenticación / autorización
    Logs
    Validaciones globales
```

Resumen para memorizar
```bash
Config       →  ¿con qué parámetros?
db           →  ¿cómo me conecto?
Models       →  ¿cómo es el dato?
Repositories →  ¿cómo se guarda/lee?
Services     →  ¿qué se debe hacer?
Controllers  →  ¿qué pidió el cliente?
Routes       →  ¿a dónde va?
Middlewares  →  ¿qué pasa antes/después?
```

### 3.1 Orden de carpetas:
```bash
src/
    config/
    db/
    models/
    repositories/
    services/
    controllers/
    routes/
    middlewares/
```

La estructura final queda así:
```bash
src/
  app.js
  config/
    env.js
  db/
    mysql.js
  models/
    (opcional: entidades/validaciones)
  repositories/
    estudiantes.repository.js
    docentes.repository.js
    materias.repository.js
    cursos.repository.js
    notas.repository.js
  services/
    estudiantes.service.js
    docentes.service.js
    materias.service.js
    cursos.service.js
    notas.service.js
  controllers/
    estudiantes.controller.js
    docentes.controller.js
    materias.controller.js
    cursos.controller.js
    notas.controller.js
  routes/
    estudiantes.routes.js
    docentes.routes.js
    materias.routes.js
    cursos.routes.js
    notas.routes.js
  middlewares/
    errorHandler.js

```
## 4) Configuración de entorno (.env)
Crea un archivo .env en la raíz:
```bash
PORT=3000

MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=
MYSQL_DATABASE=asistente_universitario
```

## 5) Configuración — src/config/env.js
```bash
require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  mysql: {
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQL_PORT || 3306),
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  },
};
```

## 6) Conexión MySQL (Pool) — src/db/mysql.js
```bash
const mysql = require('mysql2/promise');
const env = require('../config/env');

const pool = mysql.createPool({
  host: env.mysql.host,
  port: env.mysql.port,
  user: env.mysql.user,
  password: env.mysql.password,
  database: env.mysql.database,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool;

```

## 7) Middleware de errores — src/middlewares/errorHandler.js
```bash
module.exports = function errorHandler(err, req, res, next) {
  const status = err.status || 500;
  const message = err.message || 'Error interno';

  console.error(err);

  res.status(status).json({
    ok: false,
    message,
  });
};

```

## 8) Repositories (SQL aquí) — ejemplo Estudiantes

### 8.1 src/repositories/estudiantes.repository.js
```bash
const pool = require('../db/mysql');

async function findAll() {
  const [rows] = await pool.query('SELECT * FROM estudiantes ORDER BY id_estudiante DESC');
  return rows;
}

async function findById(id) {
  const [rows] = await pool.query('SELECT * FROM estudiantes WHERE id_estudiante = ?', [id]);
  return rows[0] || null;
}

async function create(data) {
  const sql = `
    INSERT INTO estudiantes (codigo, nombres, apellidos, email, telefono, fecha_nacimiento, semestre, estado)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const params = [
    data.codigo, 
    data.nombres, 
    data.apellidos, 
    data.email,
    data.telefono || null,
    data.fecha_nacimiento || null,
    data.semestre,
    data.estado || 'ACTIVO'
  ];

  const [result] = await pool.query(sql, params);
  return result.insertId;
}

async function update(id, data) {
  const sql = `
    UPDATE estudiantes
    SET nombres = ?, apellidos = ?, email = ?, telefono = ?, semestre = ?, estado = ?
    WHERE id_estudiante = ?
  `;
  const params = [
    data.nombres, data.apellidos, data.email,
    data.telefono || null,
    data.semestre,
    data.estado || 'ACTIVO',
    id
  ];

  const [result] = await pool.query(sql, params);
  return result.affectedRows;
}

async function remove(id) {
  const [result] = await pool.query('DELETE FROM estudiantes WHERE id_estudiante = ?', [id]);
  return result.affectedRows;
}

module.exports = { findAll, findById, create, update, remove };

```

## 9) Services (reglas de negocio) — ejemplo Estudiantes

### 9.1 src/services/estudiantes.service.js
```bash
const repo = require('../repositories/estudiantes.repository');

async function getAll() {
  return repo.findAll();
}

async function getById(id) {
  const num = Number(id);
  if (!num || Number.isNaN(num)) {
    const err = new Error('ID inválido');
    err.status = 400;
    throw err;
  }

  const row = await repo.findById(num);
  if (!row) {
    const err = new Error('Estudiante no encontrado');
    err.status = 404;
    throw err;
  }
  return row;
}

async function create(data) {
  // Validaciones mínimas
  if (!data.codigo || !data.nombres || !data.apellidos || !data.email || !data.semestre) {
    const err = new Error('Faltan campos obligatorios');
    err.status = 400;
    throw err;
  }
  const id = await repo.create(data);
  return id;
}

async function update(id, data) {
  await getById(id); // valida que existe
  const affected = await repo.update(Number(id), data);
  return affected;
}

async function remove(id) {
  await getById(id); // valida que existe
  const affected = await repo.remove(Number(id));
  return affected;
}

module.exports = { getAll, getById, create, update, remove };

```

## 10) Controllers (HTTP) — ejemplo Estudiantes

### 10.1 src/controllers/estudiantes.controller.js
```bash
const service = require('../services/estudiantes.service');

async function getAll(req, res, next) {
  try {
    const data = await service.getAll();
    res.json({ ok: true, data });
  } catch (e) { next(e); }
}

async function getById(req, res, next) {
  try {
    const data = await service.getById(req.params.id);
    res.json({ ok: true, data });
  } catch (e) { next(e); }
}

async function create(req, res, next) {
  try {
    const id = await service.create(req.body);
    res.status(201).json({ ok: true, id, message: 'Estudiante creado' });
  } catch (e) { next(e); }
}

async function update(req, res, next) {
  try {
    await service.update(req.params.id, req.body);
    res.json({ ok: true, message: 'Estudiante actualizado' });
  } catch (e) { next(e); }
}

async function remove(req, res, next) {
  try {
    await service.remove(req.params.id);
    res.json({ ok: true, message: 'Estudiante eliminado' });
  } catch (e) { next(e); }
}

module.exports = { getAll, getById, create, update, remove };

```

## 11) Routes — ejemplo Estudiantes

### 11.1 src/routes/estudiantes.routes.js
```bash
const { Router } = require('express');
const ctrl = require('../controllers/estudiantes.controller');

const router = Router();

router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getById);
router.post('/', ctrl.create);
router.put('/:id', ctrl.update);
router.delete('/:id', ctrl.remove);

module.exports = router;

```

## 12) app.js (main) — src/app.js
```bash
const express = require('express');
const cors = require('cors');
const env = require('./config/env');
const errorHandler = require('./middlewares/errorHandler');

const estudiantesRoutes = require('./routes/estudiantes.routes');
// Repite lo mismo para: docentes, materias, cursos, notas
// ...

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => res.json({ ok: true, status: 'UP' }));

app.use('/api/estudiantes', estudiantesRoutes);
// Repite lo mismo para: docentes, materias, cursos, notas
// ...

app.use(errorHandler);

app.listen(env.port, () => {
  console.log(`API corriendo en http://localhost:${env.port}`);
});

```

---
## 13) Crear el resto de módulos (docentes, materias, cursos, notas)
Repite el patrón por módulo:
```bash
repositories/<modulo>.repository.js (SQL)

services/<modulo>.service.js (validaciones/reglas)

controllers/<modulo>.controller.js (HTTP)

routes/<modulo>.routes.js (endpoints)

Registrar la ruta en src/app.js
```

---

## 14) Ejecutar

### 14.1 Crea la base de datos ejecutando tu archivo SQL:
En phpMyAdmin (XAMPP) o consola:
```bash
SOURCE ruta/al/archivo.sql;
```

### 14.2 Ejecuta la API:
```bash
npm run dev
```

---

## 15) Endpoints esperados (ejemplo)
```bash
GET /api/estudiantes

GET /api/estudiantes/:id

POST /api/estudiantes

PUT /api/estudiantes/:id

DELETE /api/estudiantes/:id
```
(Igual para docentes, materias, cursos y notas)

## Con este proceso, ya tenemos completo una estructura solida y escapable, con arquitectura MVC de un Proyecto Server Node Rest Api.  