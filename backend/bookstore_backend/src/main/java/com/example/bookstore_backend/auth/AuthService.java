package com.example.bookstore_backend.auth;

import com.example.bookstore_backend.model.Role;
import com.example.bookstore_backend.model.User;
import com.example.bookstore_backend.repository.RoleRepository;
import com.example.bookstore_backend.repository.UserRepository;
import com.example.bookstore_backend.security.JwtServices;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
@AllArgsConstructor
public class AuthService {

    private final JwtServices jwtServices;
    private final UserRepository userRepository;
    private final UserDetailsService service;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final RoleRepository rolesRepository;

    public AuthResponse register(RegisterRequest request) {
        String raw_password = request.getPassword();
        User user = new User(request.getUsername(),
                passwordEncoder.encode(raw_password),
                request.getFullName());
        if (userRepository.findUsersByUsername(request.getUsername()).isPresent()) {
            return new AuthResponse("User exist");
        }

        Set<Role> roleDefault = new HashSet<>();
        Role userRole = rolesRepository.findRoleByName("user").get();
        roleDefault.add(userRole);
        user.setRoles(roleDefault);


        userRepository.save(user);
        return new AuthResponse(jwtServices.generateToken(user));
    }


    public AuthResponse login(LoginRequest request){
        Authentication authToken = new UsernamePasswordAuthenticationToken(request.getUsername(),request.getPassword());
        authenticationManager.authenticate(authToken);
        UserDetails student = service.loadUserByUsername(request.getUsername());
        
        return new AuthResponse(jwtServices.generateToken(student));
    }



}
