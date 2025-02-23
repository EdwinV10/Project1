import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { User } from "../../Interfaces/User";
import UserReimbursementsTable from "../Reimbursements/UserReimbursementTable";

export const UserTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number>(0);

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
      } else {
        alert("Something went wrong trying to fetch users");
      }
    }
  };

  const promoteUser = async (user: User) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/users/${user.userId}/promote`,
        { withCredentials: true }
      );
      // Handle success response
    } catch (error) {
      // Handle error response
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

  return (
    <Container className="d-flex flex-column align-items-center mt-5">
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
          {users.map((user: User) => (
            <tr key={user.userId} onClick={() => handleRowClick(user.userId)}>
              <td>{user.userId}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.username}</td>
              <td>{user.role}</td>
              <td>
                <Button
                  variant="outline-success"
                  onClick={() => promoteUser(user)}
                >
                  Promote
                </Button>
                <Button variant="outline-danger" onClick={() => fireUser(user)}>
                  Fire
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {selectedUserId && <UserReimbursementsTable userId={selectedUserId} />}
    </Container>
  );
};
