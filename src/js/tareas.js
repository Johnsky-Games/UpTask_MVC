// Init: si se requiere inicialización de la página o módulo (función init) se coloca aquí y se llama al final del archivo con init(); 
(function () {

    // Obtener las tareas del proyecto
    obtenerTareas();
    let tareas = [];

    //Boton para mostrar el modal de nueva tarea
    const btnNuevaTarea = document.querySelector('#agregar-tarea');
    btnNuevaTarea.addEventListener('click', mostrarFormulario);

    async function obtenerTareas() {
        try {
            const id = obtenerProyecto();
            const url = `/api/tareas?id=${id}`;
            const respuesta = await fetch(url);
            const resultado = await respuesta.json();
            tareas = resultado;
            mostrarTareas();

        } catch (error) {
            console.log('error')
        }
    }

    function mostrarTareas() {//Mostrar las tareas en la interfaz de usuario

        if (tareas.length === 0) { // Si no hay tareas en el proyecto mostrar mensaje de no tareas en el proyecto actual y retornar de la función
            const contenedorTareas = document.querySelector('#listado-tareas');

            const textoNoTareas = document.createElement('LI');
            textoNoTareas.textContent = 'No hay tareas en este proyecto';
            textoNoTareas.classList.add('no-tareas');
            contenedorTareas.appendChild(textoNoTareas); // Agregar el mensaje al contenedor de tareas en la interfaz de usuario
            return;
        }

        const estados = { // Dicciónario de estados de las tareas
            0: 'Pendiente',
            1: 'Completo'
        }

        tareas.forEach(tarea => { // Recorrer las tareas y mostrarlas en la interfaz
            //Crear el contenedor de la tarea
            const contenedorTarea = document.createElement('LI');
            //Agregar el id de la tarea al contenedor
            contenedorTarea.dataset.tareaId = tarea.id;
            contenedorTarea.classList.add('tarea');
            //Insertar el nombre de la tarea
            const nombreTarea = document.createElement('P');
            nombreTarea.textContent = tarea.nombre;
            //Insertar el nombre de la tarea
            const opcionesDiv = document.createElement('DIV');
            opcionesDiv.classList.add('opciones');

            //Botones de opciones
            const btnEstadoTarea = document.createElement('BUTTON');
            btnEstadoTarea.classList.add('estado-tarea');
            //Agregar el botón al contenedor de opciones de la tarea 
            btnEstadoTarea.classList.add(`${estados[tarea.estado].toLowerCase()}`);
            //Cambiar el texto del botón dependiendo del estado de la tarea
            btnEstadoTarea.textContent = estados[tarea.estado];
            //Agregar el id de la tarea al botón de estado de la tarea 
            btnEstadoTarea.dataset.estadoTarea = tarea.estado;
            //Agregar el evento de doble click al botón de estado de la tarea
            btnEstadoTarea.ondblclick = function () {
                cambiarEstadoTarea({ ...tarea });
            }

            //Botón de eliminar tarea
            const btnEliminarTarea = document.createElement('BUTTON');
            btnEliminarTarea.classList.add('eliminar-tarea');
            btnEliminarTarea.dataset.idTarea = tarea.id;
            btnEliminarTarea.textContent = 'Eliminar';

            opcionesDiv.appendChild(btnEstadoTarea);
            opcionesDiv.appendChild(btnEliminarTarea);

            contenedorTarea.appendChild(nombreTarea);
            contenedorTarea.appendChild(opcionesDiv);

            const listadoTareas = document.querySelector('#listado-tareas');
            listadoTareas.appendChild(contenedorTarea);
        });
    }

    function mostrarFormulario() {
        const modal = document.createElement('div');
        modal.classList.add('modal');
        modal.innerHTML = `
        <form class="formulario nueva-tarea">
            
        <legend>Añade una nueva tarea</legend>
            
            <div class="campo">
                <label>Tarea</label>
                <input type="text" name="tarea" placeholder="Añadir tarea al proyecto actual" id="tarea"> 
            </div>
            
            <div class="opciones">
                <input type="submit" class="submit-nueva-tarea" value="Añadir Tarea" />
                <button type="button" class="cerrar-modal">Cancelar</button>
            </div>

        </form>
        `;

        setTimeout(() => {
            const formulario = document.querySelector('.formulario');
            formulario.classList.add('animar');
        }, 0);

        //Cerrar el modal
        modal.addEventListener('click', (e) => {
            e.preventDefault();
            if (e.target.classList.contains('cerrar-modal')) {
                const formulario = document.querySelector('.formulario');
                formulario.classList.add('cerrar');
                setTimeout(() => {
                    modal.remove();
                }, 500);
            }

            if (e.target.classList.contains('submit-nueva-tarea')) {
                submitFormularioNuevaTarea();
            }
        })

        document.querySelector('.dashboard').appendChild(modal);
    }

    function submitFormularioNuevaTarea() {
        const tarea = document.querySelector('#tarea').value.trim();

        if (tarea === '') {
            //Mostrar slerta de error
            mostrarAlerta('El nombre de la tarea es obligatorio', 'error', document.querySelector('.formulario legend'));
            return;
        }
        agregarTarea(tarea);
    }

    //Muestra un mensaje en la interfaz
    function mostrarAlerta(mensaje, tipo, referencia) {
        limpiarTareas();
        //Previene la creación de alertas duplicadas
        const alertaPrevia = document.querySelector('.alerta');

        if (alertaPrevia) {
            alertaPrevia.remove();
        }

        const alerta = document.createElement('div');
        alerta.classList.add('alerta', tipo);
        alerta.textContent = mensaje;
        referencia.parentElement.insertBefore(alerta, referencia.nextElementSibling);

        //Eliminar la alerta después de 3 segundos
        setTimeout(() => {
            alerta.remove();
        }, 5000);
    }


    async function agregarTarea(tarea) {
        //Consultar el servidor para agregar la tarea a la base de datos
        //Construir la petición
        const datos = new FormData();
        datos.append('nombre', tarea);
        datos.append('proyectoId', obtenerProyecto());

        try {
            const url = 'http://localhost:3000/api/tarea';
            const respuesta = await fetch(url, {
                method: 'POST',
                body: datos
            });

            const resultado = await respuesta.json();

            //Mostrar alerta de error
            mostrarAlerta(resultado.mensaje, resultado.tipo, document.querySelector('.formulario legend'));

            if (resultado.tipo === 'exito') {
                const modal = document.querySelector('.modal');
                setTimeout(() => {
                    modal.remove();
                }, 3000);

                //Agregar el objeto de tareas al global de tareas para virtual DOM
                const tareaObj = {
                    id: String(resultado.id),
                    nombre: tarea,
                    estado: "0",
                    proyectoId: resultado.proyectoId
                };

                tareas = [...tareas, tareaObj];
                mostrarTareas();
            }

        } catch (error) {
            console.log('error')
        }
    }

    function cambiarEstadoTarea(tarea) {
        const nuevoEstado = tarea.estado === "1" ? "0" : "1";
        tarea.estado = nuevoEstado;
        actualizarTarea(tarea);
    }

    async function actualizarTarea(tarea) {
        const { estado, id, nombre, proyectoId } = tarea;
        const datos = new FormData();
        datos.append('id', id);
        datos.append('nombre', nombre);
        datos.append('estado', estado);
        datos.append('proyectoId', obtenerProyecto());


        // for (let valor of datos.values()) { // Iterar sobre los valores del FormData para verificar que los datos se estén enviando correctamente
        //     console.log(valor);
        // }

        try {
            const url = 'http://localhost:3000/api/tarea/actualizar';
            const respuesta = await fetch(url, {
                method: 'POST',
                body: datos
            });

            const resultado = await respuesta.json();

            if (resultado.respuesta.tipo === 'exito') {
                mostrarAlerta(
                    resultado.respuesta.mensaje,
                    resultado.respuesta.tipo,
                    document.querySelector('.contenedor-nueva-tarea')
                );
                tareas = tareas.map(tareaMemoria => {
                    if (tareaMemoria.id === id) {
                        tareaMemoria.estado = tarea.estado;
                    }
                    return tareaMemoria;
                });
                mostrarTareas();
            }

        } catch (error) {
            console.log('error')
        }

    }

    function obtenerProyecto() {
        const proyectoParams = new URLSearchParams(window.location.search);
        const proyecto = Object.fromEntries(proyectoParams.entries());
        return proyecto.id;
    }

    function limpiarTareas() {
        const listadoTareas = document.querySelector('#listado-tareas');

        //Eliminar las tareas del listado de tareas en la interfaz de usuario para evitar duplicados de tareas
        while (listadoTareas.firstChild) {
            listadoTareas.removeChild(listadoTareas.firstChild);
        }
    }

})();
