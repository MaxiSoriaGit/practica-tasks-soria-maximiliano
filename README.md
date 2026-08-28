# Práctica de Eliminación Lógica y Actualizaciones

Proyecto backend desarrollado para la materia de Instituto Politécnico Formosa (IPF). Consiste en una API REST que permite gestionar usuarios, tareas, perfiles y tags, implementando operaciones CRUD completas (Crear, Leer, Actualizar, Eliminar) con Node.js, Express, MySQL y Sequelize ORM. Sobre la base de la práctica de validaciones con `express-validator`, se incorporó **eliminación lógica** en el modelo `Task` y se agregaron **validaciones para las rutas de actualización** utilizando `.optional()` y `matchedData()`.

## 📋 Objetivo

Incorporar eliminación lógica en al menos un modelo del proyecto, y agregar validaciones para las rutas de actualización (`PUT`) utilizando `.optional()` en `express-validator` y `matchedData()` en los controladores, de forma que solo se actualicen los campos enviados y validados por el cliente, aplicando buenas prácticas de control de versiones con Git y GitHub.

## 🛠️ Tecnologías utilizadas

- **Node.js** — entorno de ejecución de JavaScript en el servidor
- **Express** — framework para manejar rutas y peticiones HTTP
- **MySQL** — sistema de base de datos relacional
- **Sequelize** — ORM para conectar y trabajar con la base de datos desde JavaScript (incluye soporte nativo de eliminación lógica vía `paranoid`)
- **express-validator** — validación y saneamiento de datos de entrada en la API
- **dotenv** — manejo de variables de entorno
- **nodemon** — reinicio automático del servidor en desarrollo

## 📁 Estructura del proyecto

```
practica-tasks-soria-maximiliano/
├── src/
│ ├── config/
│ │ └── database.js # Conexión a MySQL con Sequelize
│ ├── models/
│ │ ├── User.js # Modelo de Usuario
│ │ ├── Task.js # Modelo de Tarea (paranoid: eliminación lógica)
│ │ ├── Profile.js # Modelo de Perfil (relación 1:1 con User)
│ │ └── Tag.js # Modelo de Tag (relación N:N con Task)
│ ├── controllers/
│ │ ├── userController.js # CRUD de usuarios (update con matchedData)
│ │ ├── taskController.js # CRUD de tareas (update con matchedData, delete lógico)
│ │ ├── profileController.js # CRUD de perfiles (update/delete agregados)
│ │ └── tagController.js # CRUD de tags (update/delete agregados)
│ ├── middlewares/
│ │ ├── handleValidationErrors.js # Middleware centralizado de errores de validación
│ │ └── validators/
│ │ ├── userValidator.js
│ │ ├── taskValidator.js
│ │ ├── profileValidator.js
│ │ └── tagValidator.js
│ └── routes/
│ ├── userRoutes.js # Rutas de usuarios
│ ├── taskRoutes.js # Rutas de tareas
│ ├── profileRoutes.js # Rutas de perfiles
│ └── tagRoutes.js # Rutas de tags
├── app.js # Punto de entrada de la aplicación
├── .env # Variables de entorno (no se sube)
├── .env.example # Ejemplo de variables necesarias
├── .gitignore
└── package.json
```

## ⚙️ Instalación y configuración

### 1. Clonar el repositorio

```
git clone https://github.com/MaxiSoriaGit/practica-tasks-soria-maximiliano.git
cd practica-tasks-soria-maximiliano
```

### 2. Instalar dependencias

```
npm install
```

Esto instala, entre otras, la librería `express-validator` usada para las validaciones.

### 3. Crear la base de datos

Con MySQL corriendo (WampServer, XAMPP, etc.), crear la base de datos:

```
CREATE DATABASE tasks_users_db;
```

Las tablas se crean y actualizan automáticamente al iniciar el proyecto, gracias a `sequelize.sync({ alter: true })` (incluye la columna `deletedAt` que agrega el modo `paranoid` en Task).

### 4. Configurar variables de entorno

Crear un archivo `.env` en la raíz del proyecto, copiando el formato de `.env.example`:

```
DB_HOST=localhost
DB_NAME=tasks_users_db
DB_USER=root
DB_PASSWORD=
DB_PORT=3306
PORT=3000
```

### 5. Iniciar el servidor

```
npm run dev
```

El servidor va a correr en `http://localhost:3000`.

## 🔗 Relaciones entre modelos

