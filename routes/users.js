const express = require('express');
const router = express.Router();
const { User, Post } = require('../models');

router.get('/', async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

router.get('/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id);
  user ? res.json(user) : res.status(404).json({ error: 'Usuario no encontrado' });
});

router.post('/', async (req, res) => {
  const { nickName, email } = req.body;
  if (!nickName || !email) return res.status(400).json({ error: 'Faltan datos' });
  try {
    const nuevo = await User.create({ nickName, email });
    res.status(201).json(nuevo);
  } catch (e) {
    res.status(500).json({ error: 'No se pudo crear el usuario', details: e.message });
  }
});


// GET /users/:id/posts → obtiene los posts de un usuario
router.get("/:id/posts", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id, {
      include: [{ model: Post, as: "Posts" }],
    });

    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

    res.json(user.Posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los posts del usuario" });
  }
});


module.exports = router;