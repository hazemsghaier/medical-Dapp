import React, { useEffect, useState } from 'react';
import {login} from "../../api/authApi"
import { FaUser, FaLock } from 'react-icons/fa';
import { Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './LogInForm.css';
import simpleStorage from "../../../../../build/contracts/fileSystem.json";
import Web3 from 'web3';
function LogInForm() {


   useEffect(()=>{
    const connectedWallet=async ()=>{
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        console.log(accounts);
        const web3 = new Web3(window.ethereum);
        const networkId = await web3.eth.net.getId();
        const deployedNetwok=simpleStorage.networks[networkId];
        const contract= new web3.eth.Contract(simpleStorage.abi,deployedNetwok.address)
        console.log("MetaMask is connected.",networkId,deployedNetwok.address);
        window.state={web3,contract};
    }
    connectedWallet();

   },[])
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('')
    const [isDoctor, setIsDoctor] = useState(false); 

    const handleLogin = async (e) => {
        e.preventDefault();
        const result =await login({
            email,
            password
        });
        if(result){
            if (isDoctor) {
                navigate("/doctor/profile"); // Redirect to doctor profile page if user is a doctor
            } else {
                navigate("/client/profile"); // Redirect to client profile page if user is not a doctor
            }
        }else{
            setError('please verify your email and password');

        } 
   
    }

    return (
        <div className="wrapper">
            <form onSubmit={handleLogin} className="form">
                <h1>Login</h1>
                <div className="input-box">
                    <input
                        type="email"
                        placeholder="Email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <FaUser className="icon" />
                </div>
                <div className="input-box">
                    <input
                        type="password"
                        placeholder="Password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <FaLock className="icon" />
                </div>
                <div className="remember-forgot">
                    <label>
                        <input type="checkbox" checked={isDoctor} onChange={() => setIsDoctor(!isDoctor)} /> Are you a doctor?
                    </label>
                    
                </div>
                <div className="remember-forgot">
                    <label>
                        <input type="checkbox" /> Remember me
                    </label>
                    <a href="/doctor/profile">Forgot password?</a>
                </div>
                <button type="submit" className="log"  >Log In</button>
                <div className="register-link">
                    <p>Don't have an account? <a href="/signup">Register now!</a></p>
                </div>
            </form>
            {error && <div><Alert variant="danger">{error}</Alert></div>}
        </div>
        
    );
}

export default LogInForm;
