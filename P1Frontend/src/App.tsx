import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Login } from './Components/LoginRegister/Login'
import 'bootstrap/dist/css/bootstrap.css'
import { Register } from './Components/LoginRegister/Register'
import { SignIn } from './Components/LoginRegister/SignIn'
//^THIS IS A REQUIRED MANUAL IMPORT FOR BOOTSTRAP TO WORK!!!!!

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* empty string or / for path makes the compenet render at startup */}
          <Route path="" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/signin" element={<SignIn/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
