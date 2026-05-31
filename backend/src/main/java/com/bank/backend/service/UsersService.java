package com.bank.backend.service;

import com.bank.backend.entity.Users;
import com.bank.backend.repository.UsersRepoInterface;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UsersService {

    private final UsersRepoInterface usersRepository;

    public UsersService(UsersRepoInterface usersRepository, PasswordEncoder passwordEncoder){
        this.usersRepository = usersRepository;
    }


    public Users getUserById(Long userID){
        return usersRepository.findById(userID).orElseThrow();
    }

    public void deleteById(Long userID){
        usersRepository.deleteById(userID);
    }
}
