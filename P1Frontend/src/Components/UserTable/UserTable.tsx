import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { Button, Collapse, Container, Table } from "react-bootstrap";
import { User } from "../../Interfaces/User";
import UserReimbursementsTable from "../Reimbursements/UserReimbursementTable";
import { useNavigate } from "react-router-dom";
import { store } from "../../GlobalData/store";

export const UserTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number>(0);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/users", {
        withCredentials: true,
      });
      setUsers(response.data);
    } catch (error: any) {
      if (error.response) {
        alert(`Error: ${error.response.data}`);
        navigate("/");
      } else {
        alert("Something went wrong trying to fetch users");
      }
    }
  };

  const handleRowClick = (userId: number) => {
    setSelectedUserId(userId);
  };

  const fireUser = async (user: User) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/users/delete/${user.userId}`,
        { withCredentials: true }
      );
      setUsers(users.filter((u) => u.userId !== user.userId));
    } catch (error) {
      alert("Something went wrong. Try again.");
    }
  };

    const sortedUsers = users.sort((a, b) => a.userId - b.userId);

  return (
    <Container className="d-flex flex-column align-items-center mt-5">
      <div className="position-absolute top-0 end-0">
        <Button variant="info" onClick={() => setOpen(!open)}>
          {open ? "Hide User Info" : "Show User Info"}
        </Button>
        <Collapse in={open}>
          <div className="mt-2">
            {/* User information content goes here */}
            <p>User Name: {store.loggedInUser.username}</p>
            <p>User ID: {store.loggedInUser.userId}</p>
            <p>First Name : {store.loggedInUser.firstName}</p>
            <p>Last Name : {store.loggedInUser.lastName}</p>
          </div>
        </Collapse>
      </div>

      <h3>Users: </h3>
      <Table className="table-dark table-hover table-striped w-50">
        <thead>
          <tr>
            <th>User Id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
            <th>Role</th>
            <th>Options</th>
          </tr>
        </thead>

        <tbody className="table-secondary">
          {sortedUsers.map((user: User) => (
            <tr key={user.userId} onClick={() => handleRowClick(user.userId)}>
              <td>{user.userId}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.username}</td>
              <td>{user.role}</td>
              <td>
                <Button variant="outline-danger" onClick={() => fireUser(user)}>
                  Fire
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button
        variant="outline-primary"
        onClick={() => navigate("/reimbursement")}
      >
        View My Reimbursements
      </Button>
      <Button variant="outline-primary" onClick={() => handleRowClick(0)}>
        View All Reimbursements
      </Button>
      {<UserReimbursementsTable userId={selectedUserId} />}
    </Container>
  );
};
