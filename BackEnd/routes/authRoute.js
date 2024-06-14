const db=require("../models")
const express=require("express");
const router=express.Router();
const userService=require("../controlers/userController")

router.post("/login",(req,res,next)=>{
    userService.login(req,"patient").then((verifier)=>{
        if(verifier){
            res.json({accessToken:verifier.accessToken,refreshToken:verifier.refreshToken,redirectedPage:"/profile"});
        }else{
            userService.login(req,"docteur").then((verifier)=>{
                if(!verifier){
                    res.status(401).json({ message: 'Invalid email or password',
                        redirectedPage:"/login"
                 });
                }else{
                    res.json({accessToken:verifier.accessToken,refreshToken:verifier.refreshToken,redirectedPage:"/profile"});

                }
            })
        }
        
    })
    
     


})
router.post("/signUp",(req,res,next)=>{
    userService.signUp(req).then((data)=>{
        if(data===false){
            res.status(401).send('nooooooo')
        }else{
            res.json(data);
        }


    }).catch((err)=>{
        
        console.log(err.message);

    })
})
router.post("/logout",async (req,res)=>{
   const  result = await userService.logout(req)
    if(result){
        res.send("vous avez deconnecter bien")
    }else{
        res.send("votre tokens ne sont pas valide")
    }

})






module.exports=router