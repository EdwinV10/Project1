package com.revature.DAOs;

import com.revature.models.Reimbursement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ReimbursementDAO extends JpaRepository<Reimbursement, Integer> {

    //Find a list of reimbursements by their User's id
    List<Reimbursement> findByUser_UserId(int userId);
    //Delete a reimbursement by their user id
    public void deleteByReimbursementId(int userId);
}
