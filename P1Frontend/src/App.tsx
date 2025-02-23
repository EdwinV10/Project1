import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Login } from './Components/LoginRegister/Login'
import 'bootstrap/dist/css/bootstrap.css'
import { Register } from './Components/LoginRegister/Register'
import { SignIn } from './Components/LoginRegister/SignIn'
import { UserTable } from './Components/UserTable/UserTable'
import { ReimbursementTable } from './Components/Reimbursements/ReimbursementTable'
import { NewReimbursement } from './Components/Reimbursements/NewReimbursement'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* empty string or / for path makes the compenet render at startup */}
          <Route path="" element={<Login/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/signin" element={<SignIn/>}/>
          <Route path="/users" element={<UserTable/>}/>
          <Route path="/reimbursement" element={<ReimbursementTable/>}/>
          <Route path="/newReimbursement" element={<NewReimbursement/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
