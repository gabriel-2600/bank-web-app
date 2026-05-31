package com.bank.backend.controller;

import com.bank.backend.dto.request.LoginRequest;
import com.bank.backend.dto.request.RegisterRequest;
import com.bank.backend.dto.response.LoginResponse;
import com.bank.backend.dto.response.RegisterResponse;
import com.bank.backend.entity.Users;
import com.bank.backend.exceptions.InvalidInputException;
import com.bank.backend.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class AuthController {
    public final AuthService authService;

    public AuthController(AuthService authService){
        this.authService = authService;
    }

    @PostMapping("/auth/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterRequest registerRequest){
        if(registerRequest.fullName().isBlank() || registerRequest.username().isBlank() || registerRequest.password().isBlank()){
            throw new InvalidInputException("Invalid Input");
        }

        if(registerRequest.username().length() < 4){
            throw new InvalidInputException("Invalid Input");
        }

        if(registerRequest.password().length() < 8){
            throw new InvalidInputException("Invalid Input");
        }

        RegisterResponse registerResponse = authService.createUser(registerRequest);

        return new ResponseEntity<>(registerResponse, HttpStatus.OK);
    }

    @PostMapping("/auth/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest request){
        LoginResponse loginResponse = authService.verifyCredentials(request.username(), request.password());

        return  new ResponseEntity<>(loginResponse, HttpStatus.OK);
    }
}
