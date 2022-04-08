const express = require("express");
const bodyparser = require("body-parser");
const https = require("https");

const app = express();

app.use(express.static('public'));
app.use(bodyparser.urlencoded({extension : true}));


app.get("/" , function(req , res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/" , function(req , res){
  var fname = req.body.fname;
  var lname = req.body.lname;
  var email = req.body.email;

  const data = {
    members : [{
      email_address : email,
      status : "subscribed",
      merge_feilds : {
        FNAME : fname,
        LNAME : lname
      }
    }]
  }

  const jsonData = JSON.stringify(data);
  const url = 'https://us14.api.mailchimp.com/3.0/lists/62a8ff7854';
  const options = {
    method : "POST",
    auth : "dharun:775e40d32c172e95c7f80a4d56e0b608-us14"//name can be bla bla bla
  }

  const request = https.request(url , options , function(response){

      if(response.statusCode === 200){
        console.log(__dirname + "/success.html");
        res.sendFile(__dirname + "/success.html");
      } 
      else {
        res.sendFile(__dirname + "/failure.html");
      }

      response.on("data" , function(data){
        // console.log(JSON.parse(data));
      })
  })
  request.write(jsonData);
  request.end();

})

app.post("/failure" , function(req , res){
  console.log("hi");
  res.redirect("/");
})



// request.write(jsonData);
// request.end();

app.listen(process.env.PORT || 3000 , function(){//process.env.PORT choose dynamic port with heroku
  console.log("The port is running at 3000");
});


// API KEY
// 775e40d32c172e95c7f80a4d56e0b608-us14

// Audience Id or List ID
// 62a8ff7854
