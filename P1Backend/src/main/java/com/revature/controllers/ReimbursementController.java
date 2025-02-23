package com.revature.controllers;

import com.revature.aspects.ManagerOnly;
import com.revature.models.DTOs.IncomingReimbursementDTO;
import com.revature.models.DTOs.OutgoingReimbursementDTO;
import com.revature.models.DTOs.UserDTO;
import com.revature.models.Reimbursement;
import com.revature.services.ReimbursementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reimbursement")
@CrossOrigin(value = "http://localhost:5173", allowCredentials = "true" )
public class ReimbursementController {

    private final ReimbursementService reimbursementService;

    @Autowired
    public ReimbursementController(ReimbursementService reimbursementService) {
        this.reimbursementService = reimbursementService;
    }

    @PostMapping
    public ResponseEntity<Reimbursement> insertReimbursement(@RequestBody IncomingReimbursementDTO remDTO) {
        return ResponseEntity.accepted().body(reimbursementService.insertReimbursement(remDTO));
    }

    @GetMapping
    public ResponseEntity<List<OutgoingReimbursementDTO>> getAllReimbursements(@RequestParam("userId") int userId) {
        return ResponseEntity.ok(reimbursementService.getAllReimbursementByUserId(userId));
    }

}
