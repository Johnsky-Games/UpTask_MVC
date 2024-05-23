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
    public $password_actual;
    public $password_nuevo;

    // Constructor de la clase Usuario
    public function __construct($args = [])
    {
        $this->id = $args['id'] ?? null;
        $this->nombre = $args['nombre'] ?? '';
        $this->email = $args['email'] ?? '';
        $this->password = $args['password'] ?? '';
        $this->password2 = $args['password2'] ?? '';
        $this->password_actual = $args['password_actual'] ?? '';
        $this->password_nuevo = $args['password_nuevo'] ?? '';
        $this->token = $args['token'] ?? '';
        $this->confirmado = $args['confirmado'] ?? 0;
    }

    //Validar el login
    public function validarLogin()
    {
        if (!$this->email) {
            self::$alertas['error'][] = "El email es obligatorio";
        }

        if (!filter_var($this->email, FILTER_VALIDATE_EMAIL)) {
            self::$alertas['error'][] = "Debes añadir un correo válido";
        }

        if (!$this->password) {
            self::$alertas['error'][] = "El password es obligatorio";
        }



        return self::$alertas;
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

    //Validar el password

    public function validarPassword() :array
    {
        if (!$this->password) {
            self::$alertas['error'][] = "El password no puede estar vacío";
        }

        if (strlen($this->password) < 6) {
            self::$alertas['error'][] = "El password debe contener al menos 6 caracteres";
        }

        return self::$alertas;
    }

    //Generar token
    public function crearToken() :void
    {
        $this->token = md5(uniqid(mt_rand()));
    }

    //comprueba el password
    public function comprobar_password():bool
    {
        return password_verify($this->password_actual, $this->password);
    }

    //Hashea el password
    public function hashPassword() :void
    {
        $this->password = password_hash($this->password, PASSWORD_BCRYPT);
    }

    public function validarPerfil(): array
    {
        if (!$this->nombre) {
            self::$alertas['error'][] = "Debes añadir un nombre";
        }

        if (!$this->email) {
            self::$alertas['error'][] = "Debes añadir un correo";
        }
        return self::$alertas;
    }

    public function nuevoPassword(): array
    {
        if (!$this->password_actual) {
            self::$alertas['error'][] = "El password actual no puede estar vacío";
        }

        if (!$this->password_nuevo) {
            self::$alertas['error'][] = "El password nuevo no puede estar vacío";
        }

        if (strlen($this->password_nuevo) < 6) {
            self::$alertas['error'][] = "El password debe contener al menos 6 caracteres";
        }

        return self::$alertas;
    }
}