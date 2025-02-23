package com.revature.controllers;

import com.revature.aspects.ManagerOnly;
import com.revature.models.DTOs.IncomingReimbursementStatusDTO;
import com.revature.models.DTOs.OutgoingReimbursementDTO;
import com.revature.models.DTOs.UserDTO;
import com.revature.models.User;
import com.revature.services.ReimbursementService;
import com.revature.services.UserService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users") //Requests ending in /users will go to this Controller
@CrossOrigin(value = "http://localhost:5173", allowCredentials = "true" )
public class UserController {
    private final UserService userService;
    private final ReimbursementService reimbursementService;

    @Autowired
    public UserController(UserService userService, ReimbursementService reimbursementService) {
        this.userService = userService;
        this.reimbursementService = reimbursementService;
    }

    @ManagerOnly
    @GetMapping
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @ManagerOnly
    @GetMapping("/all-reimbursements")
    public ResponseEntity<List<OutgoingReimbursementDTO>> getAllReimbursementsForAllUsers() {
        return ResponseEntity.ok(reimbursementService.getAllReimbursements());
    }

    @ManagerOnly
    @GetMapping("/all-pending-reimbursements")
    public ResponseEntity<List<OutgoingReimbursementDTO>> getAllPendingReimbursementsForAllUsers() {
        return ResponseEntity.ok(reimbursementService.getAllPendingReimbursements());
    }

    @ManagerOnly
    @PatchMapping("/reimbursement-status-change")
    public ResponseEntity<OutgoingReimbursementDTO> updateReimbursement(@RequestBody IncomingReimbursementStatusDTO newStatus) {
        return ResponseEntity.ok(reimbursementService.updateReimbursementStatus(newStatus));
    }

    @Transactional
    @ManagerOnly
    @DeleteMapping("/delete/{userId}")
    public ResponseEntity<Integer> deleteUser(@PathVariable int userId) {
        //Delete the user by their ID
        return ResponseEntity.ok(userService.deleteUser(userId));
    }
}
