const express = require('express');
const router = express.Router();
const { Post, User, Tag } = require('../models');

router.get('/', async (req, res) => {
  const where = req.query.userId ? { UserId: req.query.userId } : {};
  const posts = await Post.findAll({ where, include: [User, Tag] });
  res.json(posts);
});

router.get('/:id', async (req, res) => {
  const post = await Post.findByPk(req.params.id, { include: [User, Tag] });
  post ? res.json(post) : res.status(404).json({ error: 'Post no encontrado' });
});

router.post('/', async (req, res) => {
  const { description, userId, tagIds } = req.body;
  if (!description || !userId) return res.status(400).json({ error: 'Faltan datos' });
  try {
    const nuevo = await Post.create({ description, UserId: userId });
    if (tagIds && tagIds.length > 0) await nuevo.setTags(tagIds);
    const creado = await Post.findByPk(nuevo.id, { include: [Tag] });
    res.status(201).json(creado);
  } catch (e) {
    res.status(500).json({ error: 'Error al crear post', details: e.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);

    if (!post) {
      return res.status(404).json({ error: 'Post no encontrado' });
    }

    // Opcional: Si hay relaciones dependientes (como PostImage o la relación N:M con Tag),
    // es buena práctica considerar si deben borrarse automáticamente (CASCADE en la BD)
    // o si necesitas borrarlas manualmente antes de borrar el Post.

    // Si estás usando Sequelize y tienes una asociación con `PostImage` con `onDelete: 'CASCADE'`
    // en la definición del modelo, las imágenes asociadas se borrarán automáticamente.
    // Lo mismo aplica para la tabla intermedia de la relación con `Tag`.

    await post.destroy();
    
    // Puedes devolver una respuesta de éxito sin contenido (204 No Content) o un mensaje de éxito.
    res.status(204).send(); 
    // Si prefieres un mensaje de éxito con el ID del post borrado:
    // res.json({ message: `Post con ID ${req.params.id} borrado con éxito` });

  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al borrar el post', details: e.message });
  }
});

module.exports = router;