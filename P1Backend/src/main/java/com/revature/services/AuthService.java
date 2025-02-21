package com.revature.services;

import com.revature.DAOs.UserDAO;
import com.revature.models.DTOs.LoginDTO;
import com.revature.models.DTOs.UserDTO;
import com.revature.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

//The service layer is where we put our business logic
//User input validation, data manipulation/reformatting, User authentication, etc.
@Service //1 of 4 sterotype annotation (make a class a bean)
public class AuthService {

    //Services talk to DAOs, so we need to autowire the DAO here
    private final UserDAO userDAO;

    @Autowired
    public AuthService(UserDAO userDAO) {
        this.userDAO = userDAO;
        //Spring will create an instance of UserDAO
    }

    //This method will take a User object and send it to the DAO
    //It will also return the User object to the controller
    public UserDTO registerUser(User user) {
        //Let's check input validation here

        //We use the save method to insert data into the DB
        //Save is one of the methods that JpaRepository gives us
        User returnedUser = userDAO.save(user);

        //We need to convert the User to a UserDTO before we send it to the client
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
        //input validation

        //Check if the username is null, or if it is only an empty string or space-only string
        if(loginDTO.getUsername() == null || loginDTO.getUsername().isBlank()){
            throw new IllegalArgumentException("Username cannot be empty!");
        }

        //Same for password
        if(loginDTO.getPassword() == null || loginDTO.getPassword().isBlank()){
            throw new IllegalArgumentException("Password cannot be empty!");
        }

        //TODO: could do more checks, but this will do for now

        User returnedUser = userDAO.findByUsernameAndPassword(
                loginDTO.getUsername(),
                loginDTO.getPassword()).orElse(null);
        //orElse(null) is a convenient way to extract data (or a null value from an Optional
        //we could also use orElseThrow() to throw an Exception ourright, but I'll spell it out a bit

        //If no User is found(if returnedUser is null), throw an Exception throw an Exception
        if(returnedUser == null){
            throw new IllegalArgumentException("Invalid username or password!");
        }

        return new UserDTO(returnedUser);
    }


}