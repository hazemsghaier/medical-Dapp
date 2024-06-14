import React from 'react';
import { docteurRemoveAppointement,accepteDemande } from '../../api/rendez-vous';
import Web3 from 'web3';
import { AccepteDemande } from '../../smartContractHandeler';
import { getUserDataForDocteur,getDataDocteur } from '../../api/clientApi';

const RendezVous = (props) => {
  const { data, title, cname, btn, name, edit, hidden, aa, ccname, bb } = props;

  const handleButtonClick = async (email, date) => {
    function formatDateToISO8601(date) {
      const year = date.getUTCFullYear();
      const month = String(date.getUTCMonth() + 1).padStart(2, '0');
      const day = String(date.getUTCDate()).padStart(2, '0');
      const hours = String(date.getUTCHours()).padStart(2, '0');
      const minutes = String(date.getUTCMinutes()).padStart(2, '0');
      const seconds = String(date.getUTCSeconds()).padStart(2, '0');
      const isoString = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
      return isoString;
    }


    let date1 = new Date(date);
    date1 = formatDateToISO8601(date1);

    await docteurRemoveAppointement(email, date1);
    window.location.reload();
  };
  const handleButtonClick1=async (email,id)=>{
      await accepteDemande(email,id)
      //get user metaMAskAddress
      const dataClient = await getUserDataForDocteur(email);
      const dataDocteur=await getDataDocteur();
    
      //get docteur metaMaskAddress 

     const resulte =await AccepteDemande(window.state,dataClient.MetaMaskAddress,dataDocteur.MetaMaskAddress);
     console.log(resulte)
      

      
  }
  return (
    <>
      <h3 style={{ marginTop: '200px' }}>{title}</h3>
      <table className="table table-striped" style={{ marginBottom: '50px' }}>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">patient</th>
            <th scope="col">email</th>
            <th scope="col">date</th>
            <th scope="col">{edit}</th>
            <th scope="col">accepter</th>
            <th scope="col" className={hidden}>{aa}</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <th scope="row">{item.id}</th>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.date}</td>
              <td>
                <button
                  type="button"
                  className={cname}
                  onClick={() => handleButtonClick(item.name, item.date)}
                >
                  {btn}
                </button>
              </td>
              <td>
                <button
                  type="button"
                  className={cname}
                  style={{ backgroundColor: 'green', color: 'white', border: 'none' }}
                  onClick={() => handleButtonClick1(item.name, item.id)}
                >
                  accepte
                </button>
              </td>
              <td className={hidden}>
                <button
                  type="button"
                  className={ccname}
                  onClick={() => handleButtonClick(item.email, item.date)}
                >
                  {bb}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default RendezVous;
