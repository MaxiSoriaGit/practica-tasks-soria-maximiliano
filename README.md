# Práctica CRUD de Tareas y Usuarios con Backend usando Sequelize

Proyecto backend desarrollado para la materia de Instituto Politécnico Formosa (IPF). Consiste en una API REST que permite gestionar usuarios y tareas, implementando operaciones CRUD completas (Crear, Leer, Actualizar, Eliminar) con Node.js, Express, MySQL y Sequelize ORM.

## 📋 Objetivo

Desarrollar una aplicación backend que permita realizar operaciones CRUD para gestionar tareas y usuarios, utilizando Node.js, Express, MySQL y Sequelize ORM, aplicando buenas prácticas de control de versiones con Git y GitHub.

En esta segunda etapa, se ampliaron los modelos existentes definiendo relaciones entre ellos con Sequelize, y se incorporaron dos nuevos modelos (Profile y Tag) con relaciones 1 a 1 y muchos a muchos respectivamente.

## 🛠️ Tecnologías utilizadas

- Node.js — entorno de ejecución de JavaScript en el servidor
- Express — framework para manejar rutas y peticiones HTTP
- MySQL — sistema de base de datos relacional
- Sequelize — ORM para conectar y trabajar con la base de datos desde JavaScript
- dotenv — manejo de variables de entorno
- nodemon — reinicio automático del servidor en desarrollo

## 📁 Estructura del proyecto

```
practica-tasks-soria-maximiliano/
├── src/
│   ├── config/
│   │   └── database.js         # Conexión a MySQL con Sequelize
│   ├── models/
│   │   ├── index.js            # Define todas las relaciones entre modelos
│   │   ├── User.js             # Modelo de Usuario
│   │   ├── Task.js             # Modelo de Tarea
│   │   ├── Profile.js          # Modelo de Perfil (relación 1 a 1 con User)
│   │   └── Tag.js              # Modelo de Etiqueta (relación N a N con Task)
│   ├── controllers/
│   │   ├── userController.js       # Lógica CRUD de usuarios
│   │   ├── taskController.js       # Lógica CRUD de tareas
│   │   ├── profileController.js    # Lógica de perfiles
│   │   └── tagController.js        # Lógica de etiquetas
│   └── routes/
│       ├── userRoutes.js
│       ├── taskRoutes.js
│       ├── profileRoutes.js
│       └── tagRoutes.js
├── app.js                      # Punto de entrada de la aplicación
├── .env                        # Variables de entorno (no se sube)
├── .env.example                # Ejemplo de variables necesarias
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

### 3. Crear la base de datos

Con MySQL corriendo (WampServer, XAMPP, etc.), crear la base de datos:

```
CREATE DATABASE tasks_users_db;
```

Las tablas se crean automáticamente al iniciar el proyecto, gracias a `sequelize.sync({ alter: true })`.

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

| Método | Ruta           | Descripción                               |
| ------ | -------------- | ----------------------------------------- |
| POST   | /api/users     | Crear un nuevo usuario                    |
| GET    | /api/users     | Obtener todos los usuarios con sus tareas |
| GET    | /api/users/:id | Obtener un usuario por ID con sus tareas  |
| PUT    | /api/users/:id | Actualizar un usuario                     |
| DELETE | /api/users/:id | Eliminar un usuario                       |

Campos del modelo User:

- `name` (string, obligatorio, máx. 100 caracteres)
- `email` (string, obligatorio, único, máx. 100 caracteres)
- `password` (string, obligatorio, máx. 100 caracteres)

### Tareas

| Método | Ruta                | Descripción                                          |
| ------ | ------------------- | ---------------------------------------------------- |
| POST   | /api/tasks          | Crear una nueva tarea asociada a un usuario          |
| GET    | /api/tasks          | Obtener todas las tareas con el usuario que las creó |
| GET    | /api/tasks/:id      | Obtener una tarea por ID con el usuario que la creó  |
| PUT    | /api/tasks/:id      | Actualizar una tarea                                 |
| DELETE | /api/tasks/:id      | Eliminar una tarea                                   |
| POST   | /api/tasks/:id/tags | Asociar una etiqueta existente a una tarea existente |

Campos del modelo Task:

- `title` (string, obligatorio, único, máx. 100 caracteres)
- `description` (string, obligatorio, máx. 100 caracteres)
- `isComplete` (booleano, por defecto false)
- `userId` (integer, obligatorio — referencia al usuario dueño de la tarea)

### Perfiles

| Método | Ruta          | Descripción                                          |
| ------ | ------------- | ---------------------------------------------------- |
| POST   | /api/profiles | Crear un perfil asociado a un usuario                |
| GET    | /api/profiles | Obtener todos los perfiles con los datos del usuario |

Campos del modelo Profile:

- `bio` (string, opcional)
- `avatarUrl` (string, opcional)
- `userId` (integer, obligatorio, único — garantiza la relación 1 a 1)

### Etiquetas

| Método | Ruta      | Descripción                                          |
| ------ | --------- | ---------------------------------------------------- |
| POST   | /api/tags | Crear una nueva etiqueta                             |
| GET    | /api/tags | Obtener todas las etiquetas con las tareas asociadas |

Campos del modelo Tag:

- `name` (string, obligatorio, único)

## ✅ Validaciones implementadas

- Verificación de campos obligatorios y longitud máxima
- Verificación de unicidad (email de usuario, título de tarea, nombre de etiqueta) antes de crear o editar
- Verificación de existencia previa antes de editar o eliminar un recurso
- No se pueden crear tareas sin especificar un usuario válido
- No se pueden crear dos perfiles para el mismo usuario (relación 1 a 1)
- Respuestas con códigos HTTP apropiados: 200, 201, 400, 404, 500
- Manejo de errores con try-catch en todos los controladores

## 🌿 Flujo de trabajo con Git

El proyecto se versionó siguiendo un flujo de ramas:

- **main**: rama principal, contiene la versión final del proyecto
- **develop**: rama de integración donde se consolidó el trabajo de las ramas feature
- **feature/endpoints**: desarrollo de modelos, controladores y rutas de la API
- **feature/env-config**: implementación de variables de entorno con dotenv

Cada rama feature se creó a partir de develop, y una vez finalizado y probado el trabajo, se mergeó de vuelta a develop. Al finalizar todo, se hizo el merge final de develop hacia main.

Para esta segunda entrega (relaciones con Sequelize), se creó una nueva rama:

- **relaciones**: creada a partir de develop, donde se implementaron las relaciones entre modelos, los nuevos modelos (Profile y Tag) y el refactor de los controladores existentes.

Al finalizar el trabajo, se hizo merge de relaciones hacia develop, y luego de develop hacia main, dejando ambas ramas sincronizadas.

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
