package com.revature.controllers;

import com.revature.models.DTOs.LoginDTO;
import com.revature.models.DTOs.UserDTO;
import com.revature.models.User;
import com.revature.services.AuthService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/auth") //Requests ending in /auth will go to this Controller
@CrossOrigin(value = "http://localhost:5173", allowCredentials = "true" )
public class AuthController {
    private final AuthService authService;

    @Autowired
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    //Insert a new user (POST request)
    @PostMapping("/register")
    public ResponseEntity<UserDTO> registerUser(@RequestBody User user){
        UserDTO returnedUser = authService.registerUser(user);

        return ResponseEntity.ok(returnedUser);
    }

    @PostMapping("/login")
    public ResponseEntity<UserDTO> login(@RequestBody LoginDTO loginDTO, HttpSession session) {
        UserDTO loggedInUser = authService.login(loginDTO);

        //If we get here, the login was successful - we can build up the User's session!
        session.setAttribute("userId", loggedInUser.getUserId());
        session.setAttribute("username", loggedInUser.getUsername());
        session.setAttribute("role", loggedInUser.getRole());

        System.out.println("User " + session.getAttribute("username") + " has logged in!");

        return ResponseEntity.ok(loggedInUser);
    }

}
