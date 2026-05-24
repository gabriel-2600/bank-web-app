package com.bank.backend.controller;

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
            throw new InvalidInputException("Input can not be empty");
        }

        if(user.getUsername().length() < 4){
            throw new InvalidInputException("Character length should be 4 or more");
        }

        if(user.getPassword().length() < 8){
            throw new InvalidInputException("Character length should be more than 7");
        }

        usersService.createUser(user);

        return new ResponseEntity<>(HttpStatus.OK);
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




