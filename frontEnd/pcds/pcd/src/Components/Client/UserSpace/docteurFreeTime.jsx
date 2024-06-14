import React, { useEffect ,useState} from 'react';
import NavBarClient from "../NavbarClient/NavbarClient"
import Footer from '../../Footer/Footer';
import { useLocation } from 'react-router-dom';
import {Appointement, getAllDemandes,initializeWeb3} from "../../../smartContractHandeler"
import { getDocteurFreeTime, getUserData,getUserDataDocteur, makeAppointement } from '../../../api/clientApi';

export default function DocteurFreeTime() {
  // Dummy data for demonstration
  const location = useLocation();
  const rowData = location.state ? location.state.rowData : null;
  const [schedules, setSchedules] = useState([]);
  useEffect(()=>{
      const getTheData=async (rowData)=>{
        if(rowData){
          const data=await getDocteurFreeTime(rowData);
          setSchedules(data);
        }
     
      }
        getTheData(rowData)
  },[])
  const handleGetIt = async (schedule) => {
    const dataClient = await getUserData();
    const dataDocteur=await getUserDataDocteur(schedule);
    console.log(dataDocteur.MetaMaskAddress,dataClient.MetaMaskAddress)
     const result=await Appointement(window.state,dataDocteur.MetaMaskAddress,dataClient.MetaMaskAddress)
     if(result){
      function formatDateToISO8601(date) {
        // Extract date components
        const year = date.getUTCFullYear();
        const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(date.getUTCDate()).padStart(2, '0');
        const hours = String(date.getUTCHours()).padStart(2, '0');
        const minutes = String(date.getUTCMinutes()).padStart(2, '0');
        const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    
        // Construct ISO 8601 formatted string
        const isoString = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
    
        return isoString;
    }   
      const date = new Date(schedule.scheduleDate);
      schedule.scheduleDate=formatDateToISO8601(date)
  
      const result1=await makeAppointement(schedule)
     }
  };
  return (
    <div className="container-fluid mt-4">
        <NavBarClient/>
         <div style={{marginTop:'200px',marginBottom:'200px'}}>
         <h2 className="mb-3">Docteur Free Time</h2>
      <table className="table">
        <thead>
          <tr>
            <th>schedule_id</th>
            <th>scheduleDate</th>
            <th>docteurEmail</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {/* Map through the schedules array and render each schedule */}
          {schedules.map((schedule) => (
            <tr key={schedule.schedule_id}>
              <td>{schedule.schedule_id}</td>
              <td>{schedule.scheduleDate}</td>
              <td>{schedule.docteurEmail}</td>
              <td>
                <button className="btn btn-primary" onClick={() => handleGetIt(schedule)}>Get It</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
         </div>
         <Footer/>
    </div>
  );
}
