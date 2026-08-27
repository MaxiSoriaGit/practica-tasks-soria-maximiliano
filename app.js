import 'dotenv/config';
import express from 'express';
import sequelize from './src/config/database.js';
import userRoutes from './src/routes/userRoutes.js';
import taskRoutes from './src/routes/taskRoutes.js';
import profileRoutes from "./src/routes/profileRoutes.js";
import tagRoutes from "./src/routes/tagRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/users', userRoutes);
app.use('/tasks', taskRoutes);
app.use("/profiles", profileRoutes);
app.use("/tags", tagRoutes);

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida correctamente.');

    await sequelize.sync({ alter: true });
    console.log('Modelos sincronizados con la base de datos.');

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error('Error al conectar con la base de datos:', error);
  }
};

startServer();