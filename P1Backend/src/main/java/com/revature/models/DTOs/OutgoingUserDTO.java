package com.revature.models.DTOs;

//This is a data transfer object (DTO)
//They are often used to model data that is being sent between client and server

import com.revature.models.User;

//In this case, we want to send User info without including the raw password
//Yes, we could have just made a different constructor in the User class
    //check the videogame DTOs for more examples of DTOs
public class OutgoingUserDTO {

    private int userId;
    private String username;
    private String role;

    //Boilerplate-----------------------------------------------


    public OutgoingUserDTO() {
    }

    public OutgoingUserDTO(int userId, String username, String role) {
        this.userId = userId;
        this.username = username;
        this.role = role;
    }

    public OutgoingUserDTO(User user) {
        this.userId = user.getUserId();
        this.username = user.getUsername();
        this.role = user.getRole();
    }

    public int getUserId() {
        return userId;
    }

    public String getUsername() {
        return username;
    }

    public String getRole() {
        return role;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setRole(String role) {
        this.role = role;
    }

    @Override
    public String toString() {
        return "OutgoingUserDTO{" +
                "userId=" + userId +
                ", username='" + username + '\'' +
                ", role='" + role + '\'' +
                '}';
    }
}
