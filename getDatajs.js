var admin = require("firebase-admin");
const express = require("express");


var serviceAccount = require("C:/Users/Admin/Downloads/deepsecurityyy-firebase-adminsdk-c4lsm-3a8322c08b.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://deepsecurityyy.firebaseio.com"
});
  
 const app = express();
 app.use(express.json());
 var bodyParser = require('body-parser');
 app.use(express.urlencoded({ extended:true}));
 app.use(express.static("public"));
 app.get("/",function(req,res){
  console.log("Home Route Accessed!");
  res.sendFile('public/index.html', {root:__dirname});
 });
 app.post("/notify",async(req,res)=> {
    // body...
    const data = await req.body
    const message = {
      notification:{
        title: "Your visitor has arrived",
        body: data.name + " has entered your society"
      },
      token: data.token
    };
    admin.messaging().send(message).then(function(response){
      console.log("notify",response);
    }).catch(function(error) {
      console.log("failed",response);
    });
  });
  
  app.listen(3000,function(){
    console.log("Listening on port 3000");
  });

 