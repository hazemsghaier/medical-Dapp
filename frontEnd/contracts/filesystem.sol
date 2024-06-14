// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
contract fileSystem{
    address owner;
  struct Docteur{
    address docteurAddress;
    string PublicKey;
  }
  struct clienFile{
    string currentFile;
    string clientFile;
    string prevFile;
    address permisionDocteur;
    address prevDocteur;
  }
  struct Client{
    address clientAddress;
    bool accepter;
  }
  struct DemandeDuTransfer{
     address client;
     address docteur;
     bool accepted;
  }
 
    mapping (address=>address) clientDocteur;
    mapping (address=>string) clientPublicKey;
   mapping (address=>clienFile) fileCid;
   Docteur[] listOfDocteurs;
   mapping (address=>DemandeDuTransfer[]) demandeDuTransfer;
   mapping (address=>Client[]) docteurs;

  constructor(){
    owner=msg.sender;
    }
    function getPublicKeyForClient(address client) view  public returns (string memory result){
      return clientPublicKey[client];
    }
    function changeTheOwner(address newOwner) public returns(bool result){
      if(msg.sender==owner){
        owner=newOwner;
        return true;
      }
      return false;
    }
    function getMyFile() view public returns (string memory){
          return  fileCid[msg.sender].clientFile;
    }
     function removeDemandeDuFichierParClient(address client,address docteur) internal  {
        for (uint i = 0; i < demandeDuTransfer[docteur].length; i++) {
            if (demandeDuTransfer[docteur][i].client == client && demandeDuTransfer[docteur][i].docteur==address(0)) {
                demandeDuTransfer[docteur][i] = demandeDuTransfer[docteur][demandeDuTransfer[docteur].length - 1];
                demandeDuTransfer[docteur].pop();
                break;
            }
        }
    }

    function clientDemandeExiste(address client,address docteur) view internal returns(bool result){
      for(uint i=0;i<demandeDuTransfer[docteur].length;i++){
        if(demandeDuTransfer[docteur][i].client==client && demandeDuTransfer[docteur][i].docteur==address(0)){
          return true;
        }
      }
      return false;

    }
    //le client veut voir sont fichier donc il envoie une demande
    function clientMakeRequestForFile(address docteur) public returns (bool result) {
      if(clientDocteur[msg.sender]==docteur && fileCid[msg.sender].permisionDocteur==docteur ){
        if(clientDemandeExiste(msg.sender,docteur)){
          return  true;
        }else {
                 demandeDuTransfer[docteur].push(DemandeDuTransfer(msg.sender,address(0),true));
                return true;
        }
      }
      return false;
    }
    function getAlltransferDemandeOfclient() view public returns(DemandeDuTransfer[] memory result) {
            DemandeDuTransfer[] memory results = new DemandeDuTransfer[](demandeDuTransfer[msg.sender].length);
            uint count =0;
             for(uint i=0;i<demandeDuTransfer[msg.sender].length;++i){
              if(demandeDuTransfer[msg.sender][i].accepted==true && demandeDuTransfer[msg.sender][i].docteur==address(0) ){
               results[count]=demandeDuTransfer[msg.sender][i];
               count++;
          }
          return results;
    }}
    //donner le client le donne le fichier dans le fild du clientFile
    function giveTheClientTheFile(address client,string calldata file) public returns(bool result) {

      if(clientDemandeExiste(client, msg.sender)){
              if(clientDocteur[client]==msg.sender && fileCid[client].permisionDocteur==msg.sender ){
                removeDemandeDuFichierParClient(client,msg.sender);
                fileCid[client].clientFile=file;
                return true;
              }
      }
      return false;
    }
    //voir tous les demande d ajout
    function getAllDemande() view public returns(Client[] memory result){
           Client[] memory results = new Client[](docteurs[msg.sender].length);
           uint count = 0;
        for(uint i=0;i<docteurs[msg.sender].length;i++){
          if(docteurs[msg.sender][i].accepter==false && clientDocteur[docteurs[msg.sender][i].clientAddress]==msg.sender &&docteurs[msg.sender][i].clientAddress!=address(0)){
            results[count]=docteurs[msg.sender][i];
            count++;
          }
        }
        return results;
    }
    //le docteur peut voir tous ces client
    function docteurSeeAllhisClient() view public returns (Client[] memory result)  {
         Client[] memory results = new Client[](docteurs[msg.sender].length);
           uint count = 0;
        for(uint i=0;i<docteurs[msg.sender].length;i++){
          if(docteurs[msg.sender][i].accepter==true && clientDocteur[docteurs[msg.sender][i].clientAddress]==msg.sender &&docteurs[msg.sender][i].clientAddress!=address(0)){
            results[count]=docteurs[msg.sender][i];
            count++;
          }
        }
        return results;

    }
    //voire tous les demande d echange du fichier par les docteur
    function getAlltransferDemandeConfirmed() view public returns(DemandeDuTransfer[] memory result) {
            DemandeDuTransfer[] memory results = new DemandeDuTransfer[](demandeDuTransfer[msg.sender].length);
            uint count =0;
             for(uint i=0;i<demandeDuTransfer[msg.sender].length;++i){
              if(demandeDuTransfer[msg.sender][i].accepted==true && demandeDuTransfer[msg.sender][i].docteur!=address(0) ){
               results[count]=demandeDuTransfer[msg.sender][i];
               count++;
          }
          return results;
    }}
  //verifier si le docteur existe
  function docteurExist(address docteurAddress) view  public  returns(bool result) {
    for(uint i=0;i<listOfDocteurs.length;i++){
        if(listOfDocteurs[i].docteurAddress==docteurAddress){
            return true;
        }
    }
    return false;
  }
  //le patient va demander d etre affecter a un docteur
  //si il n y a pas aucun docteur en va affecter le docteur au patient sans le donneé le droit du changer le fichier our le patient
  //et en va envoyer une demande pour ce docteur
  //si il y a deja un docteur en va changer le docteur pour le client mais les droit du changer le fichier va rester au docteur precedent jusqu a le nouvaux docteur acepter
  //et automatiquement en va envoyer une demande du transfer du fichie
  function changeTheDocteur(address docteurAddress) public returns(bool result){
    if(clientDocteur[msg.sender]==address(0)){
        if(docteurExist(docteurAddress)){
            docteurs[docteurAddress].push(Client(msg.sender,false));
            clientDocteur[msg.sender]=docteurAddress;
            return true;
        }else{
            return false;
        }  
    }else{
        if(docteurExist(docteurAddress)){
            docteurs[docteurAddress].push(Client(msg.sender,false));
            effacerLeclientPourLeDocteur(clientDocteur[msg.sender],msg.sender);
            clientDocteur[msg.sender]=docteurAddress;
            removeDemandeDuFichierParClient(msg.sender, fileCid[msg.sender].permisionDocteur);
            demandeDuTransfer[fileCid[msg.sender].permisionDocteur].push(DemandeDuTransfer(msg.sender,docteurAddress,false));
            return true;
        }else{
            return false;
        }  

    }
    return false;

  }
  function effacerLeclientPourLeDocteur(address docteur,address client) internal {
     for (uint i = 0; i < docteurs[docteur].length; i++) {
            if (docteurs[docteur][i].clientAddress == client ) {
                docteurs[docteur][i] = docteurs[docteur][docteurs[docteur].length - 1];
                docteurs[docteur].pop();
                break;
            }
        }
  }
  function accepterDemande(address client) public  returns(bool result) {
    for(uint i=0;i<docteurs[msg.sender].length;i++){
        if(docteurs[msg.sender][i].clientAddress==client){
            docteurs[msg.sender][i].accepter=true;
            if(fileCid[client].permisionDocteur==address(0)){
                fileCid[client].permisionDocteur=msg.sender;
                return true;
            }else{
                //nbadel ell docteur ou ell docteur ell 9dim yet7at fi ell prevdocteur ou ell jdid fi ell prmission docteur
                fileCid[client].prevDocteur=  fileCid[client].permisionDocteur;
                 fileCid[client].permisionDocteur=msg.sender;
                 for(uint j=0;j<demandeDuTransfer[fileCid[client].prevDocteur].length;j++){
                    if(demandeDuTransfer[fileCid[client].prevDocteur][j].client==client && demandeDuTransfer[fileCid[client].prevDocteur][j].docteur==msg.sender ){
                        demandeDuTransfer[fileCid[client].prevDocteur][j].accepted=true;
                          return true;
                    }
                 }
                
            }
        }
        
    }
    return  false;
  }
  //prendre le fichier current seullement pour le docteur current
  function getCurrentFileCid(address client) public view returns (string memory Cid)
   {
    if(msg.sender==fileCid[client].permisionDocteur&&msg.sender==clientDocteur[client]){
        return fileCid[client].currentFile;
    }
    return "nono";

   }  

//changer le cid du current file seulement pour le docteur current
function changeCurrentFile(address client,string calldata file) public returns(bool result) {
    if(fileCid[client].permisionDocteur==msg.sender && clientDocteur[client]==msg.sender){
        fileCid[client].currentFile=file;
        return true;
     }
     return false;
  }
  //changer le cid du prev file seulement pour le docteur prev et current 0
  function changeprevFile(address client,string calldata file) public returns(bool result) {
    if(fileCid[client].prevDocteur==msg.sender ){
        fileCid[client].prevFile=file;
        return true;
     }
     return false;
  }
  //prendre le cid du prev file seulement pour le docteur prev et current 0
  function getPrevFile(address client) public view returns (string memory Cid){
       if(fileCid[client].permisionDocteur==msg.sender && clientDocteur[client]==msg.sender){
        return fileCid[client].prevFile;
       }
       if(fileCid[client].prevDocteur==msg.sender){
         return fileCid[client].prevFile;
       }
       return "nono";
  }
  //le docteur actuelle peut effacer tous les privilege pour le docteur pressedent 0
  function effacerPrevDocteur (address client) public returns (bool result){
    if(msg.sender==fileCid[client].permisionDocteur && msg.sender== clientDocteur[client]){
        fileCid[client].prevDocteur=address(0);
    return true;
    }
    return false;
  }
  //get the public key of a docteur 0
  function getPublicKey(address docteur) view  public returns (string memory result){
       for(uint i=0;i<listOfDocteurs.length;i++){
        if(listOfDocteurs[i].docteurAddress==docteur){
          return listOfDocteurs[i].PublicKey;
        }
       }
       return "NO";
   
  }
  //to add a new docteur 
  function addNewDocteur(address newDocteur,string calldata docteurKey) public returns (bool result){
    if(msg.sender==owner){
        listOfDocteurs.push(Docteur(newDocteur,docteurKey));
        return true;

    }
    return  false;
  }
  //the user can supsecribe as a patient
  function addNewCilent(string calldata key)  public returns(bool result){
    if(clientDocteur[msg.sender]==address(0)){
        clientDocteur[msg.sender]=address(0);
        clientPublicKey[msg.sender]=key;

        return true;
    }
    return  false;
  }
  //the user can see his cuurent docteur
  function getMyDocteur() view public returns(address result){
    return clientDocteur[msg.sender];
  }


}