package com.revature.services;

import com.revature.DAOs.UserDAO;
import com.revature.models.DTOs.OutgoingUserDTO;
import com.revature.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
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
    public OutgoingUserDTO registerUser(User user) {
        //Let's check input validation here

        //We use the save method to insert data into the DB
        //Save is one of the methods that JpaRepository gives us
        User returnedUser = userDAO.save(user);

        //We need to convert the User to a UserDTO before we send it to the client
        OutgoingUserDTO outUserDTO = new OutgoingUserDTO(
                returnedUser.getUserId(),
                returnedUser.getUsername(),
                returnedUser.getRole()
        );

        return outUserDTO;
    }




}