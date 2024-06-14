const db=require("../models");
async function addTimeFree(docteurEmail,DATE){
    try {
        const docteur=await db.docteur.findOne({where:{
            email:docteurEmail
        }})
        if(docteur){
            const result=await db.schedule.create({scheduleDate:DATE});
            if(result){
               await docteur.addSchedule(result);
                return true;
            }
        }
        return false;
    } catch (error) {
       
        console.log(error);
        return false;
        
    }

}
//

async function removeTimeFree(id,docteurEmail){
    try {
        const result = await db.schedule.destroy({
            where:{
                schedule_id:id, 
                docteurEmail:docteurEmail

            }
        })
        console.log(11111,result)
        if(result){
            return true;
        }
        return false;
        
    } catch (error) {
        console.log(error);
        return false;
        
    }
    

}
async function verifierTimeFreeExist(docteurEmail,DATE){
    const result=await db.schedule.findAll({
        where:{
            docteurEmail:docteurEmail,
            scheduleDate:DATE
        }
    })
    if(result.length>0){
        return true;
    }else{
        return false;
    }
}
async function getDocteurFreeTime(docteurEmail){
    try {
        const result=await db.schedule.findAll({where:{
            docteurEmail:docteurEmail
        }})
        console.log(docteurEmail)
        return result;
        
    } catch (error) {
        console.log(error);

        return false;
        
    }

}
module.exports={
    addTimeFree,
    removeTimeFree,
    getDocteurFreeTime,
    verifierTimeFreeExist
}
