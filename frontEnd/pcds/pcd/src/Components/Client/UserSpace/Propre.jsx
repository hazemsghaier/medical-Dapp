import React, { useState, useEffect } from 'react';
import Rendezvous from './Rendezvous';
import { getAppointements } from '../../../api/rendez-vous';
import './Propre.css';
import Web3 from 'web3';
import simpleStorage from "../../../../../../build/contracts/fileSystem.json";


const Propre = () => {
  const [confirmedAppointments, setConfirmedAppointments] = useState([]);
  const [nonConfirmedAppointments, setNonConfirmedAppointments] = useState([]);

  useEffect(() => {
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
    const fetchAppointments = async () => {
      try {
        const result = await getAppointements();
        const confirmed = result.filter(item => item.statue === true).map(item => ({
          id: item.appointement_id,
          date: item.appointementDate,
          email: item.docteurEmail,
          name: 'Doctor Name', // Assuming you need to provide a name for the doctor.
          status: item.statue
        }));
        const nonConfirmed = result.filter(item => item.statue === false).map(item => ({
          id: item.appointement_id,
          date: item.appointementDate,
          email: item.docteurEmail,
          name: 'Doctor Name', // Assuming you need to provide a name for the doctor.
          status: item.statue
        }));
        setConfirmedAppointments(confirmed);
        setNonConfirmedAppointments(nonConfirmed);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div style={{ marginTop: '150px', margin: '50px' }}>
      <Rendezvous
        title='rendez-vous confirmé'
        btn='retarder Rdv'
        cname='btn0'
        name='doctor'
        edit='edit'
        data={confirmedAppointments}
      />
      <Rendezvous
        title='rendez-vous non confirmé'
        btn='annuler Rdv'
        cname='btn1'
        name='doctor'
        edit='edit'
        data={nonConfirmedAppointments}
      />
    </div>
  );
};

export default Propre;
