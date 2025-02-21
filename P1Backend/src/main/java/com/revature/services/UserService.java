package com.revature.services;

import com.revature.DAOs.UserDAO;
import com.revature.models.DTOs.UserDTO;
import com.revature.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {
    //Autowire the UserDAO here
    private final UserDAO userDAO;

    @Autowired
    public UserService(UserDAO userDAO) {
        this.userDAO = userDAO;
    }

    //Get all users from the DB
    public List<UserDTO> getAllUsers() {
        List<User> returnedUsers = userDAO.findAll();

        List<UserDTO> userDTOs = new ArrayList<>();
        //Convert the users into a list of UserDTO's
        //We're going to use our special "User args" constructor from the DTO
        for(User u : returnedUsers){
            userDTOs.add(new UserDTO(u));
        }

        return userDTOs;
    }

}
