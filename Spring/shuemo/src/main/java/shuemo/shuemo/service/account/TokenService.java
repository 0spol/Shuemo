package shuemo.shuemo.service.account;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import shuemo.shuemo.domain.empleado.Empleado;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class TokenService {

    @Value("${jwt.signing.key}")
    private String signingKey;

    @Value("${jwt.issuer}")
    private String issuer;

    public String createToken(Empleado user) {
        return Jwts.builder()
                .setSubject(user.getEmail())
                .claim("username", user.getNombre())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 86400000)) // 1 día
                .signWith(SignatureAlgorithm.HS512, signingKey)
                .setIssuer(issuer)
                .compact();
    }
}

