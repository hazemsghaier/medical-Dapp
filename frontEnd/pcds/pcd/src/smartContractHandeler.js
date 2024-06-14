import Web3 from "web3";
import simpleStorage from "../../../build/contracts/fileSystem.json";


const initializeWeb3 = async () => {
    const provider = new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545");
    const web3 = new Web3(provider);
    const networkId= await web3.eth.net.getId();
    const deployedNetwok = simpleStorage.networks[networkId];
  const contract = new web3.eth.Contract(simpleStorage.abi, deployedNetwok.address);
  return { web3, contract };

};
//state hya web3.eth 1
const addNewDoctor = async (state, newDoctorAddress, newPublicKey) => {
    try {
      if (!state.contract) {
        console.error("Contract instance not available.");
        return;
      }
      const gasLimit = 3000000;
      const accounts = await state.web3.eth.getAccounts();
      await state.contract.methods.addNewDocteur(newDoctorAddress, newPublicKey).send({ from: accounts[0], gasLimit });
      console.log("New doctor added successfully.");
    } catch (error) {
      console.error("Error adding new doctor:", error);
    }
  };

  const checkDoctorExistance= async (state,docteurAddress)=>{
    try{
        if (!state.contract) {
          console.error("Contract instance not available.");
          return;
        }
        // Call the docteurExist function from the contract
        const result = await state.contract.methods.docteurExist(docteurAddress).call();
        // Update the existResult state with the result
       return result ? "Doc Exists" : "doc does not exists";
      }catch(error){
        console.error("Error checking doctor existence:", error);
        return "Error checking doctor existence";
      }
  };
  const addNewClient = async (state,patientPK,patientIndex) => {
    try{
    if (!state.contract){
      console.error("Contract instance not available");
      return;
    }
    const accounts = await state.web3.eth.getAccounts();
    console.log(accounts)
    const gasLimit =3000000;
    await state.contract.methods.addNewCilent(patientPK).send({from: "0x26a8be91233092176cf8b96733b3c5e09e6fd0b7",gasLimit});
    const res = await state.contract.methods.addNewCilent(patientPK).call({from: "0x26a8be91233092176cf8b96733b3c5e09e6fd0b7",gasLimit})
    console.log("New client added successfuly",res);
    return res ? "client added successfuly":"client no added";
  } catch(error){
    console.error("Error adding client", error)
  }
};
//lorsque l utilisateur veut faire 1
const Appointement=async(state,DocAddressToAppointWith,clientWhoTookAppointement)=>{
    try{
      console.log(5555)
      if (!state.contract){
        console.error("Contract instance not available.");
        return;
      }
      console.log(5555)
      const accounts = await state.web3.eth.getAccounts();
      const gasLimit =3000000;
       await state.contract.methods.changeTheDocteur(DocAddressToAppointWith).send({from: clientWhoTookAppointement,gasLimit});
      const res =await state.contract.methods.changeTheDocteur(DocAddressToAppointWith).call({from: clientWhoTookAppointement,gasLimit});
       console.log("appointement had be taken !! ");
      console.log("Sender's address:", clientWhoTookAppointement);
      return res ? "appointment had been taken " : "appointement  is not take ";
    }
    catch(error){
      console.error("error changin the doctor : ", error);
    }
  };
  const getAllDemandes= async (state,DocAddressWannaSeeDms )=> {
    try{
      // Check if contract instance exists
      if (!state) {
        console.error("Contract instance not available.");
        return;
      }
      const dms = await state.methods.getAllDemande().call({
        from: DocAddressWannaSeeDms
      });
      
      return dms
      
    }catch(error){
      console.error("error: ",error);
    }
  };
  //lorsque il accepte le rendez vouz 1
  const AccepteDemande = async (state,clientToAccept,DocWhoWantToAccept) => {
    try {
      // Check if contract instance exists
      
      if (!state.contract) {
        console.error("Contract instance not available.");
        return;
      }
  
       // Get the doctor's address (current user's address)
      
      
  
      
       const gasLimit =3000000;
       await state.contract.methods.accepterDemande(clientToAccept).send({from: DocWhoWantToAccept ,gasLimit});
       window.location.reload();
      
    } catch (error) {
      console.error("accepting error:", error);  
    }
  };
  const getAllClientsForDoctor = async (state,DocAddWannaSeeHisClients) => {
    try {
      // Check if contract instance exists
      if (!state.contract) {
        console.error("Contract instance not available.");
        return;
      }
  
      // Get the doctor's address (current user's address)
      
      
  
      // Call the docteurSeeAllhisClient function from the contract with the doctor's address
      const clients = await state.contract.methods.docteurSeeAllhisClient().call({from: DocAddWannaSeeHisClients});
  
      // Update the clients state with the returned clients
      return clients;
    } catch (error) {
      console.error("Error getting clients for doctor:", error);  
    }
  };
  //boutton specifier
  const changeCuurentFileCID = async (state,clientOfTheFile,fileCID,AddofTheDocChangingTheCid)=>{
    try{
      if (!state.contract){
        console.error("Contract instance not available.");
        return;
      }
      
      const gasLimit =3000000;
       const result =await state.contract.methods.changeCurrentFile(clientOfTheFile, fileCID).send({from: AddofTheDocChangingTheCid,  gasLimit});
      // Now, retrieve the return value of the Solidity function using call()
      const returnValue = await state.contract.methods.changeCurrentFile(clientOfTheFile, fileCID).call({from: AddofTheDocChangingTheCid,  gasLimit});
      
      console.log("File CID had changed !!", result);
      console.log("Return value from the smart contract:", returnValue);
      return returnValue;
      
    }catch(error){
      console.error("error :",error)
    }
  };
  //lorsque le docteur veut telecharger le fichier du client
  const getCurrentFileCID = async (state, clientAddToGetCID, DocAddToGetCID)=>{
    try{
      // Check if contract instance exists
      if (!state.contract) {
        console.error("Contract instance not available.");
        return;
      }
      const cid = await state.contract.methods.getCurrentFileCid(clientAddToGetCID).call({
        from: DocAddToGetCID
      });
      
      return cid;
      
    }catch(error){
      console.error("error: ",error);
    }
  };
  //lorsque leclient va avoir son fichier
  const pushReqForFile = async (state,DocAddToReq,OwnerOfTheFile)=>{
    try{
      // Check if contract instance exists
      if (!state.contract) {
        console.error("Contract instance not available.");
        return;
      }
      const gasLimit =3000000;
      await state.contract.methods.clientMakeRequestForFile(DocAddToReq).send({
        from: OwnerOfTheFile,gasLimit
      });
      const req=await state.contract.methods.clientMakeRequestForFile(DocAddToReq).call({
        from: OwnerOfTheFile, gasLimit 
      });
      console.log(req);
      return req;
    }catch(error){
      console.error("error: ",error);
    }
  };
  const getAlltransferDemandeOfclient= async (state,DocWannaSeeHisDmOfTransferForClient)=> {
    try{
      if (!state.contract) {
        console.error("Contract instance not available.");
        return;
      }
      const gasLimit=3000000;
      const addresses=await state.contract.methods.getAlltransferDemandeOfclient().call({from:DocWannaSeeHisDmOfTransferForClient,gasLimit});
     return addresses;
    
    }catch(err){
      console.error('error23',err);
    }
  };
  const giveTheClientTheFile = async (state,clientAddress,file,DocAddGivingTheFile) => {
    try {
      if (!state.contract) {
        console.error("Contract instance not available.");
        return;
      }
      const gasLimit = 3000000;
      const result = await state.contract.methods.giveTheClientTheFile(clientAddress, file).send({ from: DocAddGivingTheFile, gasLimit }); // Replace "yourAddress" with the sender's address
      console.log("Result:", result);
      // You can handle the result here
    } catch (err) {
      console.error('Error:', err);
    }
  };
  //lorsque le client veut telecharger son fichier
  const getMyFile = async (state,patientAddWannaGetFile) => {
    try {
      if (!state.contract) {
        console.error("Contract instance not available.");
        return;
      }
      const gasLimit = 3000000;
      const result = await state.contract.methods.getMyFile().call({ from: patientAddWannaGetFile, gasLimit }); // Replace "yourAddress" with the sender's address
      console.log("Result:", result);
      return result;
      // You can handle the result here
    } catch (err) {
      console.error('Error:', err);
    }
  };
  export { initializeWeb3, addNewDoctor, checkDoctorExistance , addNewClient, Appointement, getAllDemandes, AccepteDemande, 
    getAllClientsForDoctor, changeCuurentFileCID, getCurrentFileCID,pushReqForFile,getAlltransferDemandeOfclient,giveTheClientTheFile
,getMyFile}; 