package shuemo.shuemo.controller.email;

import java.util.Properties;
import javax.mail.Message;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import org.springframework.stereotype.Controller;
import shuemo.shuemo.config.EmailConfig;
import shuemo.shuemo.domain.infraestructura.Email;

@Controller
public class EmailController {

    private static final String SMTP_HOST = "smtp.gmail.com";
    private static final int SMTP_PORT = 465;
    private static final String SMTP_SOCKET_FACTORY_CLASS = "javax.net.ssl.SSLSocketFactory";

    public static void enviarGmail(String destinatario, String asunto, String cuerpo) {
        Email email = new Email(cuerpo, asunto, destinatario);
        Properties props = new Properties();
        props.put("mail.smtp.host", SMTP_HOST);
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.port", SMTP_PORT);
        props.put("mail.smtp.socketFactory.port", SMTP_PORT);
        props.put("mail.smtp.socketFactory.class", SMTP_SOCKET_FACTORY_CLASS);
        props.put("mail.smtp.ssl.protocols", "TLSv1.2");

        try {
            Session session = Session.getDefaultInstance(props);
            MimeMessage message = new MimeMessage(session);
            message.setFrom(new InternetAddress(email.getCORREO_EMISOR(), email.getNOMBRE_EMISOR()));
            message.addRecipient(Message.RecipientType.TO, new InternetAddress(destinatario));
            message.setSubject(email.getAsunto());
            message.setContent(email.getCuerpoMail(), "text/html");

            Transport transport = session.getTransport("smtp");
            transport.connect(SMTP_HOST, email.getCORREO_EMISOR(), email.getCLAVE_API());
            transport.sendMessage(message, message.getAllRecipients());
            transport.close();
        } catch (Exception e) {
            System.out.println("Error encontrado: " + e);
        }
    }

    private static final String CSS_DEFAULT_STYLES = "body {\n" +
            "  font-family: Arial, sans-serif;\n" +
            "  font-size: 14px;\n" +
            "  color: #333;\n" +
            "  background-color: #f5f5f5;\n" +
            "  margin: 0;\n" +
            "  padding: 0;\n" +
            "}\n" +
            ".container {\n" +
            "  width: 80%;\n" +
            "  max-width: 600px;\n" +
            "  margin: 20px auto;\n" +
            "  padding: 20px;\n" +
            "  border: 1px solid #ddd;\n" +
            "  border-radius: 10px;\n" +
            "  background-color: #ffffff;\n" +
            "  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);\n" +
            "}\n" +
            ".separator {\n" +
            "  border-bottom: 1px solid #ddd;\n" +
            "  margin: 20px 0;\n" +
            "}\n" +
            ".logo {\n" +
            "  display: block;\n" +
            "  margin: 0 auto 20px;\n" +
            "  max-width: 100px;\n" +
            "  height: auto;\n" +
            "  border-radius: 10px;\n" +
            "}\n" +
            ".button {\n" +
            "  display: inline-block;\n" +
            "  padding: 10px 20px;\n" +
            "  margin: 20px 0;\n" +
            "  border-radius: 5px;\n" +
            "  background-color: #4CAF50;\n" +
            "  color: white;\n" +
            "  text-decoration: none;\n" +
            "  text-align: center;\n" +
            "  font-weight: bold;\n" +
            "}\n" +
            ".button a {\n" +
            "  color: white;\n" +
            "  text-decoration: none;\n" +
            "  font-weight: bold;\n" +
            "}\n";

    public static void gmailBienvenidaRegistro(String emailDestinatario, String nombreDestinatario,
            String enlaceConfirmacion) {
        String asunto = "Buenas, gracias por registrarte en " + EmailConfig.NOMBRE_EMISOR + "👋";
        String cuerpo = construirCuerpoBienvenida(nombreDestinatario, enlaceConfirmacion);
        enviarGmail(emailDestinatario, asunto, cuerpo);
    }

    private static String construirCuerpoBienvenida(String nombreDestinatario, String enlaceConfirmacion) {
        return "<html>\n" +
                "<head>\n" +
                "  <style>\n" +
                CSS_DEFAULT_STYLES +
                "    h2 {\n" +
                "      color: #4CAF50;\n" +
                "      text-align: center;\n" +
                "    }\n" +
                "    p {\n" +
                "      line-height: 1.6;\n" +
                "    }\n" +
                "  </style>\n" +
                "</head>\n" +
                "<body> <div class=\"container\">\n" +
                "    <img src='https://lh3.googleusercontent.com/a/ACg8ocJkIHOUo9Zig6HHGHA5RqkGtCKOgXDF0nqdPLeJRZFAsfneGOk=s288-c-no' alt='Logo' class='logo'>\n"
                +
                "    <h2>Bienvenido " + nombreDestinatario + "</h2>\n" +
                "    <div class='separator'></div>\n" +
                "    <p>Estamos encantados de tenerte con nosotros y esperamos que disfrutes de la experiencia que hemos creado para ti.</p>\n"
                +
                "    <p>Gracias por confiar en nosotros y por ser parte de esta emocionante aventura. Te damos acceso para que puedas administrar tus facturas, clientes, citas y empleados.</p>\n"
                +
                "    <p>Si tienes alguna pregunta o sugerencia, no dudes en ponerte en contacto con nosotros. Estamos para ayudarte en todo lo que necesites.</p>\n"
                +
                "    <p>Gracias de nuevo por unirte a nosotros.</p>\n" +
                "    <p style='text-align: center;'>\n" +
                "      <a href='" + enlaceConfirmacion + "' class='button'>Confirmar Correo</a>\n" +
                "    </p>\n" +
                "    <div class='separator'></div>\n" +
                "    <p><strong>Atentamente,<br/>El equipo de " + EmailConfig.NOMBRE_EMISOR + ".</strong></p>\n" +
                "  </div>\n" +
                "</body>\n" +
                "</html>";
    }

