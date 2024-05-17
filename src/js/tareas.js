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
        })

        document.querySelector('body').appendChild(modal);
    }

})();
