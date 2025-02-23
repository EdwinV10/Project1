import { useEffect, useState } from "react";
import { Reimbursement } from "../../Interfaces/Reimbursement";
import axios from "axios";
import { Button, Container, Tab, Table, Tabs } from "react-bootstrap";
import { store } from "../../GlobalData/store";
import { useNavigate } from "react-router-dom";

export const ReimbursementTable: React.FC = () => {
  const [reimbursements, setReimbursements] = useState<Reimbursement[]>([]);
  const [filteredReimbursements, setFilteredReimbursements] = useState<Reimbursement[]>([]);
  const [status, setStatus] = useState<string>("all");
  const navigate = useNavigate();

  //useEffect is a hook that runs after the first render of the component
  useEffect(() => {
    getReimbursements();
  }, []);

  useEffect(() => {
    if (reimbursements.length > 0 && filteredReimbursements.length === 0) {
      handleStatusChange("all");
    }
  }, [reimbursements]);

  //Function to get all users from the backend (HTTP request)
  const getReimbursements = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/reimbursement?userId=${store.loggedInUser.userId}`,
        { withCredentials: true }
      );
      setReimbursements(response.data);
    } catch (error: any) {
      if (error.response) {
        alert(`Error: ${error.response.data}`);
      } else {
        alert("Something went wrong. Try again.");
      }
    }
  };

  const handleStatusChange = (status: string) => {
    setStatus(status);
    const filteredReimbursements = reimbursements.filter((reimbursement) => {
      if (status === "all") return true;
      return reimbursement.status === status;
    });
    setFilteredReimbursements(filteredReimbursements);
    console.log(filteredReimbursements);
  };

  return (
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
          ? "All Reimbursements"
          : status === "pending"
          ? "All Pending Reimbursements"
          : status === "approved"
          ? "All Approved Reimbursements"
          : status === "denied"
          ? "All Denied Reimbursements"
          : ""}
      </h3>

      <Table className="table-dark table-hover table-striped w-50">
        <thead>
          <tr>
            <th>Reimbursement ID</th>
            <th>Description</th>
            <th>Amount In Dollars</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody className="table-secondary">
          {filteredReimbursements.sort((a, b) => a.reimbursementId - b.reimbursementId).map((filteredReimbursements: Reimbursement) => (
              <tr key={filteredReimbursements.reimbursementId}>
                <td>{filteredReimbursements.reimbursementId}</td>
                <td>{filteredReimbursements.description}</td>
                <td>{filteredReimbursements.amount}</td>
                <td>{filteredReimbursements.status}</td>
              </tr>
            ))}
        </tbody>
      </Table>
      <Button
        className="btn btn-primary"
        onClick={() => navigate("/newReimbursement")}
      >
        New Reimbursement
      </Button>
      {store.loggedInUser.role === "manager" && (
              <Button variant="outline-secondary" onClick={() => navigate("/users")}>
                Go Back
              </Button>
            )}
    </Container>
  );
};
