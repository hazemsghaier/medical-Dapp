import Home from "./Components/routess/Home"
import { Route ,Router,Routes } from "react-router-dom"
import './Styles.css'
import About from "./Components/routess/About"
import Contact from "./Components/routess/Contact"
import Services from "./Components/routess/Services"
import LogIn from "./Components/routess/LogIn"
import SignUp from "./Components/routess/SignUp"
import AccountSettings from "./Components/Client/UserSpace/AccountSettings"
import UserProfil from "./Components/Client/UserProfil/UserProfil"
import Doctors from "./Components/Client/UserSpace/Doctors"
import Help from "./Components/Client/UserSpace/Help"
import DoctorProfil from "./Components/Doctor/DoctorProfil"
import Helpp from './Components/Doctor/doctorSpace/Helpp'
import AccountSett from "./Components/Doctor/doctorSpace/AccountSett"
import ListeClients from "./Components/Doctor/doctorSpace/Clients"
import DocteurFreeTime from "./Components/Client/UserSpace/docteurFreeTime"
import MyForm from "./Components/Doctor/doctorSpace/file"
import  App1 from "./Components/Doctor/doctorSpace/file2"
export default function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/about" element={<About />}/>
        <Route path="/service" element={<Services />}/>
        <Route path="/contact" element={<Contact />}/>
        <Route path="/login" element={<LogIn/>} />
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/client/doctors" element={<Doctors />} />
        <Route path="/client/help" element={<Help />} /> 
        <Route path="/client/profile" element={<UserProfil />} /> 
        <Route path="/client/accountsettings" element={<AccountSettings />} /> 
        <Route path="/doctor/profile" element={<DoctorProfil />} />
        <Route path="/doctor/help" element={<Helpp />} />
        <Route path="/doctor/accountsettings" element={<AccountSett />} />
        <Route path="/doctor/clients" element={<ListeClients />} />
        <Route path="/doctorFreeTime" element={<DocteurFreeTime />} />
        <Route path="/setfile" element={<MyForm />} />
        <Route path="/ffff" element={<App1/>}/>
      </Routes>
    </div>
  )
}

