package com.bank.backend.controller;

import com.bank.backend.dto.request.LoginRequest;
import com.bank.backend.dto.response.LoginResponse;
import com.bank.backend.entity.Users;
import com.bank.backend.exceptions.InvalidInputException;
import com.bank.backend.service.UsersService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class UsersController {
    private final UsersService usersService;

    public UsersController(UsersService usersService){
        this.usersService = usersService;
    }

    @PostMapping("/auth/register")
    public ResponseEntity<?> registerUser(@RequestBody Users user){
        if(user.getFullName().isBlank() || user.getUsername().isBlank() || user.getPassword().isBlank()){
            throw new InvalidInputException("Invalid Input");
        }

        if(user.getUsername().length() < 4){
            throw new InvalidInputException("Invalid Input");
        }

        if(user.getPassword().length() < 8){
            throw new InvalidInputException("Invalid Input");
        }

        usersService.createUser(user);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/auth/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest request){
       LoginResponse loginResponse = usersService.verifyCredentials(request.username(), request.password());

       return  new ResponseEntity<>(loginResponse, HttpStatus.OK);
    }

    @GetMapping("/user/{id}")
    public Users getUserById(@PathVariable Long id){
        return usersService.getUserById(id);
    }

    @DeleteMapping("/user/delete/{id}")
    public void deleteUser(@PathVariable Long id){
        usersService.deleteById(id);
    }
}




