import { Tag, Task } from "../models/index.js";

export const createTag = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "El nombre de la etiqueta es obligatorio" });
    }

    const existing = await Tag.findOne({ where: { name } });
    if (existing) {
      return res.status(400).json({ message: "Ya existe una etiqueta con ese nombre" });
    }

    const newTag = await Tag.create({ name });
    res.status(201).json({ message: "Etiqueta creada correctamente", tag: newTag });
  } catch (error) {
    res.status(500).json({ message: "Error al crear la etiqueta", error: error.message });
  }
};

export const getTags = async (req, res) => {
  try {
    const tags = await Tag.findAll({
      include: { model: Task, attributes: ["id", "title"] },
    });
    res.status(200).json(tags);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las etiquetas", error: error.message });
  }
};

// Obtener tag por ID
export const getTagById = async (req, res) => {
  try {
    const { id } = req.params;
    const tag = await Tag.findByPk(id);
    if (!tag) {
      return res.status(404).json({ message: "Etiqueta no encontrada" });
    }
    return res.status(200).json(tag);
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener la etiqueta", error: error.message });
  }
};

// Actualizar tag
export const updateTag = async (req, res) => {
  try {
    const { id } = req.params;
    const tag = await Tag.findByPk(id);
    if (!tag) {
      return res.status(404).json({ message: "Etiqueta no encontrada" });
    }
    await tag.update(req.body);
    return res.status(200).json({ message: "Etiqueta actualizada", tag });
  } catch (error) {
    return res.status(500).json({ message: "Error al actualizar la etiqueta", error: error.message });
  }
};

// Eliminar tag
export const deleteTag = async (req, res) => {
  try {
    const { id } = req.params;
    const tag = await Tag.findByPk(id);
    if (!tag) {
      return res.status(404).json({ message: "Etiqueta no encontrada" });
    }
    await tag.destroy();
    return res.status(200).json({ message: "Etiqueta eliminada correctamente" });
  } catch (error) {
    return res.status(500).json({ message: "Error al eliminar la etiqueta", error: error.message });
  }
};