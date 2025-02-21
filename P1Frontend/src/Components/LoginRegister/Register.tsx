import { Button, Container, Form } from "react-bootstrap"
import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const Register: React.FC = () => {
    const navigate = useNavigate()

    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [firstName, setFirstName] = useState<string>("")
    const [lastName, setLastName] = useState<string>("")


    const storeValues = (event:React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.name === "username"){
            setUsername(String(event.target.value))
        } else if(event.target.name === "password"){
            setPassword(String(event.target.value))
        } else if(event.target.name === "firstName"){
            setFirstName(String(event.target.value))
        } else if(event.target.name === "lastName"){
            setLastName(String(event.target.value))
        }
    }

    const register = async () => {
        //POST request with hardcoded user info
        try{
            const response = await axios.post("http://localhost:8080/auth/register", {
            firstName: firstName,
            lastName: lastName,
            username: username,
            password: password
            })
            navigate("/login")
        }catch{
            alert("Something went wrong trying to register")
        }
    }


    return(
        <Container>
          <div>
              <h1>New here? Create an Account for free!</h1>

              <div>
                  <Form.Control
                      type="text"
                      placeholder="username"
                      name="username"
                      onChange={storeValues}
                  />
              </div>
              <div>
                  <Form.Control
                      type="text"
                      placeholder="firstName"
                      name="firstName"
                      onChange={storeValues}
                  />
              </div>
              <div>
                  <Form.Control
                      type="text"
                      placeholder="lastName"
                      name="lastName"
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

              <div>
                <Button onClick={register}>Create Account!</Button>
              </div>
          </div>
      </Container>
  )
}