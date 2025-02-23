package com.revature.services;

import com.revature.DAOs.UserDAO;
import com.revature.models.DTOs.LoginDTO;
import com.revature.models.DTOs.UserDTO;
import com.revature.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private final UserDAO userDAO;

    @Autowired
    public AuthService(UserDAO userDAO) {
        this.userDAO = userDAO;
    }

    public UserDTO registerUser(User user) {
        //Let's check input validation here
        if(user.getUsername() == null || user.getUsername().isBlank()) {
            throw new IllegalArgumentException("Username cannot be empty!");
        }

        if(user.getPassword() == null || user.getPassword().isBlank()) {
            throw new IllegalArgumentException("Password cannot be empty!");
        }

        if(user.getFirstName() == null || user.getFirstName().isBlank()) {
            throw new IllegalArgumentException("First name cannot be empty!");
        }

        if(user.getLastName() == null || user.getLastName().isBlank()) {
            throw new IllegalArgumentException("Last name cannot be empty!");
        }

        User returnedUser = userDAO.save(user);

        UserDTO outUserDTO = new UserDTO(
                returnedUser.getUserId(),
                returnedUser.getFirstName(),
                returnedUser.getLastName(),
                returnedUser.getUsername(),
                returnedUser.getRole()
        );
        return outUserDTO;
    }

    public UserDTO login(LoginDTO loginDTO){
        if(loginDTO.getUsername() == null || loginDTO.getUsername().isBlank()){
            throw new IllegalArgumentException("Username cannot be empty!");
        }

        if(loginDTO.getPassword() == null || loginDTO.getPassword().isBlank()){
            throw new IllegalArgumentException("Password cannot be empty!");
        }

        User returnedUser = userDAO.findByUsernameAndPassword(
                loginDTO.getUsername(),
                loginDTO.getPassword()).orElse(null);

        if(returnedUser == null){
            throw new IllegalArgumentException("Invalid username or password!");
        }

        return new UserDTO(returnedUser);
    }
}