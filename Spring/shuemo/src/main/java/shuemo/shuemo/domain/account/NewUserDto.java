package shuemo.shuemo.domain.account;

import lombok.Data;

@Data
public class NewUserDto {
    private Long idUsuario;
    private String email;
    private String username;
    private String token;
    private Long idEmpresa;
    private Long[] roles;
    private Long idTipoEmpresa;
}
