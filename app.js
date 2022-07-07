const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const client = require("@mailchimp/mailchimp_marketing");
const { response } = require("express");
const app = express();

var Mailchimp = require('mailchimp-api-v3');
var mailchimp = new Mailchimp("Write your full API Key here");

app.use("/public" , express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));


app.get("/",function(req,res){
    res.sendFile(__dirname + "/signup.html");
});

client.setConfig({
    apiKey:"Write your API Key here without 'us14' thing ",
    server:"Write your Server here like this 'us14'",
});

app.post("/" , function(req,res){
    var email = req.body.email;
    console.log(email);

mailchimp.post("/lists/Write your list id here/members",{
    email_address : email ,
    status: 'subscribed',
})


.then(function(result){
    res.sendFile(__dirname + "/success.html");
})

.catch(function(err){
    res.sendFile(__dirname + "/failure.html");
})

})


app.listen(process.env.PORT || 3000,function(){
    console.log("source code 200");
});
