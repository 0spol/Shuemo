package shuemo.shuemo.domain.account;

import lombok.Data;

@Data
public class RegisterDto {
    private String email;
    private String username;
    private String password;
    private String ciudad;
    private String direccion;
    private String telefono;
    private String tipoDepartamento;
    private String tipoEmpresa;
    private String cuantos;
    private String accion;
    private String nombreEmpresa;
    private String nombreDepartamento;
}   
