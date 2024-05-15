<?php

namespace Model;

class Usuario extends ActiveRecord
{
    // Base DE DATOS - Tabla y Columnas 
    protected static $tabla = 'usuarios';
    protected static $columnasDB = ['id', 'nombre', 'email', 'password', 'token', 'confirmado'];

    // Campos de la tabla usuarios
    public $id;
    public $nombre;
    public $email;
    public $password;
    public $password2;
    public $token;
    public $confirmado;

    // Constructor de la clase Usuario
    public function __construct($args = [])
    {
        $this->id = $args['id'] ?? null;
        $this->nombre = $args['nombre'] ?? '';
        $this->email = $args['email'] ?? '';
        $this->password = $args['password'] ?? '';
        $this->password2 = $args['password2'] ?? '';
        $this->token = $args['token'] ?? '';
        $this->confirmado = $args['confirmado'] ?? 0;
    }

    //Validación para cuentas nuevas
    public function validarNuevaCuenta()
    {
        if (!$this->nombre) {
            self::$alertas['error'][] = "Debes añadir un nombre";
        }

        if (!$this->email) {
            self::$alertas['error'][] = "Debes añadir un correo";
        }

        if (!$this->password) {
            self::$alertas['error'][] = "El password no puede estar vacío";
        }

        if (strlen($this->password) < 6) {
            self::$alertas['error'][] = "El password debe contener al menos 6 caracteres";
        }

        if ($this->password !== $this->password2) {
            self::$alertas['error'][] = "Los passwords no son iguales";
        }

        return self::$alertas;
    }

    //Hashea el password
    public function hashPassword()
    {
        $this->password = password_hash($this->password, PASSWORD_BCRYPT);
    }

    //Generar token
    public function crearToken()
    {
        $this->token = md5(uniqid(mt_rand()));
    }

    //Valida el email
    public function validarEmail()
    {
        if (!$this->email) {
            self::$alertas['error'][] = "Debes añadir un correo";
        }

        if (!filter_var($this->email, FILTER_VALIDATE_EMAIL)) {
            self::$alertas['error'][] = "Debes añadir un correo válido";
        }
        return self::$alertas;
    }
}