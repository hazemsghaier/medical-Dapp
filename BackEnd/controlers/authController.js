const db=require("../models");
require("dotenv").config();
const rsa=require("node-rsa");
const jwt=require("jsonwebtoken");
require("dotenv").config();
//pour les deux
function createTokenOnLogin(data){
   
    const user={
        email:data.email,
        firstName:data.firstName,
        lastName:data.lastName,
        MetaMaskAddress:data.MetaMaskAddress,
        publicKey:data.publicKey,
        role:data.role

    }
   
    const refreshToken=jwt.sign(user,process.env.SECRET_KEY_FOR_refresh_TOKEN)
    const accessToken=jwt.sign(user,process.env.SECRET_KEY_FOR_ACCESS_TOKEN,{expiresIn:"10m"});
    return {accessToken,refreshToken}

}
function isValidEthereumAddress(address) {
    if (!address || typeof address !== 'string') {
        return false;
    }
    if (address.length !== 42) {
        return false;
    }
    if (!address.startsWith('0x')) {
        return false;
    }
    const hexRegex = /^[0-9a-fA-F]+$/;
    if (!hexRegex.test(address.slice(2))) {
        return false;
    }
    return true;
}


   
function verifyPublicKey(publicKeyStringPem){
    try {
        const publicKey = new rsa().importKey(publicKeyStringPem);
        return true;
      } catch (error) {
        return false;
      }

  
  }
  //utiliser pour les deux docteur et patient
  function verifierLeDonnerDeSignUp(req){
    if(!verifierLesDonnerPasser(req.email,req.password)){
 
       return false;
    };
    
     if(!(req.body.telNumber || req.body.telNumber.length!=8)){
         return false;
     }
     if(!isValidEthereumAddress(req.body.MetaMaskAddress)){
         return false;
     }
     
     /*if(!isValidRSAPublicKey(req.body.publicKey)){
       
         return false;
     }*/
     return true;
 }
 //pour les deux
 function verifierLesDonnerPasser(email,password) {
    //email verification syntaxiquement
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!emailRegex.test(email)){
        return true;
       
    }
    if (password.length < 10) {
    return false;
    }
        
      // Vérifier le présence d au moins une lettre majuscule, un caractère spécial et un chiffre
      const uppercaseRegex = /[A-Z]/;
         const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
      const digitRegex = /[0-9]/;
        
      if (!uppercaseRegex.test(password) || !specialCharRegex.test(password) || !digitRegex.test(password)) {
        return false
      }

      //reste verification d un adress de metaMask est valide
     return true; 

}
//cette fonction est utiliser pour les deux docteur et patient
async function enregistrerLeRefreshToken(tokens,email,role){
    if(role==="docteur"){
     await db.docteur.update({refreshToken:tokens.refreshToken},{where:{email:email}});
     return true;
    }
    if(role==="patient"){
        await db.patient.update({refreshToken:tokens.refreshToken},{where:{email:email}});
        return true;
       }
       return false



}
async function makeAccessTokenFromRefresh(req){
    const data=req.headers["authorization"]
    if(data===undefined){
        return  false
    };
    const refreshToken=data.split(" ")[1];

    try{

        const refreshTokenData=await jwt.verify(refreshToken,process.env.SECRET_KEY_FOR_refresh_TOKEN);
        if(refreshTokenData.role==="patient"){
            const test=await verifierLeRefreshToken(refreshToken,refreshTokenData.email);
       if(test){
            delete refreshTokenData.iat;

             const accessTocken=await jwt.sign(refreshTokenData,process.env.SECRET_KEY_FOR_ACCESS_TOKEN,{expiresIn:"10m"});
             return accessTocken;

       }
       return false;
        }else{
            const test=await verifierLeRefreshToken(refreshToken,refreshTokenData.email);

       if(test){
              delete refreshTokenData.iat;

             const accessTocken=await jwt.sign(refreshTokenData,process.env.SECRET_KEY_FOR_ACCESS_TOKEN,{expiresIn:"10m"});
             return accessTocken;

       }
       return false;
        }
       
    }catch(err){
        console.log(err)
        return false;
    }
    }
    //pour les deux
async function deleteRefreshToken(email,role){
    if(role==="patient"){
        try{
            const [rowsAffected, metadata] = await db.patient.update(
                { refreshToken: null },
                { where: { email: email } }
            );
        
            if (rowsAffected === 0) {
                return false;
            } else {
                return true
            }
        }catch(err){
            return false;
        }
       
        
    }else{
        if(role="docteur"){
            try{
                const [rowsAffected, metadata] = await db.docteur.update(
                    { refreshToken: null },
                    { where: { email: email } }
                );
            
                if (rowsAffected === 0) {
                    return false;
                } else {
                    return true
                }
            }catch(err){
                return false;
            }

        }
    }

  
    
}
async function refreshTokenIsNotNull(email,role){
    if(role==="docteur"){
      const result= await db.docteur.findAll({
            where: {
                email:email,
                refreshToken: null
            }
          })
          console.log(result)
        if(result.length>0){
            return false;
        }else{
            return true;
        }
    }else{
        const result= await db.patient.findAll({
            where: {
                email:email,
                refreshToken: null
            },
          })
          console.log(result)
        if(result.length>0){
            return false;
        }else{
            return true;
        }

    }
    
}
async function verifierLeRefreshToken(refreshToken,email){
    const user= await db.docteur.findOne({where:{
         email:email,
         refreshToken:refreshToken
     }})
     if(user){
         return true;
     }else{
         return false
     }
 
 }
 
module.exports = {
    createTokenOnLogin,
    isValidEthereumAddress,
    enregistrerLeRefreshToken,
    verifyPublicKey,
    verifierLesDonnerPasser,
    verifierLeDonnerDeSignUp,
    deleteRefreshToken,
    makeAccessTokenFromRefresh,
    refreshTokenIsNotNull
};