- **User - Task (1 a N):** un usuario puede tener muchas tareas, cada tarea pertenece a un único usuario.
- **User - Profile (1 a 1):** cada usuario puede tener un perfil asociado, con información adicional (bio, avatar).
- **Task - Tag (N a N):** una tarea puede tener varias etiquetas, y una etiqueta puede aplicarse a varias tareas, a través de la tabla intermedia `TaskTag`.

Todas las relaciones están definidas en `src/models/index.js`.

## 📡 Endpoints de la API

### Usuarios

| Método | Ruta             | Descripción                | Validaciones                                     |
| ------ | ---------------- | -------------------------- | ------------------------------------------------- |
| POST   | `/api/users`     | Crear un nuevo usuario     | Campos obligatorios, formato, unicidad             |
| GET    | `/api/users`     | Obtener todos los usuarios | —                                                   |
| GET    | `/api/users/:id` | Obtener un usuario por ID  | ID entero positivo, existencia                     |
| PUT    | `/api/users/:id` | Actualizar un usuario      | ID existente, campos opcionales, `matchedData()`   |
| DELETE | `/api/users/:id` | Eliminar un usuario        | ID entero positivo, existencia                     |

Campos del modelo User:

- `name` (string, obligatorio, entre 3 y 100 caracteres)
- `email` (string, obligatorio, único, formato de email válido)
- `password` (string, obligatorio, mínimo 6 caracteres)

### Tareas

| Método | Ruta             | Descripción              | Validaciones                                       |
| ------ | ---------------- | ------------------------ | --------------------------------------------------- |
| POST   | `/api/tasks`     | Crear una nueva tarea    | Campos obligatorios, unicidad, `userId` existente    |
| GET    | `/api/tasks`     | Obtener todas las tareas | Excluye automáticamente las tareas eliminadas lógicamente |
| GET    | `/api/tasks/:id` | Obtener una tarea por ID | ID entero positivo, existencia                       |
| PUT    | `/api/tasks/:id` | Actualizar una tarea     | ID existente, campos opcionales, `matchedData()`     |
| DELETE | `/api/tasks/:id` | Eliminar una tarea (**eliminación lógica**) | ID entero positivo, existencia   |

**Campos del modelo Task:**

- `title` (string, obligatorio, único, entre 3 y 100 caracteres)
- `description` (string, opcional, máx. 500 caracteres)
- `isComplete` (booleano, por defecto `false`)
- `userId` (entero, obligatorio, debe existir en la tabla de usuarios)
- `deletedAt` (agregado automáticamente por Sequelize al activar `paranoid: true`; no se declara manualmente en el modelo)

> **Eliminación lógica:** el modelo `Task` tiene `paranoid: true` y `timestamps: true`. Al llamar a `task.destroy()`, Sequelize no borra la fila: completa `deletedAt` con la fecha y hora actuales. Las consultas estándar (`findAll`, `findByPk`) excluyen automáticamente los registros eliminados, preservando el historial de datos.

### Perfiles

| Método | Ruta                | Descripción                | Validaciones                                              |
| ------ | ------------------- | --------------------------- | ----------------------------------------------------------- |
| POST   | `/api/profiles`     | Crear un nuevo perfil       | `userId` obligatorio y existente, un perfil por usuario (1:1) |
| GET    | `/api/profiles`     | Obtener todos los perfiles  | —                                                              |
| PUT    | `/api/profiles/:id` | Actualizar un perfil        | ID existente, campos opcionales, `matchedData()`             |
| DELETE | `/api/profiles/:id` | Eliminar un perfil          | ID entero positivo, existencia                                |

**Campos del modelo Profile:**

- `bio` (string, opcional, máx. 300 caracteres)
- `avatarUrl` (string, opcional)
- `userId` (entero, obligatorio, único — relación 1:1 con User)

### Tags

| Método | Ruta            | Descripción            | Validaciones                                  |
| ------ | --------------- | ----------------------- | ----------------------------------------------- |
| POST   | `/api/tags`     | Crear un nuevo tag      | Campo obligatorio, longitud, unicidad            |
| GET    | `/api/tags`     | Obtener todos los tags  | —                                                  |
| PUT    | `/api/tags/:id` | Actualizar un tag       | ID existente, campo opcional, `matchedData()`    |
| DELETE | `/api/tags/:id` | Eliminar un tag         | ID entero positivo, existencia                     |

**Campos del modelo Tag:**

- `name` (string, obligatorio, único, entre 2 y 20 caracteres)

## ✅ Validaciones implementadas

