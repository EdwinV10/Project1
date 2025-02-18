package com.revature.controllers;

import com.revature.models.DTOs.OutgoingUserDTO;
import com.revature.models.User;
import com.revature.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController //Make this class a bean and make HTTP request bodies into JSON
@RequestMapping("/users") //Requests ending in /users will go to this Controller
@CrossOrigin
public class UserController {
    //Autowired the UserService here
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping //This method will handle GET requests
    public ResponseEntity<List<OutgoingUserDTO>> getAllUsers() {
        //Let's return the users in one line
        return ResponseEntity.ok(userService.getAllUsers());
    }
}
