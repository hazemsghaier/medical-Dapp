const express = require("express")
const patientDatabase=require("../controlers/dataBaseController")
const auth=require("../controlers/authController");
const docteurDataBase=require("../controlers/doctorDataBasecontroller")
const upload=require("../controlers/uploadController")
const router=express.Router();
/*1-/*/ 
router.put("/changerPassword",async (req,res)=>{
    console.log("change password")
    if(req.user.role==="patient"){
       const result=await patientDatabase.changePassword(req.body.email,req.body.oldPassword,req.body.newPassword);
       if(result ){
           let data=req.user;
           const tokens=auth.createTokenOnLogin(data)
           const result1=auth.enregistrerLeRefreshToken(tokens,data.email,"patient");
           if(result1){
            console.log(11111)
            res.status(200).json({
                message:"ok",
                result:true,
                accessToken:tokens.accessToken,
                refreshToken:tokens.refreshToken,
                //effacer 
             })

           }else{
            res.status(500).json({
                message:"we have an internal problem",
                result:false
            })

           }
       
        }else{
        res.status(400).json({
            message:"please verify your email and password",
            result:false
        })
       }
    }
          if(req.user.role==="docteur"){
            const result=await docteurDataBase.changePassword(req.body.email,req.body.oldPassword,req.body.newPassword);
        if(result ){
            let data=req.user;
            const tokens=auth.createTokenOnLogin(data)
            const result1=auth.enregistrerLeRefreshToken(tokens,data.email,"docteur");
           if(result1){
            res.status(200).json({
                message:"ok",
                result:true,
                accessToken:tokens.accessToken,
                refreshToken:tokens.refreshToken
             })
            }else{
                res.status(500).json({
                    message:"we have an internal problem please login another time",
                    result:false
                })

            }
           
         }else{
         res.status(400).json({
             message:"please verify your email and password",
             result:false
         })
        }
    }
})
router.put("/changeEmail",async (req,res)=>{
    console.log("change Email")

    if(req.user.role==="patient"){
        const result=await patientDatabase.changeEmail(req.body.email,req.body.password,req.body.newEmail);
        if(result ){
            let data=req.user;
            data.email=req.body.newEmail
            const tokens=auth.createTokenOnLogin(data)
            const result1=auth.enregistrerLeRefreshToken(tokens,data.email,"patient");
            if(result1){
             res.status(200).json({
                 message:"jawek Bahi",
                 result:true,
                 accessToken:tokens.accessToken,
                 refreshToken:tokens.refreshToken,
                 //effacer en production
                 data:data
              })
           }else{
               res.status(500).json({
                   message:"we have an internal problem please do login",
                   result:false
               })
           }
         }else{
         res.status(400).json({
             message:"please verify your email and password",
             result:false
         })
        }}
           if(req.user.role==="docteur"){
             const result=await docteurDataBase.changeEmail(req.body.email,req.body.password,req.body.newEmail);
             console.log(result)
         if(result ){
             let data=req.user;
             data.email=req.body.newEmail
             const tokens=auth.createTokenOnLogin(data)
             const result1=auth.enregistrerLeRefreshToken(tokens,data.email,"docteur");
             if(result1){
              res.status(200).json({
                  message:"jawek bahi",
                  result:true,
                  accessToken:tokens.accessToken,
                  refreshToken:tokens.refreshToken,
                  //effacer en production
                  data:data
               })
            }else{
                res.status(500).json({
                    message:"we have an internal problem please do login",
                    result:false
                })
            }
          }else{
          res.status(400).json({
              message:"please verify your email and password",
              result:false
          })
         }
     }
})
router.put("/addProfileImage",async (req,res)=>{
    try{
        const result= await upload.addProfileImage(req);
        if(result.verifier===true){
            res.status(200).json({
                message:"the image has been added good",
                result:true,
             })
        }else{
            res.status(400).json({
                message:"please verify your image types ",
                result:false
            })
        }
    }catch(err){
        res.status(400).json({message:err.message,})
    }
})
module.exports=router