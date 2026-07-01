package org.example.medecin_project.Security;


import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;

@Service
public class JWTService {

    private final String SECRET = "mysecretkeymysecretkeymysecretkey123456";

    private Key getSignKey() {
        return Keys.hmacShaKeyFor(SECRET.getBytes());
    }

    public String generateToken(String username) {
        return generateToken(username, null);
    }

    public String generateToken(String username, String role) {
        var builder = Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24));
        if (role != null) {
            builder.claim("role", role);
        }
        return builder.signWith(getSignKey(), SignatureAlgorithm.HS256).compact();
    }

    public String extractUsername(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSignKey())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public boolean isTokenValid(String token, String username) {
        return extractUsername(token).equals(username);
    }
}
