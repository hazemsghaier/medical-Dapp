import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap
import { docteurRemoveFreeTime, seeDocteurFreeTime } from '../../api/rendez-vous';

const DocteurFreeTime = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await seeDocteurFreeTime(props.email);
        console.log(result)

        // Assuming result is an array of objects with a "DATE" field
        const dates = result.map(item => ({ id: item.schedule_id, date: item.scheduleDate }));
        setData(dates);
        console.log(dates)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [props.email]);

  const handleRemove = async (date) => {
    setData(data.filter(item => item.date !== date));

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
    await docteurRemoveFreeTime(date1);
  };

  return (
    <div className="container mt-5" style={{ backgroundColor: 'white', border: 'none' }}>
      <h2 className="mb-4 text-center">Free Time</h2>
      <div
        className="p-4 rounded shadow"
        style={{ backgroundColor: 'white' }}
      >
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.date}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleRemove(item.date)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DocteurFreeTime;
