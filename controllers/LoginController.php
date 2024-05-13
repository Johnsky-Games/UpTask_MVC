<?php

namespace Controllers;

use MVC\Router;

class LoginController
{
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


        if ($_SERVER['REQUEST_METHOD'] === 'POST') {

        }

        //Renderizar la vista
        $router->render('auth/crear', [
            'titulo' => 'Crear cuenta'
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

    public static function mensaje()
    {
        echo "Desde el controlador de mensaje";

    }

    public static function confirmar()
    {
        echo "Desde el controlador de confirmar";

    }
}