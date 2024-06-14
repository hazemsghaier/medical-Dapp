const db=require("../models");
const auth=require("./authController")
const crypto=require("crypto")

async function addFilePath(email,filePath) {
    try {
      
        await db.patient.update(
            { FilePath: filePath }, 
            {
                where: { email: email }
            }
        );
        return true;
        

      
       
    } catch (error) {
        console.error('Error updating FilePath:', error);
        return false;
        }
}
/*  1-/verifier si les deux mot de passe sont syntaxiquement correct
    2-/hash des deux mot du passe
    2-/verifier bien que le mot du passe correspende a se email dans le data base
    3-/changer le password et renvois true
*/
async function changePassword(userEmail,userPassword,newPassword){
    try {
        if(userPassword===newPassword){
            return true;
        }
        if(auth.verifierLesDonnerPasser(userEmail,userPassword)){
            if(auth.verifierLesDonnerPasser(userEmail,newPassword)){
                let hash = crypto.createHash("sha256");
                hash.update(userPassword);
                hash = hash.digest("hex");
                newPassword=crypto.createHash("sha256").update(newPassword).digest(hex);

                          
         const result=await db.patient.update(
              { password: newPassword}, // Corrected field name
              {
                where: { email: userEmail,
                    password:hash
                 }
               }
        );
        if(result){
            return true;

        }
        return false;
        }else{
            return false;
        }
       
    }else{
        return false;
    }
} catch (error) {
        console.error('Error changing password :', error);
        return false;
        }
}
async function changeProfileImage(email,imagePath){
    try {
        console.log(111111);
        console.log(email,imagePath)
        await db.patient.update(
            { profileImagePath: imagePath }, 
            {
                where: { email: email }
            }
        );
        return true;
        

      
       
    } catch (error) {
        console.error('Error updating imagePath:', error);
        return false;
        }

}
async function getDocteurs(){
    //get email ,pathImage,name ,lastname
    const data=await db.docteur.findAll({
        attributes:["email","firstName","lastName","telNumber","MetaMaskAddress","profileImagePath"]
    });
    return data;
}
async function changeEmail(userEmail,userPassword,newemail){
    try {
        if(auth.verifierLesDonnerPasser(newemail,userPassword)){
            
        //verifier qu il  n existe aucun emaile comme
        if(newemail===userEmail){
            return false;
        }
        let hash = crypto.createHash("sha256");
                hash.update(userPassword);
                hash = hash.digest("hex");


      const data=  await db.patient.findOne({where:{
            email:newemail
        }})
        if(!data) {
            await db.patient.update(
                { email: newemail}, // Corrected field name
                {
                    where: { email: userEmail,
                        password:hash
                     }
                }
            );
            return true;
        }
        return false   
    }else{
        return false;
    }
} catch (error) {
        console.error('Error changing password :', error);
        return false;
        }
}
async function verifierLeRefreshToken(refreshToken,email){
   const user= await db.patient.findOne({where:{
        email:email,
        refreshToken:refreshToken
    }})
    if(user){
        return true;
    }else{
        return false
    }

}
async function addDocteurEmail(userEmail,docteurEmail){
    try{
        console.log("mananananana")
        await db.patient.update({docteurEmail:docteurEmail},{
            where:{ email: userEmail }})
        return true;
    }catch(err){
        return false;
    }

}
async function getPublicKey(email){
    const publicKey= await db.patient.findOne({attributes:["publicKey"],
     where:{email:email}
 })
 return publicKey;
 }
async function getUserData(userEmail){
    const result =await db.patient.findOne({
        attributes:["email","firstName","lastName","telNumber","MetaMaskAddress","profileImagePath","docteurEmail"],
        where:{
            email:userEmail
        }
    })
    return result;
}



module.exports={
    getPublicKey,
    verifierLeRefreshToken,
    getDocteurs,
    changeEmail,
    changeProfileImage,
    changePassword,
    addFilePath,
    addDocteurEmail,
    getUserData
}


