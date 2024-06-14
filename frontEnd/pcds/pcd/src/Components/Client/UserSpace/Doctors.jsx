import React, { useEffect, useState } from 'react';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import NavbarClient from '../NavbarClient/NavbarClient';
import Footer from '../../Footer/Footer';
import { listDocteurs } from '../../../api/clientApi';

export default function ListeDoctors() {
  // Define an array of objects representing each row
  const [rowData, setRowData] = useState([]);

  useEffect(()=>{
    const getAllDocteurs=async ()=>{
      const data=await listDocteurs();
      const updatedRowData = data.map(item => ({
        ...item,
        name: item.name, // Modify name field if needed
        email: item.email, // Modify email field if needed
        // Keep the rest of the fields unchanged
        title: 'Psychotherapeute',
        institute: 'Ensi',
        status: 'Active',
        position: 'Senior'
      }));
      setRowData(updatedRowData);
    }
    getAllDocteurs()

  },[])

  const navigate = useNavigate();
  const [selectedRowData, setSelectedRowData] = useState(null);

  // Function to handle row click
  const handleRowClick = (rowData) => {
    setSelectedRowData(rowData);
  };

  // Function to navigate to another component with the selected data
  const navigateToAnotherComponent = () => {
    if (selectedRowData) {
      // Pass selectedRowData to another component using state or props
      navigate('/doctorFreeTime', { state: { rowData: selectedRowData } });
    } else {
      console.error('No row selected');
    }
  };

  return (
    <>
      <NavbarClient />
      <MDBTable align='middle' style={{ marginTop: '200px', marginBottom: '100px', marginLeft: '10px', marginRight: '10px' }}>
        <MDBTableHead>
          <tr>
            <th scope='col'>Name</th>
            <th scope='col'>Title</th>
            <th scope='col'>Status</th>
            <th scope='col'>Position</th>
            <th scope='col'>rendez-vous</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {/* Map through the rowData array and render each row */}
          {rowData.map((row, index) => (
            <tr key={index}>
              <td>
                <div className='d-flex align-items-center'>
                  {/* Add your image here */}
                  <div className='ms-3'>
                    <p className='fw-bold mb-1'>{row.name}</p>
                    <p className='text-muted mb-0'>{row.email}</p>
                  </div>
                </div>
              </td>
              <td>
                <p className='fw-normal mb-1'>{row.title}</p>
                <p className='text-muted mb-0'>{row.institute}</p>
              </td>
              <td>
                {/* Use MDBBadge for status */}
                <MDBBadge color={row.status === 'Active' ? 'success' : row.status === 'Onboarding' ? 'primary' : 'warning'} pill>
                  {row.status}
                </MDBBadge>
              </td>
              <td>{row.position}</td>
              <td>
                <MDBBtn color='link' rounded size='sm' onClick={() => { handleRowClick(row); navigateToAnotherComponent(); }}>
                  demander rendez vous
                </MDBBtn>
              </td>
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>
      <Footer />
    </>
  );
}
