import React, { useState } from 'react';
import './AddFreeTime.css'; // Import the CSS file
import { addFreeTime } from '../../api/rendez-vous';

const AddFreeTime = () => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleTimeChange = (e) => {
    setTime(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Combine date and time
    const combinedDateTime = `${date}T${time}:00Z`;
   await  addFreeTime(combinedDateTime);
    
  };

  return (
    <div className="centered-container">
      <div className="background-container">
        <h2 className="mb-4 text-center">Add Free Time</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="date">Select Date</label>
            <input 
              type="date" 
              className="form-control" 
              id="date" 
              value={date} 
              onChange={handleDateChange} 
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="time">Select Time</label>
            <input 
              type="time" 
              className="form-control" 
              id="time" 
              value={time} 
              onChange={handleTimeChange} 
              required 
            />
          </div>
          <button type="submit" className="btn btn-primary mt-3 w-100">Add</button>
        </form>
      </div>
    </div>
  );
};

export default AddFreeTime;
