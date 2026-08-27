import User from '../models/User.js';
import Task from '../models/Task.js'; 

// Crear usuario 
export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || name.trim() === '' || name.length > 100) {
      return res.status(400).json({ message: 'El nombre es obligatorio y debe tener máximo 100 caracteres' });
    }
    if (!email || email.trim() === '' || email.length > 100) {
      return res.status(400).json({ message: 'El email es obligatorio y debe tener máximo 100 caracteres' });
    }
    if (!password || password.trim() === '' || password.length > 100) {
      return res.status(400).json({ message: 'La contraseña es obligatoria y debe tener máximo 100 caracteres' });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Ya existe un usuario con ese email' });
    }

    const newUser = await User.create({ name, email, password });
    return res.status(201).json({ message: 'Usuario creado con éxito', data: newUser });
  } catch (error) {
    return res.status(500).json({ message: 'Error al crear el usuario', error: error.message });
  }
};

// Obtener todos los usuarios
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      include: { model: Task } 
    });
    return res.status(200).json({ data: users });
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener los usuarios', error: error.message });
  }
};

// Obtener usuario por ID
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id, {
      include: { model: Task } 
    });

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    return res.status(200).json({ data: user });
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener el usuario', error: error.message });
  }
};

// Actualizar usuario 
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    if (name !== undefined && (name.trim() === '' || name.length > 100)) {
      return res.status(400).json({ message: 'El nombre debe ser válido y de máximo 100 caracteres' });
    }
    if (email !== undefined && (email.trim() === '' || email.length > 100)) {
      return res.status(400).json({ message: 'El email debe ser válido y de máximo 100 caracteres' });
    }
    if (password !== undefined && (password.trim() === '' || password.length > 100)) {
      return res.status(400).json({ message: 'La contraseña debe ser válida y de máximo 100 caracteres' });
    }

    if (email && email !== user.email) {
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: 'Ya existe un usuario con ese email' });
      }
    }

    await user.update({ name, email, password });
    return res.status(200).json({ message: 'Usuario actualizado con éxito', data: user });
  } catch (error) {
    return res.status(500).json({ message: 'Error al actualizar el usuario', error: error.message });
  }
};

// Eliminar usuario 
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    await user.destroy();
    return res.status(200).json({ message: 'Usuario eliminado con éxito' });
  } catch (error) {
    return res.status(500).json({ message: 'Error al eliminar el usuario', error: error.message });
  }
};