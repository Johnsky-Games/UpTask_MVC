<?php

namespace Controllers;

use MVC\Router;
use Model\Usuario;
use Model\Proyecto;

class DashboardController
{
    //Endpoint para el dashboard de los usuarios autenticados 
    public static function index(Router $router)
    {
        session_start();

        isAuth(); // Si no está autenticado, lo redirige al login

        $id = $_SESSION['id'];

        $proyectos = Proyecto::belongsTo('propietarioId', $id);

        $router->render('dashboard/index', [
            'titulo' => 'Proyectos',
            'proyectos' => $proyectos
        ]);
    }

    public static function crear_proyecto(Router $router)
    {
        session_start();

        isAuth(); // Si no está autenticado, lo redirige al login

        $alertas = [];

        if ($_SERVER['REQUEST_METHOD'] === 'POST') {

            $proyecto = new Proyecto($_POST);
            //Validación
            $alertas = $proyecto->validarProyecto();

            if (empty($alertas)) {
                //Generar URL unica
                $proyecto->url = md5(uniqid(rand()));
                //Almacenar el creador del proyecto
                $proyecto->propietarioId = $_SESSION['id'];
                //Guardar el proyecto en la base de datos
                $proyecto->guardar();
                //Redireccionar
                header('Location: /proyecto?id=' . $proyecto->url);

            }
        }

        $router->render('dashboard/crear-proyecto', [
            'titulo' => 'Nuevo Proyecto',
            'alertas' => $alertas
        ]);
    }

    public static function proyecto(Router $router)
    {
        session_start();
        isAuth(); // Si no está autenticado, lo redirige al login

        $token = $_GET['id'] ?? null;

        if (!$token)
            header('Location: /dashboard');

        //Revisar que la persona que intenta acceder al proyecto sea el propietario
        $proyecto = Proyecto::where('url', $token);
        if ($proyecto->propietarioId !== $_SESSION['id']) {
            header('Location: /dashboard');
        }

        $router->render('dashboard/proyecto', [
            'titulo' => $proyecto->proyecto
        ]);
    }

    public static function perfil(Router $router)
    {
        session_start();
        isAuth(); // Si no está autenticado, lo redirige al login

        $alertas = [];
        $usuario = Usuario::find($_SESSION['id']);

        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $usuario->sincronizar($_POST);

            $alertas = $usuario->validarPerfil();
            if (empty($alertas)) {
                $existeUsuario = Usuario::where('email', $usuario->email);

                if ($existeUsuario && $existeUsuario->id !== $usuario->id) {
                    //Mensaje de error
                    Usuario::setAlerta('error', 'Email no válido o ya registrado, intenta con otro');
                    $alertas = $usuario->getAlertas();
                } else {
                    //Guardar cambios
                    $usuario->guardar();
                    Usuario::setAlerta('exito', 'Cambios guardados correctamente');
                    $alertas = $usuario->getAlertas();
                    //Asignar el nuevo nombre a la barra
                    $_SESSION['nombre'] = $usuario->nombre;
                }
            }
        }

        $router->render('dashboard/perfil', [
            'titulo' => 'Perfil',
            'usuario' => $usuario,
            'alertas' => $alertas
        ]);
    }

    public static function cambiar_password(Router $router) {
        session_start();
        isAuth(); // Si no está autenticado, lo redirige al login
        $alertas = [];
        $usuario = Usuario::find($_SESSION['id']);
        
    $router->render('dashboard/cambiar-password', [
        'titulo' => 'Cambiar Contraseña',
        'alertas' => $alertas,
        'usuario' => $usuario
    ]);
    }
}