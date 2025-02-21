import { useEffect, useState } from "react"
import { Reimbursement } from "../../Interfaces/Reimbursement"
import axios from "axios"
import { Container, Table } from "react-bootstrap"
import { store } from "../../GlobalData/store"

export const ReimbursementTable: React.FC = () => {

    const [reimbursements, setReimbursements] = useState<Reimbursement[]>([])

    //useEffect is a hook that runs after the first render of the component
    useEffect(() => {
        getReimbursements()
    }, []) //We want this to run only once, so we pass an empty array as the second argument

    //Function to get all users from the backend (HTTP request)
    const getReimbursements = async () => {
        console.log(store.loggedInUser.userId)
        try{
            const response = await axios.get(`http://localhost:8080/reimbursement?userId=${store.loggedInUser.userId}`, {withCredentials: true})            
            //Lets store the user data in our "users" state object
            setReimbursements(response.data)
            } catch(error){
            console.log(error)
            alert("Something went wrong trying to fetch users")
        }
    }

    return(
        <Container className="d-flex flex-column align-items-center mt-5">
            <h3>Users: </h3>

            <Table className="table-dark table-hover table-striped w-50">
                <thead>
                    <tr>
                        <th>Reimbursement ID</th>
                        <th>Description</th>
                        <th>amount</th>
                        <th>Status</th>
                    </tr>
                </thead>

                <tbody className="table-secondary">
                    {reimbursements.map((reimbursement:Reimbursement) => (
                        <tr key={reimbursement.reimbursementId}>
                            <td>{reimbursement.reimbursementId}</td>
                            <td>{reimbursement.description}</td>
                            <td>{reimbursement.amount}</td>
                            <td>{reimbursement.status}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    )
}