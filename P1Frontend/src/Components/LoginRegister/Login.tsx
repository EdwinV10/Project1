import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Button, Container, Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { store } from "../../GlobalData/store";

export const Login: React.FC = () => {

    //We can use the useNavigate hook to navigate between components pramatically
    const navigate = useNavigate()

    const usernameRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        //if the current value of the ref is truthy...
        if (usernameRef.current) {
            usernameRef.current.focus(); //focus it so the user can type right away
        }
    }, []); //remember [] means this happens on component load

    const[loginCreds, setLoginCreds] = useState({
        username: "",
        password: ""
    })

    //Function to store inputs
    const storeValues = (event: React.ChangeEvent<HTMLInputElement>) => {
        //I'm going to store the name and value of of the inputs for ease of use below
        const name = event.target.name
        const value = event.target.value

        //"Take whatever input was changed, and set the matching state field to the value of that input"
        //[name] can be EITHER username or password. This ugly code lends flexibility
        //This syntax is less necissary if we just have 2 fields, but way more useful if there are like 50
        setLoginCreds((loginCreds) => ({...loginCreds, [name]:value}))
    }

    //Function to log in
    //navigates to /users if a manager logged in, and /games if a user logged in
    const login = async () => {
        try{
            const response = await axios.post("http://localhost:8080/auth/login", loginCreds, {withCredentials: true})
            store.loggedInUser = response.data //This is our logged in user data from the backend

            alert(store.loggedInUser.username + " has logged in")

            if(store.loggedInUser.role === "manager"){
                navigate("/users")
            }else{
                navigate("/reimbursement")
            }
        } catch{
            alert("Something went wrong trying to log in")
        }
    }

    return(
        /*Bootstrap gives us this Container element that does some default padding and centering*/
        <Container> 

            <h1>Welcome</h1>
                <h3>Please Log In:</h3>
                
                <div>
                    <Form.Control
                        type="text"
                        placeholder="username"
                        name="username"
                        ref={usernameRef} //attach our usernameRef here!
                        //This is how our useRef knows what to focus.
                        onChange={storeValues}
                    />
                </div>

                <div>
                    <Form.Control
                        type="password"
                        placeholder="password"
                        name="password"
                        onChange={storeValues}
                    />
                </div>
                

            <Button className="btn-success m-1" onClick={login}>Login</Button>
            <Button className="btn-dark" onClick={()=>navigate("/register")}>Register</Button>
        </Container>
    )
}