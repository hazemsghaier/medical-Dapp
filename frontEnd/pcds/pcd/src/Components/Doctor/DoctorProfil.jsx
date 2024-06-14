import React, { useEffect, useState } from 'react';
import Header from './header'; // Import your Header component
import Propre from './propre'; // Import your Propre component
import Footer from '../Footer/Footer';
import {getDataDocteur} from "../../api/clientApi"
import NavbarDoctor from "./NavbarDoctor/NavbarDoctor"
import AddFreeTime from './addFreeTime';
import DocteurFreeTime from './docteurFreeTime';
import axios from 'axios';
const UserProfil = () => {
  // State variables for profile information
  const [profilePic, setProfilePic] = useState('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjaPFO5GgzgnJ0NCG4kIv5ddPySSyCnLENILf1xnPa9M3C0P8hAIgqg7WhPA&s');
  const [name, setName] = useState('rodrigo rodriguez');
  const [email, setEmail] = useState('rr9@gmail.com');
  const [metaMask, setMetaMask] = useState('dvsnvjnvkjnfvnkdfv');
  const [publicKey, setPublicKey] = useState('kfnjdjjnbjfvbjnv');
  const [doctor, setDoctor] = useState('-------------------------');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getDataDocteur();
        console.log(result);
        if(result.profileImagePath){
            const getImage = async () => {
              try {
                console.log(11111)
                const response = await axios.get('http://localhost:4200/getImage', {
                  params: {
                    imagePath: result.profileImagePath// Specify the path to your image
                  },headers: {
                    'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
                },
                  responseType: 'arraybuffer' // Ensure response is treated as binary data
                });
                console.log(111111)

                const blob = new Blob([response.data], { type: 'image/jpeg' }); // Create a Blob from the binary image data
                console.log(1111111)

                const imageUrl = URL.createObjectURL(blob); // Generate a URL for the Blob
                setProfilePic(imageUrl); // Set the image URL to display
              } catch (error) {
                console.error('Error fetching image:', error);
              }
            };
        
            getImage();
          
        }
       
        setName(result.
          firstName
          );
        setEmail(result.email);
        setMetaMask(result. MetaMaskAddress);
        if(result.doctor){
          setDoctor(result.doctor);
        }

       
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    
    fetchData();
  }, []);

  return (
    <>
      <NavbarDoctor />
      <div style={{ marginTop: '150px' }}>
        {/* Pass the state variables as props to the Header component */}
        <Header
          profilePic={profilePic}
          name={name}
          email={email}
          metaMask={metaMask}
          doctor={doctor}
        />
      </div>
      <AddFreeTime/>
      <DocteurFreeTime email={email}/>


      <Propre />
      <Footer />
    </>
  );
};

export default UserProfil;
