# Práctica CRUD de Tareas y Usuarios con Backend usando Sequelize

Proyecto backend desarrollado para la materia de Instituto Politécnico Formosa (IPF). Consiste en una API REST que permite gestionar **usuarios** y **tareas**, implementando operaciones CRUD completas (Crear, Leer, Actualizar, Eliminar) con Node.js, Express, MySQL y Sequelize ORM.

## 📋 Objetivo

Desarrollar una aplicación backend que permita realizar operaciones CRUD para gestionar tareas y usuarios, utilizando Node.js, Express, MySQL y Sequelize ORM, aplicando buenas prácticas de control de versiones con Git y GitHub.

## 🛠️ Tecnologías utilizadas

- **Node.js** — entorno de ejecución de JavaScript en el servidor
- **Express** — framework para manejar rutas y peticiones HTTP
- **MySQL** — sistema de base de datos relacional
- **Sequelize** — ORM para conectar y trabajar con la base de datos desde JavaScript
- **dotenv** — manejo de variables de entorno
- **nodemon** — reinicio automático del servidor en desarrollo

## 📁 Estructura del proyecto

practica-tasks-soria-maximiliano/
├── src/
│ ├── config/
│ │ └── database.js # Conexión a MySQL con Sequelize
│ ├── models/
│ │ ├── User.js # Modelo de Usuario
│ │ └── Task.js # Modelo de Tarea
│ ├── controllers/
│ │ ├── userController.js # Lógica CRUD de usuarios
│ │ └── taskController.js # Lógica CRUD de tareas
│ └── routes/
│ ├── userRoutes.js # Rutas de usuarios
│ └── taskRoutes.js # Rutas de tareas
├── app.js # Punto de entrada de la aplicación
├── .env # Variables de entorno (no se sube)
├── .env.example # Ejemplo de variables necesarias
├── .gitignore
└── package.json

## ⚙️ Instalación y configuración

### 1. Clonar el repositorio

```bash
git clone https://github.com/MaxiSoriaGit/practica-tasks-soria-maximiliano.git
cd practica-tasks-soria-maximiliano
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Crear la base de datos

Con MySQL corriendo (WampServer, XAMPP, etc.), crear la base de datos:

```sql
CREATE DATABASE tasks_users_db;
```

Las tablas se crean automáticamente al iniciar el proyecto, gracias a `sequelize.sync()`.

### 4. Configurar variables de entorno

Crear un archivo `.env` en la raíz del proyecto, copiando el formato de `.env.example`:

DB_HOST=localhost
DB_NAME=tasks_users_db
DB_USER=root
DB_PASSWORD=
DB_PORT=3306
PORT=3000

### 5. Iniciar el servidor

```bash
npm run dev
```

El servidor va a correr en `http://localhost:3000`.

## 📡 Endpoints de la API

### Usuarios

| Método | Ruta             | Descripción                |
| ------ | ---------------- | -------------------------- |
| POST   | `/api/users`     | Crear un nuevo usuario     |
| GET    | `/api/users`     | Obtener todos los usuarios |
| GET    | `/api/users/:id` | Obtener un usuario por ID  |
| PUT    | `/api/users/:id` | Actualizar un usuario      |
| DELETE | `/api/users/:id` | Eliminar un usuario        |

**Campos del modelo User:**

- `name` (string, obligatorio, máx. 100 caracteres)
- `email` (string, obligatorio, único, máx. 100 caracteres)
- `password` (string, obligatorio, máx. 100 caracteres)

### Tareas

| Método | Ruta             | Descripción              |
| ------ | ---------------- | ------------------------ |
| POST   | `/api/tasks`     | Crear una nueva tarea    |
| GET    | `/api/tasks`     | Obtener todas las tareas |
| GET    | `/api/tasks/:id` | Obtener una tarea por ID |
| PUT    | `/api/tasks/:id` | Actualizar una tarea     |
| DELETE | `/api/tasks/:id` | Eliminar una tarea       |

**Campos del modelo Task:**

- `title` (string, obligatorio, único, máx. 100 caracteres)
- `description` (string, obligatorio, máx. 100 caracteres)
- `isComplete` (booleano, por defecto `false`)

## ✅ Validaciones implementadas

- Verificación de campos obligatorios y longitud máxima
- Verificación de unicidad (email de usuario, título de tarea) antes de crear o editar
- Verificación de existencia previa antes de editar o eliminar un recurso
- Respuestas con códigos HTTP apropiados: `200`, `201`, `400`, `404`, `500`
- Manejo de errores con `try-catch` en todos los controladores

## 🌿 Flujo de trabajo con Git

El proyecto se versionó siguiendo un flujo de ramas:

- **`main`**: rama principal, contiene la versión final del proyecto
- **`develop`**: rama de integración donde se consolidó el trabajo de las ramas feature
- **`feature/endpoints`**: desarrollo de modelos, controladores y rutas de la API
- **`feature/env-config`**: implementación de variables de entorno con dotenv

Cada rama feature se creó a partir de `develop`, y una vez finalizado y probado el trabajo, se mergeó de vuelta a `develop`. Al finalizar todo, se hizo el merge final de `develop` hacia `main`.

## 🔐 Investigación adicional: uso de dotenv

### ¿Qué es dotenv?

`dotenv` es un paquete de Node.js que permite cargar variables de entorno desde un archivo `.env` hacia `process.env`. Su propósito principal es separar la configuración sensible o dependiente del entorno (como contraseñas de base de datos, puertos, claves de API) del código fuente, evitando así que esos datos queden expuestos en el repositorio.

### ¿Cómo se instala?

Se instala como una dependencia normal del proyecto mediante npm:

```bash
npm install dotenv
```

### ¿Cómo se configura?

1. Se crea un archivo `.env` en la raíz del proyecto, con las variables en formato `CLAVE=valor`:

DB_HOST=localhost
DB_NAME=tasks_users_db
DB_USER=root
DB_PASSWORD=
DB_PORT=3306
PORT=3000

2. Se agrega `.env` al archivo `.gitignore`, para que nunca se suba al repositorio (contiene datos sensibles).

3. Se crea un archivo `.env.example`, con el mismo formato pero sin los valores reales, para que cualquier persona que clone el proyecto sepa qué variables necesita configurar:

DB_HOST=
DB_NAME=
DB_USER=
DB_PASSWORD=
DB_PORT=
PORT=

### ¿Cómo se accede a las variables desde el código?

Se importa el paquete al inicio del archivo principal (`app.js`), antes que cualquier otro import que dependa de esas variables:

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

**Maximiliano Soria**
Instituto Politécnico Formosa — Tecnicatura Superior en Desarrollo de Software Multiplataforma
GitHub: [@MaxiSoriaGit](https://github.com/MaxiSoriaGit)
