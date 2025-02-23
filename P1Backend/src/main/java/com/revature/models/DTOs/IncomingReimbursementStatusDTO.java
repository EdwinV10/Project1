package com.revature.models.DTOs;

public class IncomingReimbursementStatusDTO {
    private int reimbursementId;
    private String status;

    public IncomingReimbursementStatusDTO() {
    }
    public IncomingReimbursementStatusDTO(int reimbursementId, String status) {
        this.reimbursementId = reimbursementId;
        this.status = status;
    }
    public int getReimbursementId() {
        return reimbursementId;
    }
    public String getStatus() {
        return status;
    }

    public void setReimbursementId(int reimbursementId) {
        this.reimbursementId = reimbursementId;
    }
    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "IncomingReimbursementStatusDTO{" +
                "reimbursementId=" + reimbursementId +
                ", status='" + status + '\'' +
                '}';
    }
}
