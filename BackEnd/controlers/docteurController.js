const dataBase=require("./doctorDataBasecontroller");
const jwt=require("jsonwebtoken");
const { createTokenOnLogin,
    isValidEthereumAddress,
    enregistrerLeRefreshToken,
    isValidRSAPublicKey,
    verifierLesDonnerPasser,
    verifierLeDonnerDeSignUp,
    deleteRefreshToken
}=require("./authController")

async function signUp(req,res){
    let verifier=verifierLeDonnerDeSignUp(req);
    if(!verifier){
        return verifier;

    }
  verifier =await createPatient(req,res);
  if(verifier){
    verifier.role="patient"
    console.log(verifier)
   const tokens= createTokenOnLogin(verifier);
   enregistrerLeRefreshToken(tokens,verifier.email,verifier.role);
   return tokens;
  }

  return verifier;

}
