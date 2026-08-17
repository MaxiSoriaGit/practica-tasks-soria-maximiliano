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