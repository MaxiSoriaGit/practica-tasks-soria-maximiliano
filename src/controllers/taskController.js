import Task from '../models/Task.js';

// Crear tarea
export const createTask = async (req, res) => {
  try {
    const { title, description, isComplete } = req.body;

    if (!title || title.trim() === '' || title.length > 100) {
      return res.status(400).json({ message: 'El título es obligatorio y debe tener máximo 100 caracteres' });
    }
    if (!description || description.trim() === '' || description.length > 100) {
      return res.status(400).json({ message: 'La descripción es obligatoria y debe tener máximo 100 caracteres' });
    }
    if (isComplete !== undefined && typeof isComplete !== 'boolean') {
      return res.status(400).json({ message: 'El estado de la tarea debe ser un valor booleano' });
    }

    const existingTask = await Task.findOne({ where: { title } });
    if (existingTask) {
      return res.status(400).json({ message: 'Ya existe una tarea con ese título' });
    }

    const newTask = await Task.create({ title, description, isComplete });
    return res.status(201).json({ message: 'Tarea creada con éxito', data: newTask });
  } catch (error) {
    return res.status(500).json({ message: 'Error al crear la tarea', error: error.message });
  }
};

// Obtener todas las tareas
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll();
    return res.status(200).json({ data: tasks });
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener las tareas', error: error.message });
  }
};

// Obtener tarea por ID
export const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByPk(id);

    if (!task) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }

    return res.status(200).json({ data: task });
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener la tarea', error: error.message });
  }
};

// Actualizar tarea
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, isComplete } = req.body;

    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }

    if (title !== undefined && (title.trim() === '' || title.length > 100)) {
      return res.status(400).json({ message: 'El título debe ser válido y de máximo 100 caracteres' });
    }
    if (description !== undefined && (description.trim() === '' || description.length > 100)) {
      return res.status(400).json({ message: 'La descripción debe ser válida y de máximo 100 caracteres' });
    }
    if (isComplete !== undefined && typeof isComplete !== 'boolean') {
      return res.status(400).json({ message: 'El estado de la tarea debe ser un valor booleano' });
    }

    if (title && title !== task.title) {
      const existingTask = await Task.findOne({ where: { title } });
      if (existingTask) {
        return res.status(400).json({ message: 'Ya existe una tarea con ese título' });
      }
    }

    await task.update({ title, description, isComplete });
    return res.status(200).json({ message: 'Tarea actualizada con éxito', data: task });
  } catch (error) {
    return res.status(500).json({ message: 'Error al actualizar la tarea', error: error.message });
  }
};

// Eliminar tarea
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByPk(id);

    if (!task) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }

    await task.destroy();
    return res.status(200).json({ message: 'Tarea eliminada con éxito' });
  } catch (error) {
    return res.status(500).json({ message: 'Error al eliminar la tarea', error: error.message });
  }
};