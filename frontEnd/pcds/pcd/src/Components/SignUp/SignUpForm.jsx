import "./SignUpForm.css"
import { useState ,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "../../api/authApi"
import Web3 from 'web3';
import simpleStorage from "../../../../../build/contracts/fileSystem.json";
import { addNewClient } from "../../smartContractHandeler";


import { FaUser, FaLock, FaKey ,FaPhone} from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { generateKeyPair } from "../../crypto/cryptage";

const SignUpForm = () => {
    const navigate=useNavigate();
    const [action, setAction] = useState("Sign Up As A Doctor");
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [metaMask, setMetamask] = useState('');
    const [publicKey, setPublicKey] = useState('');
    const [secretKey, setSecretKey] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    useEffect(() => {
        const connectToMetaMask = async () => {
          if (window.ethereum) {
          
            try {
              // Request account access using window.ethereum.request
              const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
              console.log(accounts)
              const web3 = new Web3(window.ethereum);
              const networkId = await web3.eth.net.getId();
              const deployedNetwok=simpleStorage.networks[networkId];
              const contract= new web3.eth.Contract(simpleStorage.abi,deployedNetwok.address)
              console.log("MetaMask is connected.",networkId,deployedNetwok.address);
              window.state={web3,contract};
              // Now you can use web3 to interact with Ethereum
              setMetamask(accounts[0])
            } catch (error) {
              console.error("User denied account access:", error);
            }
          } else {
            console.error("MetaMask is not installed.");
          }
        };
        connectToMetaMask();
      }, []);
    const handleSubmit = async () => {
        if(action==="Sign Up As A Doctor"){
            const result=await signUp({
            email,
            firstName,
            lastName,
            password,
            publicKey,
            key:secretKey,
            MetaMaskAddress: metaMask,
            telNumber:phoneNumber
           
          })
          if(result){
            navigate("/doctor/profile")
          }else{
            console.log("no")
          }
        }else{
           await addNewClient(window.state,publicKey,2)
            const result=await signUp({
                email,
                firstName,
                lastName,
                password,
                publicKey,
                MetaMaskAddress: metaMask,
                telNumber:phoneNumber
              })
              if(result){
                navigate("/client/profile")
              }else{
                console.log("no")
              }
        }
    };
    const handelKey=()=>{
        const [privateKey,publicKey]=generateKeyPair()
        localStorage.setItem("privateKey",privateKey)
        setPublicKey(publicKey);
    }

    return (
        <div className="centered">
          <div className="container">
            <button  className="btn btn-primary" onClick={handelKey}>generate keys</button>
            <div className="header">
                <div className="text">
                    <h1>{action}</h1>
                </div>
                <div className="underline"></div>
            </div>
            <div className="inputs">
                <div className="input">
                    <FaUser className="icon" />
                    <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </div>
                <div className="input">
                    <FaUser className="icon" />
                    <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </div>
                <div className="input">
                    <MdEmail className="icon" />
                    <input type="email" placeholder="####.####@ensi-uma.tn" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="input">
                    <FaLock className="icon" />
                    <input type="password" placeholder="Choisir un mot de passe !" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="input">
                    <FaLock className="icon" />
                    <input type="text" placeholder="Metamask Address" value={metaMask} onChange={(e) => setMetamask(e.target.value)} />
                </div>
                <div className="input">
                    <FaKey className="icon" />
                    <input type="password" placeholder="Your Public Key" value={publicKey} onChange={(e) => setPublicKey(e.target.value)} />
                </div>
                <div className="input">
                    <FaPhone className="icon" />
                    <input type="tel" placeholder="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                </div>
            </div>
            {action === "Sign Up As A Client" ? null : (
                <div className="secretkey">
                    <FaKey className="icon" />
                    <input type="password" placeholder="Your Secret Key" value={secretKey} onChange={(e) => setSecretKey(e.target.value)} />
                </div>
            )}
            <div className="submit-container">
                <div className={action === "Sign Up As A Client" ? "submit gray" : "submit"} onClick={() => { setAction("Sign Up As A Doctor") }}>Sign Up As A Doctor</div>
                <div className={action === "Sign Up As A Doctor" ? "submit gray" : "submit"} onClick={() => { setAction("Sign Up As A Client") }}>Sign Up As A Client</div>
            </div>
            <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Sign Up</button>
        </div>
        </div>
    )
}

export default SignUpForm;
