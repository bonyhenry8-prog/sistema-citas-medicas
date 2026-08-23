package ec.edu.iti.citasmedicas.backend.service;

import ec.edu.iti.citasmedicas.backend.model.Usuario;
import ec.edu.iti.citasmedicas.backend.repository.UsuarioRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService implements UserDetailsService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    // ✅ Inyección por constructor
    public UsuarioService(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return usuarioRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado: " + username));
    }

    public Usuario registrarUsuario(String username, String password, String rol) {
        if (usuarioRepository.existsByUsername(username)) {
            throw new RuntimeException("El usuario '" + username + "' ya existe.");
        }

        Usuario usuario = new Usuario();
        usuario.setUsername(username);
        usuario.setPassword(passwordEncoder.encode(password));
        usuario.setRol(rol);
        usuario.setActivo(true);

        return usuarioRepository.save(usuario);
    }

    public boolean existeUsuario(String username) {
        return usuarioRepository.existsByUsername(username);
    }

    public Usuario obtenerPorUsername(String username) {
        return usuarioRepository.findByUsername(username).orElse(null);
    }

    public boolean verificarContraseña(String rawPassword, String encodedPassword) {
        return passwordEncoder.matches(rawPassword, encodedPassword);
    }
}