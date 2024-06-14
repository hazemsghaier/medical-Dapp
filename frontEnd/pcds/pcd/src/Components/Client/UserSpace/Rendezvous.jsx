import React from 'react';
import { clientRemoveAppointement } from '../../../api/rendez-vous';
const Rendezvous = (props) => {
  const { data, title, cname, btn, name, edit, hidden, aa, ccname, bb } = props;

  const handleButtonClick = async (email,date) => {
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
    let date1 = new Date(date);
    date1=formatDateToISO8601(date1)
    await clientRemoveAppointement(email,date1);
    window.location.reload();
  };

  return (
    <>
      <h3 style={{ marginTop: '200px' }}>{title}</h3>
      <table className="table table-striped" style={{ marginBottom: '50px' }}>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">{name}</th>
            <th scope="col">email</th>
            <th scope="col">date</th>
            <th scope="col">{edit}</th>
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
                  onClick={() => handleButtonClick(item.email,item.date)}
                >
                  {btn}
                </button>
              </td>
              <td className={hidden}>
                <button
                  type="button"
                  className={ccname}
                  onClick={() => handleButtonClick(item.email,item.date)}
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

export default Rendezvous;
