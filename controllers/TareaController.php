<?php

namespace Controllers;

use Model\Tarea;
use Model\Proyecto;

class TareaController
{
    public function index()
    {
        $proyectoId = $_GET['id'];

        if(!$proyectoId) {
        header('Location: /');
        }

        $proyecto = Proyecto::where('url', $proyectoId);

        debuguear($proyecto);


    }

    public function crear()
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            session_start();
            $proyectoId = $_POST['proyectoId'];
            $proyecto = Proyecto::where('url', $proyectoId);

            if (!$proyecto || $proyecto->propietarioId !== $_SESSION['id']) {
                $respuesta = [
                    'tipo' => 'error',
                    'mensaje' => 'Error al crear la tarea'
                ];
                echo json_encode($respuesta);
                return;
            }

            //_Todo bien, instancias y crear la tarea
            $tarea = new Tarea($_POST);
            $tarea->proyectoId = $proyecto->id;
            $resultado = $tarea->guardar();
            $respuesta = [
                'tipo' => 'exito',
                'id' => $resultado['id'],
                'mensaje' => 'Tarea Creada Correctamente'
            ];
            echo json_encode($respuesta);
        }
    }

    public function actualizar()
    {

        if ($_SERVER['REQUEST_METHOD'] === 'POST') {

        }
    }

    public function eliminar()
    {

        if ($_SERVER['REQUEST_METHOD'] === 'POST') {

        }
    }
}