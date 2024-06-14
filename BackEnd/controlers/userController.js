
const { access } = require("fs");
const db=require("../models");
require("dotenv").config()
const { createTokenOnLogin,
    enregistrerLeRefreshToken,
    verifyPublicKey,
    verifierLesDonnerPasser,
    verifierLeDonnerDeSignUp,
    deleteRefreshToken
}=require("./authController")
const dataBase=require("./dataBaseController")
const crypto=require("crypto");
const jwt=require("jsonwebtoken");
const docteurDataBase=require("./doctorDataBasecontroller")
require("dotenv").config();


//cette fonction va retourner false si l utilisateur n existe pas est elle va retourner les tockens si il existe
async function  login (req,role){
    
    if(!verifierLesDonnerPasser(req.email,req.password)){
        return false;
    }

   let hash = crypto.createHash("sha256");
   hash.update(req.body.password);
   hash = hash.digest("hex");


    try{
        let data;
        if(role==="patient"){
            console.log("11111111111111\n")
           data=await db.patient.findOne({where:{
                email:req.body.email
            }})

        }else{
            data=await db.docteur.findOne({where:{
                email:req.body.email}})

        }
       
    
        console.log(data);
    if(data==null){
        return false;
    }
    if(data.password===hash){
        data.role=role;
        const tokens= createTokenOnLogin(data); 
        enregistrerLeRefreshToken(tokens,data.email,role);
         return tokens;
    }else{
        
        return false;

    }
    }catch(err){
      console.log("we have this error",err.message)
       
    }
}
 
//signUp pour le docteur et user
async function signUp(req){
    let verifier=verifierLeDonnerDeSignUp(req);
    if(!verifier ){
        return verifier ;
    }
    if(!verifyPublicKey(req.body.publicKey) ){
        
        return false
    }
   
    if(!req.body.key){
        
        verifier =await createPatient(req);
        verifier.role="patient";

    }else{
        verifier=await docteurDataBase.verifyKey(req.body.key)
        console.log(verifier)
        if(verifier){
            verifier=await docteurDataBase.addDocteur(req.body)
            verifier.role="docteur";
        }
    }

  if(verifier){
    console.log(verifier)
   const tokens= createTokenOnLogin(verifier);
   enregistrerLeRefreshToken(tokens,verifier.email,verifier.role);
   return tokens;
  }

  return verifier;

}


async function logout(req){
        try {
            const [accessToken, refreshToken] = authorizationHeader.split(' ').slice(1);
            const user = await jwt.verify(accessToken, process.env.SECRET_KEY_FOR_ACCESS_TOKEN);
            let verifier;
            if (accessToken) {
               
                const user = await jwt.verify(accessToken, process.env.SECRET_KEY_FOR_ACCESS_TOKEN);
                if(user.role==="patient"){
                    console.log(1111111)
                 verifier = await dataBase.verifierLeRefreshToken(refreshToken, user.email);
               }else{
                console.log(222222)
                 verifier=await docteurDataBase.verifierLeRefreshToken(refreshToken,user.email)

            }
                if (verifier) {
                    // Depending on your application logic, you may want to handle role-based actions differently
                    const result = await deleteRefreshToken(user.email, user.role);
                    return result;
                } else {
                    return false; // Invalid refresh token
                }
            } else {
                return false; // Missing access token
            }
        } catch (err) {
            return false; // Error during verification or database operation
        }
    }
 
  //on va ajouter un patient dans la base du donner
async function createPatient(req) {
    try {
        // Récupérer les données du corps de la requête
        const { email, firstName, lastName, telNumber, MetaMaskAddress, publicKey } = req.body;
        let hash = crypto.createHash("sha256");
        hash.update(req.body.password);
        hash = hash.digest("hex");

        // Créer un nouveau patient dans la base de données
        const newPatient = await db.patient.create({
            email,
            firstName,
            lastName,
            telNumber,
            password:hash,
            MetaMaskAddress,
            publicKey
     
        });
        return newPatient;
    } catch (error) {
     
        console.error('Erreur lors de la création du patient :', error);
        return false;
    }
}

module.exports={
    login,
    signUp,
    logout
}