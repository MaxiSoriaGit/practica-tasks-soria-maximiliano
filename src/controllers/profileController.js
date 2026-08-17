import { Profile, User } from "../models/index.js";

export const createProfile = async (req, res) => {
  try {
    const { bio, avatarUrl, userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "El userId es obligatorio" });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "El usuario indicado no existe" });
    }

    const existing = await Profile.findOne({ where: { userId } });
    if (existing) {
      return res.status(400).json({ message: "Este usuario ya tiene un perfil creado" });
    }

    const newProfile = await Profile.create({ bio, avatarUrl, userId });
    res.status(201).json({ message: "Perfil creado correctamente", profile: newProfile });
  } catch (error) {
    res.status(500).json({ message: "Error al crear el perfil", error: error.message });
  }
};

export const getProfiles = async (req, res) => {
  try {
    const profiles = await Profile.findAll({
      include: { model: User, attributes: ["id", "name", "email"] },
    });
    res.status(200).json(profiles);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los perfiles", error: error.message });
  }
};