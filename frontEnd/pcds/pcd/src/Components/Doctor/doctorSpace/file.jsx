import React, { useState } from 'react';
import NavbarDoctor from '../NavbarDoctor/NavbarDoctor';
import Footer from '../../Footer/Footer';
import { encryptData } from '../../../crypto/cryptage';
import { AccepteDemande } from '../../../smartContractHandeler';

const MyForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [email, setEmail] = useState('');
  const [text, setText] = useState('');

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };



  const handleSubmission = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      
      const metadata = JSON.stringify({
        name: "File name",
      });
      formData.append("pinataMetadata", metadata);

      const options = JSON.stringify({
        cidVersion: 0,
      });
      formData.append("pinataOptions", options);
      
      const x = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI3YWFlNGViOS1lZWRlLTQzOGItYTc4Ni02MTcyYTgwZWVkZjgiLCJlbWFpbCI6ImhhemVtc2doYWllcjZAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6ImRmZDBjZGRmMWU1N2YwOWMzYjkwIiwic2NvcGVkS2V5U2VjcmV0IjoiN2QxMjAzYTQ3MTRhNGU4Y2JlNjExYjViOGJhZjExODc0NmQ0OWVhOGJmYjYzMDMwM2ExMTEyZWViZDUwNGRjZiIsImlhdCI6MTcxNjQ0MDMxN30.G9MfnupQKIgMc_aAulPUZRTPohFLgPCCTvnMqI6yjbs`;
      
      const res = await fetch(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${x}`,
          },
          body: formData,
        }
      );
      
      console.log('res=', res);
      
      if (res.ok) {
        const resData = await res.json();
        console.log(resData);
      } else {
        const errorData = await res.json();
        console.error('Error:', errorData.error);
      }
      
    } catch (error) {
      console.error('Error:', error);
    }
 
  };

  return (
    <>
      <NavbarDoctor />
      <div className="container-fluid d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', backgroundColor: '#f0f0f0' }}>
        <div className="card p-4">
          <h1 className="text-center mb-4">My Form</h1>
          <form onSubmit={handleSubmission}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input type="email" className="form-control" id="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="text" className="form-label">Text</label>
              <input type="text" className="form-control" id="text" placeholder="Enter text" value={text} onChange={(e) => setText(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="formFile" className="form-label">Upload File</label>
              <input className="form-control" type="file" id="formFile" onChange={changeHandler} />
            </div>
            <div className="mb-3">
              <button type="submit" className="btn btn-primary">Submit</button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default MyForm;
