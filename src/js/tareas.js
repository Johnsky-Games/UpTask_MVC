// Init: si se requiere inicialización de la página o módulo (función init) se coloca aquí y se llama al final del archivo con init(); 
(function () {
    //Boton para mostrar el modal de nueva tarea
    const btnNuevaTarea = document.querySelector('#agregar-tarea');
    btnNuevaTarea.addEventListener('click', mostrarFormulario);

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

})();
