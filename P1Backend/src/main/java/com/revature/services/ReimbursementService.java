package com.revature.services;

import com.revature.DAOs.ReimbursementDAO;
import com.revature.DAOs.UserDAO;
import com.revature.models.DTOs.IncomingReimbursementDTO;
import com.revature.models.DTOs.OutgoingReimbursementDTO;
import com.revature.models.DTOs.UserDTO;
import com.revature.models.Reimbursement;
import com.revature.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ReimbursementService {
    private final UserDAO userDAO;
    private final ReimbursementDAO reimbursementDAO;

    @Autowired
    public ReimbursementService(UserDAO userDAO, ReimbursementDAO reimbursementDAO) {
        this.userDAO = userDAO;
        this.reimbursementDAO = reimbursementDAO;
    }

    //Insert a new game into the DB(get user by ID and make a game object with it)
    public Reimbursement insertReimbursement(IncomingReimbursementDTO reimbursementDTO) {

        //TODO: input validation

        Reimbursement newReimbursement = new Reimbursement(
                0,
                reimbursementDTO.getDescription(),
                reimbursementDTO.getAmount(),
                reimbursementDTO.getStatus(),
                null
        );

        Optional<User> user = userDAO.findById(reimbursementDTO.getUserId());

        //If the user doesn't exist it will be empty
        if(user.isEmpty()){
            //TODO: throw an exception
        }else{
            newReimbursement.setUser(user.get());
        }

        return reimbursementDAO.save(newReimbursement);
    }

    //TODO: get all reimbursements by User ID
    public List<OutgoingReimbursementDTO> getAllReimbursementByUserId(int userId) {
        List<Reimbursement> reimbursements = reimbursementDAO.findByUser_UserId(userId);

        List<OutgoingReimbursementDTO> returnDTO = new ArrayList<>();
        for (Reimbursement reimbursement : reimbursements) {
            //Create OutgoingReimbursementDTO and set attributes
            OutgoingReimbursementDTO dto = new OutgoingReimbursementDTO();
            dto.setReimbursementId(reimbursement.getReimbursementId());
            dto.setDescription(reimbursement.getDescription());
            dto.setAmount(reimbursement.getAmount());
            dto.setStatus(reimbursement.getStatus());
            //Create UserDTO and set it to User attribute in OutgoingReimbursementDTO
            UserDTO user = new UserDTO();
            user.setUserId(reimbursement.getUser().getUserId());
            user.setFirstName(reimbursement.getUser().getFirstName());
            user.setLastName(reimbursement.getUser().getLastName());
            user.setUsername(reimbursement.getUser().getUsername());
            user.setRole(reimbursement.getUser().getRole());
            dto.setUser(user);
            returnDTO.add(dto);
        }
        return returnDTO;
    }


    
}
