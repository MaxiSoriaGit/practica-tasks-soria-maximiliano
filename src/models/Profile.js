import { DataTypes } from "sequelize";
import sequelize from '../config/database.js';

const Profile = sequelize.define("Profile", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  bio: {
    type: DataTypes.STRING,
  },
  avatarUrl: {
    type: DataTypes.STRING,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true, // clave: fuerza que sea 1 a 1 y no 1 a N
  },
});

export default Profile;