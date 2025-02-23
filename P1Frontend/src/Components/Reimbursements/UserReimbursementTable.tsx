// UserReimbursementsTable.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Reimbursement } from "../../Interfaces/Reimbursement";
import { Button, Container, Table } from "react-bootstrap";
import { User } from "../../Interfaces/User";

const UserReimbursementsTable = ({ userId }: { userId: number }) => {
  const [reimbursements, setReimbursements] = useState<Reimbursement[]>([]);

  useEffect(() => {
    fetchReimbursements();
  }, [userId]);

  const fetchReimbursements = async () => {
    const response = await axios.get(
      userId === 0
        ? `http://localhost:8080/users/all-reimbursements`
        : `http://localhost:8080/reimbursement?userId=${userId}`,
      { withCredentials: true }
    );
    console.log(response.data);
    setReimbursements(response.data);
  };

  const approveReimbursement = async (id: number) => {
    try {
      const response = await axios.patch(
        `http://localhost:8080/users/reimbursement-status-change`,
        {
          reimbursementId: id,
          status: "approved",
        },
        { withCredentials: true }
      );
      fetchReimbursements();
    } catch (error) {
      alert("Something went wrong. Try again.");
    }
  };

  const denyReimbursement = async (id: number) => {
    try {
      const response = await axios.patch(
        `http://localhost:8080/users/reimbursement-status-change`,
        {
          reimbursementId: id,
          status: "denied",
        },
        { withCredentials: true }
      );
      fetchReimbursements();
    } catch (error) {
      alert("Something went wrong. Try again.");
    }
  };

  const sortedReimbursements = reimbursements.sort(
    (a, b) => a.reimbursementId - b.reimbursementId
  );

  return (
    <Container className="d-flex flex-column align-items-center mt-5">
      {reimbursements === null || reimbursements.length === 0 ? (
        <p>No reimbursements found.</p>
      ) : (
        <Table>
          <thead>
            <tr>
              <th>Reimbursement ID</th>
              <th>Amount in Dollars</th>
              <th>Description</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {sortedReimbursements.map((reimbursement) => (
              <tr key={reimbursement.reimbursementId}>
                <td>{reimbursement.reimbursementId}</td>
                <td>{reimbursement.amount}</td>
                <td>{reimbursement.description}</td>
                <td>{reimbursement.status}</td>
                <td>
                  <Button
                    variant="outline-success"
                    onClick={() =>
                      approveReimbursement(reimbursement.reimbursementId)
                    }
                  >
                    Approve
                  </Button>
                  <Button
                    variant="outline-danger"
                    onClick={() =>
                      denyReimbursement(reimbursement.reimbursementId)
                    }
                  >
                    Deny
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default UserReimbursementsTable;
