const firebaseConfig = {
    apiKey: "AIzaSyDefDIbmE2GQ0C-URvLokv-BrFB9H18TlU",
    authDomain: "deepsecurityyy.firebaseapp.com",
    databaseURL: "https://deepsecurityyy.firebaseio.com",
    projectId: "deepsecurityyy",
    storageBucket: "deepsecurityyy.appspot.com",
    messagingSenderId: "204372305691",
    appId: "1:204372305691:web:6e624cbc4123cc012555be",
    measurementId: "G-GF4DB39S5C"
  };
firebase.initializeApp(firebaseConfig);

 let db = firebase.firestore();

function getDataFire(s){
   var docRef =  db.collection("QR Code").doc(s);
   docRef.get().then((doc)=>{
    if (doc.exists){
       getDetails(doc.data(),s);
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
  });
}
  function getDetails(Stri,s){
    var collRef = Stri.GuestAt.parent;
       var path1 = Stri.Start.path;
       var path2 = Stri.End.path; 
       var res1 = path1.split("/");
       var res2 = path2.split("/");
       var today = new Date();
       var outputData1 = document.getElementById("outputData1");
       var outputMessage = document.getElementById("outputMessage");
       var months = [ "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", 
           "JULY", "AUGUST", "SEPTEMPER", "OCTOBER", "NOVEMBER", "DECEMBER" ];
       var date = months[today.getMonth()] + " " +  today.getFullYear();
    if(res1[4] == today.getDate() && res1[3] == date){
       collRef.doc("Users").get().then((doc) => {
       if (doc.exists) {
          outputMessage.hidden = false;
          outputData1.parentElement.hidden = true;
        var count = doc.data().count;
        var data = doc.data();
       getTokens(doc.data().Admin,Stri.name1);
       var i;
       for (i = 0; i < count; i++) {
        var k = i+1; 
        getTokens(doc.get("Member" + k), Stri.name1);
        }
       }
        else{
           console.log("No such document!");
        }
           // doc.data() will be undefined in this case 
    }).catch((error) => {
         console.log("Error getting document:", error);
       });    
  }
  else{
          outputMessage.hidden = true;
          outputData1.parentElement.hidden = false;
          outputData1.innerText = "This QR Is Not For Today";
  }
}
// Firestore data converter
function getTokens(s,s1){
   s.get().then((doc) => {
     if (doc.exists){
       // console.log("Document data:", doc.data());
       var city = doc.data();
       console.log(doc.data().token);
       var registrationToken = doc.data().token;
       var data = {"token": registrationToken,"name": s1};
        fetch('/notify', {
        method: 'POST',
        body: JSON.stringify(data),
       headers: {'Content-Type': 'application/json; charset=UTF-8'},
       })
       .then(response => response.json())
       .then(data => {
      // get the response from the server POST request
         console.log(JSON.stringify(data));
      
      // Add the response to the page
        });
 
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!"); 
    }
    }).catch((error) => {
    console.log("Error getting document:", error);
    });
        
 }
