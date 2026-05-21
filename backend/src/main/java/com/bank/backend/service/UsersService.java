package com.bank.backend.service;

import com.bank.backend.entity.Users;
import com.bank.backend.repository.UsersRepoInterface;
import org.springframework.stereotype.Service;

@Service
public class UsersService {

    private final UsersRepoInterface usersRepository;

    public UsersService(UsersRepoInterface usersRepository){
        this.usersRepository = usersRepository;
    }

    public Users createUser(Users user){
        return usersRepository.save(user);
    }

    public Users getUserById(Long userID){
        return usersRepository.findById(userID).orElseThrow();
    }

    public void deleteById(Long userID){
        usersRepository.deleteById(userID);
    }
}
