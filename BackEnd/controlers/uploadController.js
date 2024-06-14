const busboy=require("busboy");
const fs =require("fs");
const cryptoConttroler=require("./cryptoController")
const patientDatabase=require("./dataBaseController")
const docteurDataBase=require("./doctorDataBasecontroller")

async function uploadImafeProfile(file,fileName){
    const writingIn=fs.createWriteStream(`./uploads/files/images/${fileName}.jpg`);
    file.resume(); 
    file.pipe(writingIn);
  

    writingIn.on('error', (err) => {
      return false;
 });
 writingIn.on('finish', () => {
    console.log("Write stream finished.");
    writingIn.close(); 
});
 return true;


}

//create file in 
async function uploadAndSyncImage(file,mimeType,user) {
    const verifier=await uploadImafeProfile(file,user.email);
    console.log(verifier)
    if(verifier){
        if(user.role==="patient"){
          await  patientDatabase.changeProfileImage(user.email,`./uploads/files/images/${user.email}.jpg`) 
            return true;
        }
        if(user.role==="docteur"){
           await docteurDataBase.changeProfileImage(user.email,`./uploads/files/images/${user.email}.jpg`)    ;
            return true;
            }
        
       
    }
    return false;
    
}
async function uploadAndSyncfile(file,fileName,user) {
    const verifier=await uploadMedicalDocument(file,fileName);
    if(verifier){
       
        patientDatabase.addFilePath(user.patientEmail,`./uploads/files/${fileName}`);
        return true;
    }
    return false;
}
async function uploadMedicalDocument(file,fileName){
        const writingIn=fs.createWriteStream(`./uploads/files/${fileName}`);
       file.resume(); 
       file.pipe(writingIn);
       writingIn.on('error', (err) => {
         return false;
    });
    return true;

    
}
async function updateFile(req) {
    return new Promise((resolve, reject) => {
        const bb = busboy({ headers: req.headers });
        let res = {};
        bb.on("file", (fieldname, file, info) => {
            file.pause();
            if (isFileTypeAllowed(info.mimeType)&&
            cryptoConttroler.verifierSignatureDocteur(res.plainText,res.signature,req.user.email)) 
            {   const encoding=info.encoding;
                const mimeType=info.mimeType;
                const fileName=info.filename;
                uploadAndSyncfile(file,fileName,req.user);
                res[fieldname] = { file,fileName, encoding, mimeType };
            } else {
                
                res.verifier = false;
                file.resume();

                
            }
        });
        bb.on('field', (fieldname, value, nameTruncated, valueTruncated, encoding, mimetype) => {
            res[fieldname] = value;
            if(fieldname==="patientEmail"){
                req.user.patientEmail=value;
            }
            
        });
        bb.on("error", (err) => {
            res.error = err;
            res.verifier = false;
            reject(res); 
        });
        bb.on('finish', () => {
            if(res.verifier!==false){
                res.verifier=true;
            }
         
            resolve(res); 
        });
        req.pipe(bb);
    });
}
async function addProfileImage(req){
    return new Promise( (resolve, reject) => {
        const bb = busboy({ headers: req.headers });
        let res = {};
        bb.on("file",async (fieldname, file, info) => {
            file.pause();
            if (isImageTypeAllowed(info.mimeType))
            {   const encoding=info.encoding;
                const mimeType=info.mimeType;
                const fileName=info.filename;
               await uploadAndSyncImage(file,fileName,req.user);
                console.log(1111)
                res[fieldname] = { file,fileName, encoding, mimeType };
            }else {
                
                res.verifier = false;
                file.resume();

                
            }
        });
      
        bb.on("error", (err) => {
            res.error = err;
            res.verifier = false;
            reject(res); 
        });
        bb.on('finish', () => {
            if(res.verifier!==false){
                
                res.verifier=true;
            }
            console.log(3333333)
            resolve(res); 
        });
        req.pipe(bb);
    });
}
function isFileTypeAllowed(mimetype) {
    return mimetype === 'application/pdf' ||
           mimetype === 'application/msword' ||
           mimetype === 'text/plain';
  }
function isImageTypeAllowed(mimetype){
    return mimetype==="image/jpeg" || mimetype==="image/png";
  }
async function getImageProfile(){} 
module.exports={updateFile,addProfileImage}
