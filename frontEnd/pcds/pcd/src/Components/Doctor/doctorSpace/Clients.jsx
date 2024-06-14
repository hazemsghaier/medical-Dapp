import React from 'react';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import NavbarDoctor from '../NavbarDoctor/NavbarDoctor';
import Footer from '../../Footer/Footer';
export default function ListeClients() {
  const clients = [
    {
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      imgSrc: 'https://mdbootstrap.com/img/new/avatars/8.jpg',
      status: 'Active',
      position: 'Senior',
    },
    {
      name: 'Alex Ray',
      email: 'alex.ray@gmail.com',
      imgSrc: 'https://mdbootstrap.com/img/new/avatars/6.jpg',
      status: 'Onboarding',
      position: 'Junior',
    },
    {
      name: 'Kate Hunington',
      email: 'kate.hunington@gmail.com',
      imgSrc: 'https://mdbootstrap.com/img/new/avatars/7.jpg',
      status: 'Awaiting',
      position: 'Senior',
    }
  ];
  return (
    <>
    <NavbarDoctor/>
    <MDBTable align='middle' style={{marginTop:'200px', marginBottom:'100px', marginLeft:'10px',marginRight:'10px'}}>
      <MDBTableHead>
        <tr>
          <th scope='col'>Name</th>
          <th scope='col'>fichier</th>
          <th scope='col'>Status</th>
          <th scope='col'>Position</th>
          <th scope='col'>Actions</th>
          <th scope='col'>rendez-vous</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
      {clients.map((client, index) => (
            <tr key={index}>
              <td>
                <div className='d-flex align-items-center'>
                  <img
                    src={client.imgSrc}
                    alt=''
                    style={{ width: '45px', height: '45px' }}
                    className='rounded-circle'
                  />
                  <div className='ms-3'>
                    <p className='fw-bold mb-1'>{client.name}</p>
                    <p className='text-muted mb-0'>{client.email}</p>
                  </div>
                </div>
              </td>
              <td>
                <button className='fw-normal mb-1'>View File</button>
              </td>
              <td>
                <MDBBadge color={client.status === 'Active' ? 'success' : client.status === 'Onboarding' ? 'primary' : 'warning'} pill>
                  {client.status}
                </MDBBadge>
              </td>
              <td>{client.position}</td>
              <td>
                <MDBBtn color='link' rounded size='sm'>
                  Edit
                </MDBBtn>
              </td>
              <td>
                <MDBBtn color='link' rounded size='sm'>
                  plus de detail
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