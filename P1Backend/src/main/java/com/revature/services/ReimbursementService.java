package com.revature.services;

import com.revature.DAOs.ReimbursementDAO;
import com.revature.DAOs.UserDAO;
import com.revature.models.DTOs.IncomingReimbursementDTO;
import com.revature.models.DTOs.IncomingReimbursementStatusDTO;
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

    //Insert a new reimbursement into the DB(get user by ID and make a reimbursement object)
    public Reimbursement insertReimbursement(IncomingReimbursementDTO reimbursementDTO) {

        if(reimbursementDTO.getAmount() <= 0) {
            throw new IllegalArgumentException("Amount must be greater than 0!");
        }
        if(reimbursementDTO.getDescription().isBlank()) {
            throw new IllegalArgumentException("Description cannot be empty!");
        }

        Reimbursement newReimbursement = new Reimbursement(
                0,
                reimbursementDTO.getDescription(),
                reimbursementDTO.getAmount(),
                reimbursementDTO.getStatus(),
                null
        );

        Optional<User> user = userDAO.findById(reimbursementDTO.getUserId());

        //If the user doesn't exist it will be empty
        if (user.isEmpty()) {
            throw new IllegalArgumentException("User does not exist!");
        } else {
            newReimbursement.setUser(user.get());
        }

        return reimbursementDAO.save(newReimbursement);
    }

    //Get all reimbursements from a user
    public List<OutgoingReimbursementDTO> getAllReimbursementByUserId(int userId) {
        if(userId <= 0) {
            throw new IllegalArgumentException("User ID is invalid!");
        }

        //Get List of all reimbursements
        List<Reimbursement> reimbursements = reimbursementDAO.findByUser_UserId(userId);
        //Create List of OutgoingReimbursementDTO to store return elements
        List<OutgoingReimbursementDTO> returnDTO = new ArrayList<>();

        for (Reimbursement reimbursement : reimbursements) {
            //Create OutgoingReimbursementDTO and set attributes
            OutgoingReimbursementDTO reimbursementDTO = new OutgoingReimbursementDTO(
                    reimbursement.getReimbursementId(),
                    reimbursement.getDescription(),
                    reimbursement.getAmount(),
                    reimbursement.getStatus(),
                    null
            );
            //Create UserDTO and set it to User attribute in OutgoingReimbursementDTO
            UserDTO userDTO = new UserDTO(
                    reimbursement.getUser().getUserId(),
                    reimbursement.getUser().getFirstName(),
                    reimbursement.getUser().getLastName(),
                    reimbursement.getUser().getUsername(),
                    reimbursement.getUser().getRole()
            );
            reimbursementDTO.setUser(userDTO);
            returnDTO.add(reimbursementDTO);
        }
        return returnDTO;
    }

    //Get all reimbursements from every user. Can only be used by a manager
    public List<OutgoingReimbursementDTO> getAllReimbursements() {
        //Get List of all reimbursements
        List<Reimbursement> reimbursements = reimbursementDAO.findAll();
        //Create List of OutgoingReimbursementDTO to store return elements
        List<OutgoingReimbursementDTO> returnDTO = new ArrayList<>();

        for (Reimbursement reimbursement : reimbursements) {
            //Create OutgoingReimbursementDTO and set attributes
            OutgoingReimbursementDTO reimbursementDTO = new OutgoingReimbursementDTO(
                    reimbursement.getReimbursementId(),
                    reimbursement.getDescription(),
                    reimbursement.getAmount(),
                    reimbursement.getStatus(),
                    null
            );
            //Create UserDTO and set it to User attribute in OutgoingReimbursementDTO
            UserDTO userDTO = new UserDTO(
                    reimbursement.getUser().getUserId(),
                    reimbursement.getUser().getFirstName(),
                    reimbursement.getUser().getLastName(),
                    reimbursement.getUser().getUsername(),
                    reimbursement.getUser().getRole()
            );
            reimbursementDTO.setUser(userDTO);
            returnDTO.add(reimbursementDTO);
        }
        return returnDTO;
    }

    //Get all pending reimbursements from every user. Can only be used by a manager
    public List<OutgoingReimbursementDTO> getAllPendingReimbursements() {
        //Get List of all reimbursements
        List<Reimbursement> reimbursements = reimbursementDAO.findAll();
        //Create List of OutgoingReimbursementDTO to store return elements
        List<OutgoingReimbursementDTO> returnDTO = new ArrayList<>();

        for (Reimbursement reimbursement : reimbursements) {
            if(reimbursement.getStatus().equals("pending")) {
                //Create OutgoingReimbursementDTO and set attributes
                OutgoingReimbursementDTO reimbursementDTO = new OutgoingReimbursementDTO(
                        reimbursement.getReimbursementId(),
                        reimbursement.getDescription(),
                        reimbursement.getAmount(),
                        reimbursement.getStatus(),
                        null
                );
                //Create UserDTO and set it to User attribute in OutgoingReimbursementDTO
                UserDTO userDTO = new UserDTO(
                        reimbursement.getUser().getUserId(),
                        reimbursement.getUser().getFirstName(),
                        reimbursement.getUser().getLastName(),
                        reimbursement.getUser().getUsername(),
                        reimbursement.getUser().getRole()
                );
                reimbursementDTO.setUser(userDTO);
                returnDTO.add(reimbursementDTO);
            }
        }
        return returnDTO;
    }

    //Update a reimbursement with a new status
    public OutgoingReimbursementDTO updateReimbursementStatus(IncomingReimbursementStatusDTO newStatus) {
        if(newStatus.getReimbursementId() <= 0) {
            throw new IllegalArgumentException("Reimbursement ID is invalid!");
        }
        if(newStatus.getStatus().isBlank()) {
            throw new IllegalArgumentException("Status cannot be empty!");
        }
        Reimbursement reimbursement = reimbursementDAO.findById(newStatus.getReimbursementId()).get();
        reimbursement.setStatus(newStatus.getStatus());
        reimbursementDAO.save(reimbursement);

        OutgoingReimbursementDTO reimbursementDTO = new OutgoingReimbursementDTO(
                reimbursement.getReimbursementId(),
                reimbursement.getDescription(),
                reimbursement.getAmount(),
                reimbursement.getStatus(),
                null
        );
        //Create UserDTO and set it to User attribute in OutgoingReimbursementDTO
        UserDTO userDTO = new UserDTO(
                reimbursement.getUser().getUserId(),
                reimbursement.getUser().getFirstName(),
                reimbursement.getUser().getLastName(),
                reimbursement.getUser().getUsername(),
                reimbursement.getUser().getRole()
        );
        reimbursementDTO.setUser(userDTO);

        return reimbursementDTO;
    }
}
