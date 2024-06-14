import React, { useState } from 'react';
import '../../Client/UserSpace/AccountSettings.css';
import NavbarDocteur from '../NavbarDoctor/NavbarDoctor';
import Footer from '../../Footer/Footer';
import Changermotdepasse from '../../Client/UserSpace/Changermotdepasse';
import { changePassword,changeEmail,changeProfileImage } from "../../../api/changeDataApi";

const AccountSettings = () => {
  const [name, setName] = useState('');
  const [oldEmail, setOldEmail] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [password, setPassword] = useState('');
  const [previewSource, setPreviewSource] = useState('');


  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleOldEmailChange = (e) => {
    setOldEmail(e.target.value);
  };

  const handleNewEmailChange = (e) => {
    setNewEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSaveName =async () => {
   
  };

  const handleSaveEmail = async () => {
    // Implement logic to save email
    const result=await changeEmail({
      email:oldEmail,
      newEmail,
      password
    })
    if(result){
      console.log("email has been changed succesfully")
    }else{
      console.log("jjuhijhuijh");
    }
  };
  

  const handleSaveProfilePicture = async () => {
    try {
      if (!previewSource) {
        console.error("No image selected.");
        return;
      }

      // Convert the base64 image to a Blob
      const blob = await fetch(previewSource).then((res) => res.blob());

      // Create FormData object and append the image file
      const formData = new FormData();
      formData.append('profilePicture', blob, 'profilePicture');

      // Call API to save the profile picture
      await changeProfileImage(formData);

      console.log("Profile picture saved successfully.");
    } catch (error) {
      console.error("Error saving profile picture:", error);
    }
  };

  return (
    <>
      <NavbarDocteur />
      <div className='accountsettings'>
        <h1 className='head'>Information Personel</h1>
        <div className='form'>
          <div className='form-group'>
            <label htmlFor='name'>Your Name<span>*</span></label>
            <div className='b'>
              <input type='text' name='name' id="name" placeholder='new username' value={name} onChange={handleNameChange}></input>
              <button className='mainbutton1' onClick={handleSaveName}>save name</button>
            </div>
          </div>
          <div className='form-group'>
            <label htmlFor='name'>Your Email<span>*</span></label>
            <input type='text' name='email' id="oldEmail" placeholder='Old email' value={oldEmail} onChange={handleOldEmailChange} style={{marginBottom:'10px'}}></input>
            <input type='text' name='email' id="newEmail" placeholder='new email' value={newEmail} onChange={handleNewEmailChange}></input>
            <div className='b'>
              <input type='password' name='passeword' id="password" placeholder='your passeword' value={password} onChange={handlePasswordChange}></input>
              <button className='mainbutton1' onClick={handleSaveEmail}>save email</button>
            </div>
          </div>
          <div className='form-group1'>
            <label htmlFor='profilePicture'>Changer la photo de profil</label>
            <input
              type='file'
              accept='image/*'
              name='profilePicture'
              id='profilePicture'
              onChange={handleFileInputChange}
            />
            {previewSource && (
              <img
                src={previewSource}
                alt='Aperçu de la photo de profil'
                style={{ maxWidth: '50px', marginTop: '10px' , maxHeight:'50px' }}
              />
            )}
            <button className='mainbutton1' onClick={handleSaveProfilePicture}>save</button>
          </div>
        </div>
      </div>
      <Changermotdepasse/>
      <Footer />
    </>
  );
};

export default AccountSettings;
