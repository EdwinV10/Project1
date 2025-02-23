// UserReimbursementsTable.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Reimbursement } from "../../Interfaces/Reimbursement";
import { Container, Table } from "react-bootstrap";

const UserReimbursementsTable = ({ userId }: { userId: number }) => {
  const [reimbursements, setReimbursements] = useState<Reimbursement[]>([]);

  useEffect(() => {
    const fetchReimbursements = async () => {
      const response = await axios.get(
        `http://localhost:8080/reimbursement?userId=${userId}`,
        { withCredentials: true }
      );
      setReimbursements(response.data);
    };
    fetchReimbursements();
  }, [userId]);

  return (
    <Container className="d-flex flex-column align-items-center mt-5">
      {reimbursements === null || reimbursements.length === 0 ? (
        <p>No reimbursements found.</p>
      ) : (
        <Table>
          <thead>
            <tr>
              <th>Reimbursement ID</th>
              <th>Amount</th>
              <th>Description</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {reimbursements.map((reimbursement) => (
              <tr key={reimbursement.reimbursementId}>
                <td>{reimbursement.reimbursementId}</td>
                <td>{reimbursement.amount}</td>
                <td>{reimbursement.description}</td>
                <td>{reimbursement.status}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default UserReimbursementsTable;
