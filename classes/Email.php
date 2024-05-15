<?php 
namespace Classes;

use PHPMailer\PHPMailer\PHPMailer;

class Email {
    protected $email;
    protected $nombre;
    protected $token;

    public function __construct($email, $nombre, $token)
    {
        $this->email = $email;
        $this->nombre = $nombre;
        $this->token = $token;
    }
    
        //Enviar email de confirmación
        public function enviarConfirmacion()
        {
            $mail = new PHPMailer();
            $mail->isSMTP();
            $mail->Host = 'sandbox.smtp.mailtrap.io';
            $mail->SMTPAuth = true;
            $mail->Port = 2525;
            $mail->Username = 'e0040d6c6ee6c5';
            $mail->Password = '95eb31d2e71b29';
    
            $mail->setFrom('cuentas@uptask.com');
            $mail->addAddress('cuentas@uptask.com', 'uptask.com');
            $mail->Subject = 'Confirma tu cuenta UpTask';
            $mail->isHTML(true);
            $mail->CharSet = 'UTF-8';
    
            $contenido = '<html>';
            $contenido .= '<p><strong>Hola ' . $this->nombre . '</strong>. Para confirmar tu cuenta de UpTask, haz clic en el siguiente enlace.</p>';
            $contenido .= '<p>Presiona aquí: <a href="http://localhost:3000/confirmar?token=' . $this->token . '">Confirmar cuenta</a></p>';
            $contenido .= '<p>Si no has sido tú, ignora este mensaje.</p>';
            $contenido .= '</html>';
    
            $mail->Body = $contenido;
    
            //Enviar el email
            $mail->send();
        }
}