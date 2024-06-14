const db=require("../models");
const auth = require('./authController');
const crypto=require("crypto")
async function verifyKey(key){
   const data=await db.docteurKey.findOne({where:{
    identifier:key,
    docteurEmail:null
   }})
   if(data){
    return true;
   }else{
    return false;
   }
}
async function  addDocteur(requestBody){
    
   let hash = crypto.createHash("sha256");
   hash.update(requestBody.password);
   hash = hash.digest("hex");
    const data=await db.docteur.create({email:requestBody.email,
        	firstName:requestBody.firstName,
            lastName:requestBody.lastName,	
            telNumber:requestBody.telNumber,
            password:hash,
            MetaMaskAddress:requestBody.MetaMaskAddress,
            publicKey:requestBody.publicKey
    })

    if(data){
        const docteurKeyInstance=await db.docteurKey.findOne({where:{
            identifier :requestBody.key
           }})
        data.setDocteurKey(docteurKeyInstance)
        return data;
    }
    return false;
}
async function addFilePath(email,filePath) {
    try {
      
        await db.docteur.update(
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
async function changePassword(userEmail,userPassword,newPassword){
    try {
        if(auth.verifierLesDonnerPasser(userEmail,userPassword)){
            if(auth.verifierLesDonnerPasser(userEmail,newPassword)){
                //hash the newpassword
                let hash = crypto.createHash("sha256");
                hash.update(userPassword);
                hash = hash.digest("hex");
                newPassword=crypto.createHash("sha256").update(newPassword).digest("hex");
                console.log(hash)
                console.log(newPassword)

                          
           const result= await db.docteur.update(
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
async function getDocteurData(docteurEmail){
    const result =await db.docteur.findOne({
        attributes:["email","firstName","lastName","telNumber","MetaMaskAddress","publicKey","profileImagePath"],
        where:{
            email:docteurEmail
        }
    })
    return result;
}
async function changeProfileImage(email,imagePath){
    try {
        await db.docteur.update(
            { 	profileImagePath: imagePath }, 
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

async function changeEmail(userEmail,userPassword,newEmail){
    try {
        const test=auth.verifierLesDonnerPasser(newEmail,userPassword)
        if(test){
            
        //verifier qu il  n existe aucun emaile comme
        if(newEmail===userEmail){
            return false;
        }
        let hash = crypto.createHash("sha256");
                hash.update(userPassword);
                hash = hash.digest("hex");


      const data=  await db.docteur.findOne({where:{
            email:newEmail
        }})
        console.log(data)
        if(data===null) {
            console.log(11111)
           const result= await db.docteur.update(
                { email: newEmail},
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
        console.error(error);
        return false;
        }
}

async function getPublicKey(email){
   const publicKey= await db.docteur.findOne({attributes:["publicKey"],
    where:{email:email}
})
return publicKey;
}

module.exports={
    getPublicKey,
    changeEmail,
    changeProfileImage,
    changePassword,
    addFilePath,
    verifyKey,
    addDocteur,
    getDocteurData
  
}


