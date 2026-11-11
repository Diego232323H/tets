const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors()); // Permite peticiones desde el frontend
app.use(express.json()); // Permite procesar datos JSON en el body

// "Base de datos" en memoria
let tareas = [
  { id: 1, texto: 'Aprender Node.js' },
  { id: 2, texto: 'Conectar Frontend y Backend' }
];

// RUTAS (API REST)

// 1. Obtener todas las tareas (GET)
app.get('/api/tareas', (req, res) => {
  res.json(tareas);
});

// 2. Agregar una nueva tarea (POST)
app.post('/api/tareas', (req, res) => {
  const { texto } = req.body;
  if (!texto) {
    return res.status(400).json({ error: 'El texto es obligatorio' });
  }

  const nuevaTarea = {
    id: Date.now(),
    texto
  };

  tareas.push(nuevaTarea);
  res.status(201).json(nuevaTarea);
});

// 3. Eliminar una tarea (DELETE)
app.delete('/api/tareas/:id', (req, res) => {
  const id = Number(req.params.id);
  tareas = tareas.filter(t => t.id !== id);
  res.json({ mensaje: 'Tarea eliminada correctamente' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});