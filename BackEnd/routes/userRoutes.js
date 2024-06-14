const express=require("express");
const docteurDB=require("../controlers/doctorDataBasecontroller")
const dataBase=require("../controlers/dataBaseController");
const auth=require('../controlers/authController')
const fs=require("fs")
const path=require("path")

const router=express.Router();
router.get("/all",async (req,res)=>{
     const data= await dataBase.getDocteurs();
    res.json(data);
});
router.post("/getNewAccessToken",async (req,res)=>{
    const result=await auth.makeAccessTokenFromRefresh(req);
    if(!result){
        res.status(401).send("you are not authorized to get a new access token");
    }else{
        res.json(result);
    }
})
router.get("/getImage",(req,res)=>{
    console.log(req.query.imagePath)
    const imagePath = path.join(__dirname, '..', req.query.imagePath);

    if (fs.existsSync(`${req.query.imagePath}`)) {
        console.log(req.query.imagePath)

    res.sendFile(imagePath);
    }else{
        res.status(400).json({
            message:"there is no image like this",
            result:false
        })
    }
})
router.get("/docteurData",async (req,res)=>{
   const result=await docteurDB.getDocteurData(req.user.email);
   if(result){
    res.json(result);
   }else{
    res.status(400).json({
        message:"there is no docteur like this",
        result:false
    })
   }

})
router.post("/docteurData",async (req,res)=>{
    const result=await docteurDB.getDocteurData(req.body.email);
    if(result){
     res.json(result);
    }else{
     res.status(400).json({
         message:"there is no docteur like this",
         result:false
     })
    }
 
 })
router.get("/userData",async (req,res)=>{
    const result=await dataBase.getUserData(req.user.email);
    if(result){
        console.log(1111,result)
        res.json(result)
    }else{
        res.json({
            message:"lalalaoulalala",
            result:false
        })
    }
})
router.post("/userData",async (req,res)=>{
    const result=await dataBase.getUserData(req.body.email);
    if(result){
        console.log(1111,result)
        res.json(result)
    }else{
        res.json({
            message:"lalalaoulalala",
            result:false
        })
    }
})
module.exports=router;