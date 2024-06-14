const db=require("../models");
const { Op } = require('sequelize');

//get all confirmed appointement and no confirmed appointement for docteur
async function getAppointementForDocteur(docteurEmail){
    const result= await db.appointement.findAll({attributes:["appointement_id","appointementDate","docteurEmail","patientEmail","statue"],where:{
        docteurEmail:docteurEmail,
    }})
     return result;

}
async function verifierAppointementExist(docteurEmail,userEmail,DATE){
   const result= await db.appointement.findOne({
    where:{
      docteurEmail:docteurEmail,
      appointementDate:DATE,
      patientEmail:userEmail
    }});
    if(result){
      return true;
    }else{
      return false;
    }
}
async function removeAppointement(docteurEmail,userEmail,DATE){
 

  console.log(docteurEmail,userEmail,DATE)
  const result = await db.appointement.destroy({
    where:{
      docteurEmail:docteurEmail,
      appointementDate:DATE,
      patientEmail:userEmail
    }
  })
  console.log(result)
  if(result){
    return true;
  }else{
    return false;
  }
}
//get all confirmed appointement and no confirmed appointement for client
async function confirmeAppointement(userEamil,docteurEmail,id){
  console.log(docteurEmail)
    const [updatedRowsCount, updatedRows]=await db.appointement.update(
        {
            statue:true
        },
        {
          where: {
            appointement_id:id,
            patientEmail: userEamil,
            docteurEmail:docteurEmail,
            statue:false
          },
        }
      ); 
      console.log(updatedRowsCount)
      if(updatedRowsCount){
        console.log(111)
        return true;
      }
      return false;

}
//user will add the appointement
async function addApointement(userEamil,docteurEmail,DATE){
  console.log(userEamil,docteurEmail,DATE)
  if(userEamil && docteurEmail && DATE){
    
    const docteur=await db.docteur.findOne({where:{
        email:docteurEmail
    }})
    const patient=await db.patient.findOne({where:{
        email:userEamil
    }})
   if(patient && docteur){
    const result=await db.appointement.create({appointementDate:DATE})
    await docteur.addAppointement(result);
    await patient.addAppointement(result); 
    return true;

   }
   return false;

  }else{
    return false;


  }
    
 
  
}
//remove the an appointement  

//get all confirmed appointement and no confirmed appointement for client
async function getAppointementForClient(userEmail){
    const result= await db.appointement.findAll({attributes:["appointement_id","appointementDate","docteurEmail","patientEmail","statue"],where:{
        patientEmail:userEmail
    }});
     return result;
}
async function removeAllAppointementNoconfirmed(email,DATE){
  const deletedRowCount = await db.appointement.destroy({
    where: {
      docteurEmail:email,
      appointementDate: DATE,
      statue:false
    }
  });
 
    return true;

}
async function remove(email,docteurEmail){
  const deletedRowCount = await db.appointement.destroy({
    where: {
      patientEmail :email,
      docteurEmail: { [Op.ne]: docteurEmail }
    }
  });
  return true;
}
function isValidDateFormat(dateString) {
  const dateFormatRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/;
  console.log(dateFormatRegex.test(dateString))
  return dateFormatRegex.test(dateString);
}

// Function to check if a date is in the future compared to the current date
function isDateInFuture(dateString) {
  const date = new Date(dateString);
  const currentDate = new Date();

  return date > currentDate;
}

// Function to combine both checks
function isValidFutureDate(dateString) {
  return isValidDateFormat(dateString) && isDateInFuture(dateString);
}

 
module.exports={
    getAppointementForClient,
    getAppointementForDocteur,
    addApointement,
    removeAppointement,
    confirmeAppointement,
    removeAppointement,
    removeAllAppointementNoconfirmed,
    remove,
    isValidFutureDate,
    verifierAppointementExist
}
