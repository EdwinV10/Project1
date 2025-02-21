import axios from "axios"
import { useEffect, useState } from "react"
import { Button, Container, Table } from "react-bootstrap"
import { User } from "../../Interfaces/User"

export const UserTable: React.FC = () => {
    console.log('UserTable component is being rendered!');


    //State object to store the User Array from the backend
    const [users, setUsers] = useState<User[]>([])

    //useEffect is a hook that runs after the first render of the component
    useEffect(() => {
        getAllUsers()
    }, []) //We want this to run only once, so we pass an empty array as the second argument

    //Function to get all users from the backend (HTTP request)
    const getAllUsers = async () => {
        console.log('UserTable component is being rendered!');
        try{
            const response = await axios.get('http://localhost:8080/users', {withCredentials: true})
            console.log("before setting users: ", response.data)
            //Lets store the user data in our "users" state object
            setUsers(response.data)
            console.log("After setting users: ", users)
            } catch(error){
            alert("Something went wrong trying to fetch users")
            console.log(error)
        }
    }

    const updateUser = (user:User) => {
        alert("User " + user.userId + " has been faked updated or deleted")    
    }

    return(
        <Container className="d-flex flex-column align-items-center mt-5">
            <h3>Users: </h3>

            <Table className="table-dark table-hover table-striped w-50">
                <thead>
                    <tr>
                        <th>User Id</th>
                        <th>Username</th>
                        <th>Role</th>
                        <th>Options</th>
                    </tr>
                </thead>

                <tbody className="table-secondary">
                    {users.map((user:User) => (
                        <tr key={user.userId}>
                            <td>{user.userId}</td>
                            <td>{user.username}</td>
                            <td>{user.role}</td>
                            <td>
                                <Button variant="outline-success" onClick={() =>updateUser(user)}>
                                    Promote
                                </Button>
                                <Button variant="outline-danger" onClick={() => updateUser(user)}>
                                    Fire
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    )
}