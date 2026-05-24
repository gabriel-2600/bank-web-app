package com.bank.backend.service;

import com.bank.backend.config.SecurityConfig;
import com.bank.backend.entity.Users;
import com.bank.backend.repository.UsersRepoInterface;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UsersService {

    private final UsersRepoInterface usersRepository;
    private final PasswordEncoder passwordEncoder;

    public UsersService(UsersRepoInterface usersRepository, PasswordEncoder passwordEncoder){
        this.usersRepository = usersRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public void createUser(Users user){
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        usersRepository.save(user);
    }

    public Users getUserById(Long userID){
        return usersRepository.findById(userID).orElseThrow();
    }

    public void deleteById(Long userID){
        usersRepository.deleteById(userID);
    }
}