    public static void gmailReestablecerPwd(String emailDestinatario, String nombreDestinatario,
            String enlaceReestablecimiento) {
        String asunto = "Reestablecer Contraseña - " + EmailConfig.NOMBRE_EMISOR;
        String cuerpo = construirCuerpoReestablecimiento(nombreDestinatario, enlaceReestablecimiento);
        enviarGmail(emailDestinatario, asunto, cuerpo);
    }

    private static String construirCuerpoReestablecimiento(String nombreDestinatario, String enlaceReestablecimiento) {
        return "<html>\n" +
                "<head>\n" +
                "  <style>\n" +
                CSS_DEFAULT_STYLES +
                "  </style>\n" +
                "</head>\n" +
                "<body>\n" +
                "  <div class=\"container\">\n" +
                "    <img src='https://lh3.googleusercontent.com/a/ACg8ocJkIHOUo9Zig6HHGHA5RqkGtCKOgXDF0nqdPLeJRZFAsfneGOk=s288-c-no' alt='Logo' class='logo'>\n"
                +
                "    <h2>¡Hola " + nombreDestinatario + "!</h2>\n" +
                "    <p>Hemos recibido una solicitud para reestablecer la contraseña de tu cuenta.</p>\n" +
                "    <p>Por favor, haz clic en el siguiente botón para completar el proceso:</p>\n" +
                "    <p style='text-align: center;'>\n" +
                "      <a href='" + enlaceReestablecimiento + "' class='button'>Reestablecer Contraseña</a>\n" +
                "    </p>\n" +
                "    <div class='separator'></div>\n" +
                "    <p>Si no has solicitado este cambio, ignora este correo electrónico.</p>\n" +
                "    <p><strong>Atentamente,<br/>El equipo de " + EmailConfig.NOMBRE_EMISOR + ".</strong></p>\n" +
                "  </div>\n" +
                "</body>\n" +
                "</html>";
    }

    public static void gmailRecordatorioCita(String nombreEmpresa, String iconoEmpresa, String emailDestinatario,
            String nombreDestinatario, String fechaCita,
            String horaCita, String lugarCita) {
        String asunto = "Recordatorio de Cita - " + nombreEmpresa;
        String cuerpo = construirCuerpoRecordatorioCita(nombreDestinatario, nombreEmpresa, iconoEmpresa, fechaCita,
                horaCita, lugarCita);
        enviarGmail(emailDestinatario, asunto, cuerpo);
    }

    private static String construirCuerpoRecordatorioCita(String nombreDestinatario, String nombreEmpresa,
            String iconoEmpresa, String fechaCita,
            String horaCita, String lugarCita) {
        return "<html>\n" +
                "<head>\n" +
                "  <style>\n" +
                CSS_DEFAULT_STYLES +
                "  </style>\n" +
                "</head>\n" +
                "<body>\n" +
                "  <div class=\"container\">\n" +
                "    <img src='https://cdn-icons-png.flaticon.com/512/2168/2168904.png' alt='Logo' class='logo'>\n"
                +
                "    <h2>Recordatorio de Cita para " + nombreDestinatario + " en " + lugarCita + "</h2>\n"
                +
                "    <div class='separator'></div>\n" +
                "    <p>Este es un recordatorio de tu cita programada para el siguiente horario:</p>\n" +
                "    <p>Fecha: " + fechaCita + "<br/>Hora: " + horaCita + "</p>\n" +
                "    <p>Por favor, asegúrate de estar presente a tiempo.</p>\n" +
                "    <div class='separator'></div>\n" +
                "    <p>Si necesitas reprogramar esta cita, por favor ponte en contacto con nosotros lo antes posible.</p>\n"
                +
                "    <p><strong>Atentamente,<br/>El equipo de " + EmailConfig.NOMBRE_EMISOR + ".</strong></p>\n" +
                "  </div>\n" +
                "</body>\n" +
                "</html>";
    }

    //Test
    // public static void main(String[] args) {
    //     gmailBienvenidaRegistro("@gmail.com","Jhon Dohe", "S");
    // }
}
