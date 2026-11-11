const API_URL = 'http://localhost:3000/api/tareas';

const listaTareas = document.getElementById('listaTareas');
const tareaInput = document.getElementById('tareaInput');
const addBtn = document.getElementById('addBtn');

// Cargar tareas al iniciar
async function obtenerTareas() {
  const res = await fetch(API_URL);
  const tareas = await res.json();
  
  listaTareas.innerHTML = '';
  tareas.forEach(tarea => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${tarea.texto}</span>
      <button class="btn-delete" onclick="eliminarTarea(${tarea.id})">x</button>
    `;
    listaTareas.appendChild(li);
  });
}

// Agregar nueva tarea
addBtn.addEventListener('click', async () => {
  const texto = tareaInput.value.trim();
  if (!texto) return;

  await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ texto })
  });

  tareaInput.value = '';
  obtenerTareas();
});

// Eliminar tarea
async function eliminarTarea(id) {
  await fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  });
  obtenerTareas();
}

// Ejecución inicial
obtenerTareas();