// UserReimbursementsTable.js
import { useState, useEffect } from "react";
import axios from "axios";
import { Reimbursement } from "../../Interfaces/Reimbursement";
import { Button, Container, Tab, Table, Tabs } from "react-bootstrap";

const UserReimbursementsTable = ({ userId }: { userId: number }) => {
  const [reimbursements, setReimbursements] = useState<Reimbursement[]>([]);
  const [filteredReimbursements, setFilteredReimbursements] = useState<
    Reimbursement[]
  >([]);
  const [status, setStatus] = useState<string>("all");

  useEffect(() => {
    console.log("userId changed:", userId);
    fetchReimbursements();
  }, [userId]);

  useEffect(() => {
    if (reimbursements.length > 0 && filteredReimbursements.length === 0) {
      handleStatusChange("all");
    }
  }, [reimbursements]);

  useEffect(() => {
    if (userId !== 0) {
      const filteredReimbursements = reimbursements.filter((reimbursement) => reimbursement.user.userId === userId);
      setFilteredReimbursements(filteredReimbursements);
    } else {
      setFilteredReimbursements(reimbursements);
    }
  }, [userId,]);

  const fetchReimbursements = async () => {
    const response = await axios.get(
      userId === 0
        ? `http://localhost:8080/users/all-reimbursements`
        : `http://localhost:8080/reimbursement?userId=${userId}`,
      { withCredentials: true }
    );
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
      handleStatusChange(status);
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
      handleStatusChange(status);
    } catch (error) {
      alert("Something went wrong. Try again.");
    }
  };

  const handleStatusChange = (status: string) => {
    setStatus(status);
    const tempReimbursements = reimbursements.filter((reimbursement) => {
      if (status === "all") return true;
      return reimbursement.status === status;
    });
    console.log("Temp reimbursements:", tempReimbursements);
    setFilteredReimbursements(tempReimbursements);
    console.log("Filtered reimbursements:", filteredReimbursements);
  };

  const sortedReimbursements = filteredReimbursements.sort(
    (a, b) => a.reimbursementId - b.reimbursementId
  );

  return (
    <div>
      {sortedReimbursements === null || sortedReimbursements.length === 0 ? (
        <p>No reimbursements found.</p>
      ) : (
        <Container className="d-flex flex-column align-items-center mt-5">
          <Tabs
            defaultActiveKey="all"
            id="reimbursement-tabs"
            className="mb-3"
            onSelect={(k) => handleStatusChange(k as string)}
          >
            <Tab eventKey="all" title="All"></Tab>
            <Tab eventKey="pending" title="Pending"></Tab>
            <Tab eventKey="approved" title="Approved"></Tab>
            <Tab eventKey="denied" title="Denied"></Tab>
          </Tabs>

          <h3>
            {status === "all"
              ? "All Reimbursements "
              : status === "pending"
              ? "All Pending Reimbursements "
              : status === "approved"
              ? "All Approved Reimbursements "
              : status === "denied"
              ? "All Denied Reimbursements "
              : ""}
            for {userId === 0 ? "all Users" : `User ${userId}`}
          </h3>

          <Table key={userId}>
            <thead>
              <tr>
                <th>Reimbursement ID</th>
                <th>User ID</th>
                <th>Amount in Dollars</th>
                <th>Description</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {sortedReimbursements.map((reimbursement) => (
                <tr key={reimbursement.reimbursementId}>
                  <td>{reimbursement.reimbursementId}</td>
                  <td>{reimbursement.user.userId}</td>
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
        </Container>
      )}
    </div>
  );
};

export default UserReimbursementsTable;
