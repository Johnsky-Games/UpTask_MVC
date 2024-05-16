<?php

namespace Controllers;

use MVC\Router;

class DashboardController
{
    public static function index(Router $router)
    {
        session_start();

        if (!isset($_SESSION['login'])) {
            header('Location: /');
        }
        
        $router->render('dashboard/index', [
            'titulo' => 'Dashboard'
        ]);
    }
}