const express = require("express");
require("dotenv").config();
const cors = require("cors")
const db=require("./models")
const app = express();
const auth=require("./controlers/authController")
const bodyParser = require("body-parser");
const userRouter=require("./routes/userRoutes")
const jwt =require("jsonwebtoken");
const docteurDataBase=require("./controlers/dataBaseController")
const authentification=require("./routes/authRoute");
const changeData=require("./routes/changeDataRoute")
const appointement=require("./routes/rendez-vous")

//const userService=require("./controllers/userService");
const up=require("./controlers/uploadController")
const corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
        if (req.path === "/login" || req.path === "/signUp"|| req.path ==="/getNewAccessToken") {
            return next();
        }
    
        const authHeader = req.headers["authorization"];
        if (authHeader) {
            //verifier si on 
            const tokens = authHeader.split(' ').slice(1);
            const token=tokens[0];
            if (token) {
                jwt.verify(token, process.env.SECRET_KEY_FOR_ACCESS_TOKEN, async (err, user) => {

                    if (err) {
                        return  res.status(401).json({message:"Unauthorized",
                        redirectedPage:"/login"
                    });
                    }
                   let result=await auth.refreshTokenIsNotNull(user.email,user.role);
                   if(result){
                    req.user = user;
                    return next();
                   }else{
                    return  res.status(401).json({message:"Unauthorized1",
                    redirectedPage:"/login"
                });
                   }
                   
                });
            } else {
              return  res.status(401).json({message:"Unauthorized1",
            redirectedPage:"/login"
        });
            }
        } else {
            return res.status(401).json({message:"Unauthorized2",
            redirectedPage:"/login"
        });
        }
    });
    
app.use("/",authentification)
app.use("/",userRouter)
app.use("/",appointement)
app.use("/",changeData)


db.sequelize.sync().then(()=>{
    app.listen(4200, () => {
        console.log("Server is running on port 3000");
    });
}).catch((err)=>{
    console.log("the connection to the dataBase has been filed",err.message)
})

