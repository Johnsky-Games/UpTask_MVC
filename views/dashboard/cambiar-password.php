<?php include_once __DIR__ . '/header-dashboard.php'; ?>
<div class="contenedor-sm">
    <?php include_once __DIR__ . '/../templates/alertas.php' ?>

    <a href="/perfil" class="enlace">Volver a Perfil</a>

    <form class="formulario" method="POST" action="/perfil">
        <div class="campo">
            <label for="nombre">Password Actual</label>
            <input type="password" id="password_actual" name="password_actual" placeholder="Tu Password Actual">
        </div>

        <div class="campo">
            <label for="email">Password Nuevo</label>
            <input type="password" id="password_nuevo" name="password_nuevo" placeholder="Tu Password Nuevo">
        </div>

        <input type="submit" value="Guardar Cambios">
    </form>
</div>
<?php include_once __DIR__ . '/footer-dashboard.php'; ?>