import { useState } from "react";

function App1() {
  const [selectedFile, setSelectedFile] = useState();
  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmission = async () => {
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
      <label className="form-label">Choose File</label>
      <input type="file" onChange={changeHandler} />
      <button onClick={handleSubmission}>Submit</button>
    </>
  );
}

export default App1;
