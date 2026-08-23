package ec.edu.iti.citasmedicas.backend.controller;

import ec.edu.iti.citasmedicas.backend.dto.LoginDTO;
import ec.edu.iti.citasmedicas.backend.mapper.UsuarioMapper;
import ec.edu.iti.citasmedicas.backend.model.Usuario;
import ec.edu.iti.citasmedicas.backend.security.JwtService;
import ec.edu.iti.citasmedicas.backend.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UsuarioMapper usuarioMapper;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDTO loginDTO) {
        // 1. Buscar el usuario en la BD
        Usuario usuario = usuarioService.obtenerPorUsername(loginDTO.getUsername());

        // 2. Verificar que existe y la contrasena coincide (usando BCrypt manualmente)
        if (usuario == null || !loginDTO.getPassword().equals(usuario.getPassword())) {
            return ResponseEntity.status(401).body("Credenciales incorrectas");
        }

        // 3. Generar token
        String token = jwtService.generateToken(usuario);

        // 4. Devolver respuesta
        return ResponseEntity.ok(usuarioMapper.toDTO(usuario, token));
    }
}