- **Middleware centralizado** (`handleValidationErrors.js`): recolecta los errores generados por `express-validator` y responde con `400` en formato JSON uniforme, evitando repetir esa lógica en cada controlador.
- **IDs en parámetros**: se valida que sean enteros positivos y que el recurso exista en la base de datos mediante validaciones `custom`.
- **Campos obligatorios en creación**: validados con `notEmpty()`, `isLength()`, `isInt()` o `isEmail()` según el tipo de dato.
- **Campos opcionales en actualización**: todos los validadores de `PUT` usan `.optional()`, de modo que un campo solo se valida si el cliente lo envía, sin exigir el resto de los campos.
- **`matchedData()` en los controladores de actualización**: `updateUser`, `updateTask`, `updateProfile` y `updateTag` obtienen únicamente los campos enviados y validados con `matchedData(req, { includeOptionals: false })`, evitando pasar al modelo datos no esperados o no validados provenientes de `req.body`.
- **Verificación de unicidad** (email de usuario, título de tarea, nombre de tag, perfil único por usuario) antes de crear o editar.
- **Verificación de existencia previa** antes de editar o eliminar un recurso.
- Respuestas con códigos HTTP apropiados: `200`, `201`, `400`, `404`, `500`.
- Manejo de errores con `try-catch` en todos los controladores.

## 🌿 Flujo de trabajo con Git

El proyecto se versionó siguiendo un flujo de ramas:

- **`main`**: rama principal, contiene la versión final del proyecto
- **`develop`**: rama de integración donde se consolidó el trabajo de las ramas feature
- **`feature/endpoints`**: desarrollo de modelos, controladores y rutas de la API
- **`feature/env-config`**: implementación de variables de entorno con dotenv
- **`validaciones`**: incorporación de `express-validator` y el middleware de manejo de errores sobre los controladores ya existentes
- **`eliminacion-logica`**: implementación de eliminación lógica (`paranoid`) en el modelo `Task`, agregado de rutas `PUT`/`DELETE` faltantes en `Profile` y `Tag`, y validaciones `.optional()` + `matchedData()` en todos los controladores de actualización

Cada rama se creó a partir de `develop`, y una vez finalizado y probado el trabajo, se mergeó de vuelta a `develop`. Al finalizar todo, se hizo el merge final de `develop` hacia `main` para mantener ambas ramas sincronizadas.

## 🔐 Investigación adicional: uso de dotenv

### ¿Qué es dotenv?

dotenv es un paquete de Node.js que permite cargar variables de entorno desde un archivo `.env` hacia `process.env`. Su propósito principal es separar la configuración sensible o dependiente del entorno (como contraseñas de base de datos, puertos, claves de API) del código fuente, evitando así que esos datos queden expuestos en el repositorio.

### ¿Cómo se instala?

Se instala como una dependencia normal del proyecto mediante npm:

```
npm install dotenv
```

### ¿Cómo se configura?

Se crea un archivo `.env` en la raíz del proyecto, con las variables en formato CLAVE=valor:

```
DB_HOST=localhost
DB_NAME=tasks_users_db
DB_USER=root
DB_PASSWORD=
DB_PORT=3306
PORT=3000
```

Se agrega `.env` al archivo `.gitignore`, para que nunca se suba al repositorio (contiene datos sensibles).

Se crea un archivo `.env.example`, con el mismo formato pero sin los valores reales, para que cualquier persona que clone el proyecto sepa qué variables necesita configurar:

```
DB_HOST=
DB_NAME=
DB_USER=
DB_PASSWORD=
DB_PORT=
PORT=
```

### ¿Cómo se accede a las variables desde el código?

Se importa el paquete al inicio del archivo principal (app.js), antes que cualquier otro import que dependa de esas variables:

```javascript
import "dotenv/config";
```

Esto carga automáticamente las variables del archivo `.env` dentro de `process.env`, y quedan disponibles en cualquier parte del proyecto usando `process.env.NOMBRE_VARIABLE`.

### Ejemplo aplicado en este proyecto

Antes de usar dotenv, la conexión a la base de datos tenía los datos escritos directamente en el código (`src/config/database.js`):

```javascript
const sequelize = new Sequelize("tasks_users_db", "root", "", {
  host: "localhost",
  port: 3306,
  dialect: "mysql",
  logging: false,
});
```

Después de implementar dotenv, esos datos se reemplazaron por variables de entorno:

```javascript
import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    logging: false,
  },
);

export default sequelize;
```

De esta forma, la contraseña y demás datos de conexión ya no están visibles en el código ni se suben al repositorio, mejorando la seguridad del proyecto.

## 👤 Autor

Maximiliano Soria
Instituto Politécnico Formosa — Tecnicatura Superior en Desarrollo de Software Multiplataforma
GitHub: [@MaxiSoriaGit](https://github.com/MaxiSoriaGit)