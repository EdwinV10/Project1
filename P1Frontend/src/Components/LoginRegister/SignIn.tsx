import axios from "axios"
import { useState } from "react"
import { Button, Container, Form } from "react-bootstrap"

export const SignIn: React.FC = () => {
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const storeValues = (event:React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.name === "username"){
            setUsername(String(event.target.value))
        } else {
            setPassword(String(event.target.value))
        }
    }

    const register = async () => {
        //POST request with hardcoded user info
        const response = await axios.post("http://localhost:8080/auth/signin", {
            username: username,
            password: password
        })
        .then(()=> {
            alert("User registered!")
        })
    }


    return(
        <Container>
          <div>
              <h1>Please Enter Your Username and Passord!</h1>

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
                      type="password"
                      placeholder="password"
                      name="password"
                      onChange={storeValues}
                  />
              </div>

              <div>
                <Button onClick={register}>Sign In!</Button>
              </div>
          </div>
      </Container>
  )




}