package com.revature.models.DTOs;

public class OutgoingReimbursementDTO {
    private int reimbursementId;
    private String description;
    private int amount;
    private String status;
    private UserDTO user;

    public OutgoingReimbursementDTO() {
    }

    public OutgoingReimbursementDTO(int reimbursementId, String description, int amount, String status, UserDTO user) {
        this.reimbursementId = reimbursementId;
        this.description = description;
        this.amount = amount;
        this.status = status;
        this.user = user;
    }

    public int getReimbursementId() {
        return reimbursementId;
    }

    public String getDescription() {
        return description;
    }

    public int getAmount() {
        return amount;
    }

    public String getStatus() {
        return status;
    }

    public UserDTO getUser() {
        return user;
    }

    public void setReimbursementId(int reimbursementId) {
        this.reimbursementId = reimbursementId;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setUser(UserDTO user) {
        this.user = user;
    }

    @Override
    public String toString() {
        return "OutgoingReimbursementDTO{" +
                "reimbursementId=" + reimbursementId +
                ", description='" + description + '\'' +
                ", amount=" + amount +
                ", status='" + status + '\'' +
                ", user=" + user +
                '}';
    }
}
