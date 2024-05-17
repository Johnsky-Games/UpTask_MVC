<?php

namespace Controllers;

use MVC\Router;

class DashboardController
{
    public static function index(Router $router)
    {
        session_start();

        isAuth(); // Si no está autenticado, lo redirige al login
        
        $router->render('dashboard/index', [
            'titulo' => 'Proyectos'
        ]);
    }

    public static function crear_proyecto (Router $router) {
        session_start();
        
        $router->render ('dashboard/crear-proyecto', [
            'titulo' => 'Nuevo Proyecto'
        ]);
    }

    public static function perfil (Router $router) {
        session_start();
        
        $router->render ('dashboard/perfil', [
            'titulo' => 'Perfil'
        ]);
    }
}