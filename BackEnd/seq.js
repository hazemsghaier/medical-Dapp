const NodeRSA = require('node-rsa');
const fs=require("fs");
const publicKey=new NodeRSA()
const privateKey=new NodeRSA()

const public=fs.readFileSync("./publicKey","utf-8");
const private=fs.readFileSync("./privateKey","utf-8");
publicKey.importKey(public);
privateKey.importKey(private);
const encrypted =privateKey.sign("aya winkom ay");

console.log(isSigniatureValid)



