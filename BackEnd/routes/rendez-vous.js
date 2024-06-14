const express=require("express");
const db=require("../models");
const appointement=require("../controlers/appointementConttroller");
const schedule=require("../controlers/scheduleConttroller")
const dataBase=require("../controlers/dataBaseController")
const router=express.Router();
router.get("/MyAppointement",async (req,res)=>{
    if(req.user.role==="patient"){
        const result= await appointement.getAppointementForClient(req.user.email);
        res.json(result);
    }else{
        res.status(400).send("you are not authorized")
    }
 
})
//docteur can see all his appointement
router.get("/MyAppointementDocteur",async (req,res)=>{
    try{
        if(req.user.role==="docteur"){
            const result=await appointement.getAppointementForDocteur(req.user.email);
            res.json(result);
        }

    }catch(err){
        res.status(400).send("nono")
    }
   
})
router.post("/seeDocteurFreeTime",async (req,res)=>{
    try {
        console.log(req.body.docteurEmail)
        const result=await schedule.getDocteurFreeTime(req.body.docteurEmail);
    res.json(result)
        
    } catch (error) {
        res.status(400).send("nono")
    }
    
})
router.delete("/DocteurRemoveFreeTime",async (req,res)=>{
    try {
        const verifier=await schedule.verifierTimeFreeExist(req.user.email,req.body.DATE)
        if(req.user.role==="docteur" && verifier ){
            const result=await schedule.removeTimeFree(req.body.id,req.user.email);
            const result1=await appointement.removeAllAppointementNoconfirmed(req.user.email,req.body.DATE)
            if(result&&result1){
                res.json(result);
            }else{
                res.status(403).json({
                    message:"vous n avez pas le droit duaire cette action",
                    result:false
                })
            }
        }else{
            res.status(400).json({
                message:"please verify your data you are not a doctor or this freetime don t exist",
                result:false
            })
        }
    } catch (error) {
        res.status(400).send("nono")
    }
   
})
router.post("/addFreeTime",async (req,res)=>{
    try {
        if(!appointement.isValidFutureDate(req.body.DATE))
        {
            return res.status(400).json({
                message:"the date object is not valid please verify the date",
                result: false
            })
        }
        const verifier=await schedule.verifierTimeFreeExist(req.user.email,req.body.DATE)
        if(req.user.role="docteur" && !verifier ){
            const result=await schedule.addTimeFree(req.user.email,req.body.DATE);
            if(result){
                res.json(result);
            }else{
                res.status(403).json({
                    message:"vous n avez pas le droit duaire cette action",
                    result:false
                })
            }
        }else{
            res.status(403).json({
                message:"vous n avez pas le droit duaire cette action",
                result:false
            })
    
        }
    } catch (error) {
        res.status(400).send("nono")
        
    }
   
})

router.post("/addAppointement",async (req,res)=>{
    try {
        if(!appointement.isValidFutureDate(req.body.DATE))
        { console.log(req.body.DATE)

            return res.status(400).json({
                message:"the date object is not valid please verify the date",
                result: false
            })
        }
        const verifier=await schedule.verifierTimeFreeExist(req.body.docteurEmail,req.body.DATE);
        if(verifier){ 
            const test=await appointement.verifierAppointementExist(req.body.docteurEmail,req.user.email,req.body.DATE)
            if(test){
                return res.json({
                    message:"vous avez deja une demande"
                })
            }
            const result = await appointement.addApointement(req.user.email,req.body.docteurEmail,req.body.DATE);
            await appointement.remove(req.user.email,req.body.docteurEmail);
            if(result){
                res.json({
                    message:"nous avons ajouter le demande successfully",
                    result:true
                })
            }else{
                res.status(400).json({
                    message:"no",
                    result:false
                })
    
            }
           
        }else{
            
            res.status(400).json({
                message:"no",
                result:false
            })
        }
    
    } catch (error) {
        console.log(error)
        res.status(400).send("nono")
    }
   
})
router.post("/confirmeAppointement",async (req,res)=>{
    try {
        if(req.user.role=="docteur"){
            const result=await appointement.confirmeAppointement(req.body.userEmail,req.user.email,req.body.id);
            let data= await db.appointement.findAll({attributes:["appointementDate"],where:{
               appointement_id:req.body.id
       
           }}) 
           const data1=await db.schedule.findOne({
               where:{
                   scheduleDate:data[0].appointementDate,
                   docteurEmail:req.user.email
       
               } 

            })
            if(result){
                const result1=await schedule.removeTimeFree(data1.schedule_id,req.user.email)
                const result2=await appointement.removeAllAppointementNoconfirmed(req.user.email,data[0].appointementDate)
                await dataBase.addDocteurEmail(req.body.userEmail,req.user.email);
                console.log(result1,result,result2)
                 if(result1&&result2){
                    res.json({ message:"nice",result:true
                })
            
                 }else{
                    res.status(400).json({
                        message:"no",
                        result:false
                 })
                    }
                      
                 
            }else{
                res.status(400).json({
                    message:"no",
                    result:false
             })
             }        
            }else{
                res.status(400).json({
                    message:"noooo",
                    result:false
             })
                }
    }catch (error) {
        res.status(400).send("nooooooo")
        
    }
    
    
    
   
    
})
router.post("/refuser",async (req,res)=>{
    try {
        if(req.user.role==="docteur"){
            let result =await appointement.removeAppointement(req.user.email,req.body.email,req.body.DATE)
            if(result){
                res.json({
                    message:"nice",
                    result:true
                })
            }else{
                console.log(11111)
                res.json({
                    message:"lalaoulala",
                    result:false
                })
            }
        }
        if(req.user.role==="patient"){
            let result =await appointement.removeAppointement(req.body.email,req.user.email,req.body.DATE)
            if(result){
                res.json({
                    message:"nice",
                    result:true
                })
            }else{
                res.json({
                    message:"lalaoulala",
                    result:false
                })
            }
        }
    } catch (error) {
        res.status(400).send("nooooo")
    }
    
   
   
})

module.exports=router;