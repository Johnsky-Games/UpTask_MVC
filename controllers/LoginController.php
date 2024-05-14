<?php

namespace Controllers;

use Model\Usuario;
use MVC\Router;

class LoginController
{
    //Definimos los métodos
    public static function login(Router $router)
    {

        if ($_SERVER['REQUEST_METHOD'] === 'POST') {

        }

        //Renderizar la vista
        $router->render('auth/login', [
            'titulo' => 'Iniciar sesión'
        ]);
    }

    public static function logout()
    {
        echo "Desde el controlador de logout";

    }
    public static function crear(Router $router)
    {
        $usuario = new Usuario;
        $alertas = [];
        
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $usuario->sincronizar($_POST);
            
            $alertas = $usuario->validarNuevaCuenta();
        }

        //Renderizar la vista
        $router->render('auth/crear', [
            'titulo' => 'Crear cuenta',
            'usuario' => $usuario,
            'alertas' => $alertas
        ]);
    }

    public static function olvide(Router $router)
    {

        if ($_SERVER['REQUEST_METHOD'] === 'POST') {

        }
        
                //Renderizar la vista
                $router->render('auth/olvide', [
                    'titulo' => 'Olvidé mi contraseña'
                    ]);
    }

    public static function reestablecer(Router $router)
    {

        if ($_SERVER['REQUEST_METHOD'] === 'POST') {

        }

                //Renderizar la vista
                $router->render('auth/reestablecer', [
                    'titulo' => 'Reestablecer contraseña'
                    ]);
    }

    public static function mensaje(Router $router)
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {

        }

                //Renderizar la vista
                $router->render('auth/mensaje', [
                    'titulo' => 'Cuenta Creada Correctamente'
                    ]);
    }

    public static function confirmar(Router $router)
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {

        }

                //Renderizar la vista
                $router->render('auth/confirmar', [
                    'titulo' => 'Confirma tu cuenta UpTask'
                    ]);
    }
}