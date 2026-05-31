package com.bank.backend.service;

import com.bank.backend.dto.request.RegisterRequest;
import com.bank.backend.dto.response.LoginResponse;
import com.bank.backend.dto.response.RegisterResponse;
import com.bank.backend.entity.Users;
import com.bank.backend.repository.UsersRepoInterface;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private final UsersRepoInterface usersRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UsersRepoInterface usersRepository, PasswordEncoder passwordEncoder){
        this.usersRepository = usersRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public RegisterResponse createUser(String fullName, String username, String password){
        Users user = new Users();
        user.setFullName(fullName);
        user.setUsername(username);
        user.setPassword(passwordEncoder.encode(password));
        usersRepository.save(user);

        return new RegisterResponse("User Created");
    }

    public LoginResponse verifyCredentials(String username, String password){
        Users user = usersRepository.findByUsername(username).orElseThrow(() -> new BadCredentialsException("Invalid Credentials"));

        boolean passwordMatch = passwordEncoder.matches(password, user.getPassword());
        if(!passwordMatch){
            throw new BadCredentialsException("Invalid Credentials");
        }

        return new LoginResponse("Login Successful", true);
    }

}
