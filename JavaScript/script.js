let tareas = [];                                                    // Array para almacenar las tareas

function renderizarTareas() {                                       // Función para renderizar la lista de tareas
  const listaTareas = document.getElementById('lista-tareas');
  listaTareas.innerHTML = '';
  tareas.forEach((tarea, index) => {                                // Recorremos el array de tareas y creamos los elementos de la lista
    const li = document.createElement('li');
    li.className = 'list-group-item';
    li.innerHTML = `
      <input type="checkbox" ${tarea.completado ? 'checked' : ''} onclick="marcarCompletado(${index})">
      <span>${tarea.nombre}</span>
      <button class="btn btn-danger btn-sm float-end" onclick="eliminarTarea(${index})">Eliminar</button>
    `;
    listaTareas.appendChild(li);
  });
}

function cargarTareasDesdeJSON() {                                  // Función para cargar tareas desde un archivo JSON local
  fetch('tareas.json')
    .then(response => response.json())
    .then(data => {
      tareas = data;                                                // Asignamos los datos al array de tareas
      renderizarTareas();                                           // Volvemos a renderizar la lista de tareas con los datos cargados
    })
    .catch(error => {
      console.error('Error al cargar las tareas:', error);
    });
}

function guardarTareasEnJSON() {                                    // Función para guardar tareas en un archivo JSON local
  const jsonTareas = JSON.stringify(tareas);
  const enlaceDescarga = document.createElement('a');               // Crear un enlace temporal para descargar el archivo JSON
  enlaceDescarga.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(jsonTareas);
  enlaceDescarga.download = 'tareas.json';
  enlaceDescarga.style.display = 'none';
  document.body.appendChild(enlaceDescarga);
  enlaceDescarga.click();
  document.body.removeChild(enlaceDescarga);
}

function agregarTarea() {                                           // Función para agregar una nueva tarea
  const nombre = prompt('Ingrese el nombre de la tarea:');
  if (nombre) {
    const nuevaTarea = { nombre, completado: false };
    tareas.push(nuevaTarea);
    renderizarTareas();
  }
}

function marcarCompletado(index) {                                  // Función para marcar una tarea como completada
  tareas[index].completado = !tareas[index].completado;
  renderizarTareas();
}

function eliminarTarea(index) {                                     // Función para eliminar una tarea
  tareas.splice(index, 1);
  renderizarTareas();
}

document.getElementById('btn-agregar').addEventListener('click', agregarTarea);         //  botón de agregar tarea
document.getElementById('btn-guardar').addEventListener('click', guardarTareasEnJSON);  // el botón de guardar tareas
cargarTareasDesdeJSON();                                                                // Llamamos a la función para cargar las tareas al cargar la página
