import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('tasks_users_db', 'root', '', {
  host: 'localhost',
  port: 3306,
  dialect: 'mysql',
  logging: false
});

export default sequelize;