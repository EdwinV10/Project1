package com.revature.services;

import com.revature.DAOs.ReimbursementDAO;
import com.revature.DAOs.UserDAO;
import com.revature.models.DTOs.UserDTO;
import com.revature.models.Reimbursement;
import com.revature.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {
    private final UserDAO userDAO;
    private final ReimbursementDAO reimbursementDAO;

    @Autowired
    public UserService(UserDAO userDAO, ReimbursementDAO reimbursementDAO) {
        this.userDAO = userDAO;
        this.reimbursementDAO = reimbursementDAO;
    }

    //Get all users from the DB
    public List<UserDTO> getAllUsers() {
        List<User> returnedUsers = userDAO.findAll();
        List<UserDTO> userDTOs = new ArrayList<>();

        for(User u : returnedUsers){
            userDTOs.add(new UserDTO(u));
        }
        return userDTOs;
    }

    public int deleteUser(int userId) {
        List<Reimbursement> reimbursements = reimbursementDAO.findByUser_UserId(userId);

        for(Reimbursement r : reimbursements){
            reimbursementDAO.deleteByReimbursementId(r.getReimbursementId());
        }
        return userDAO.deleteByUserId(userId);
    }

}
