package shuemo.shuemo.domain.infraestructura;

import shuemo.shuemo.config.EmailConfig;

public final class Email
{
    // DATOS DEL EMAIL
    private String cuerpoMail;
    private String asunto;
    private String destinatario;

    // CONSTRUCTOR
    public Email(String cuerpoMail, String asunto, String destinatario) {
        this.cuerpoMail = cuerpoMail;
        this.asunto = asunto;
        this.destinatario = destinatario;
    }

    // GETTERS & SETTERS
    public String getNOMBRE_EMISOR() {
        return EmailConfig.NOMBRE_EMISOR;
    }


    public String getCORREO_EMISOR() {
        return EmailConfig.CORREO_EMISOR;
    }


    public String getCLAVE_API() {
        return EmailConfig.CLAVE_API;
    }


    public String getCuerpoMail() {
        return cuerpoMail;
    }


    public void setCuerpoMail(String cuerpoMail) {
        this.cuerpoMail = cuerpoMail;
    }


    public String getAsunto() {
        return asunto;
    }


    public void setAsunto(String asunto) {
        this.asunto = asunto;
    }


    public String getDestinatario() {
        return destinatario;
    }


    public void setDestinatario(String destinatario) {
        this.destinatario = destinatario;
    }


}
