const NodeRSA = require('node-rsa');
const doctoreDataBase=require("./doctorDataBasecontroller");
const patientDatabase=require("./dataBaseController")
async function verifierSignatureDocteur(plainText,signature,email){
    const publicKeystring=await doctoreDataBase.getPublicKey(email);
    const result = await verifierSignature(plainText,signature);
    return result;
    
}
async function verifierSignaturePatient(plainText,signature,email){
    const publicKeystring=await patientDatabase.getPublicKey(email);
    const result = await verifierSignature(plainText,signature);
    return result;
    
}
async function verifierSignature(plainText,signature){
    const key =new NodeRSA(publicKeystring,"pkcs8-public")
    const isSigniatureValid=key.verify(plainText,signature);
    return isSigniatureValid;
}
module.exports={
    verifierSignatureDocteur,
    verifierSignaturePatient
}