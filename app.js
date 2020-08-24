const express = require('express');
const app = express();
const request = require('request');
const https = require('https');
const port = 3000;
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"))


app.get('/', function(req, res){
  res.sendFile(__dirname + "/signup.html");
})

app.post('/', function(req, res){
  const firstName = (req.body.firstName);
  const lastName = (req.body.lastName);
  const email = (req.body.email);
  console.log(firstName, lastName, email)
  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        }
      }
    ]
  };
  const jsonData = JSON.stringify(data);
  const url = "https://us17.api.mailchimp.com/3.0/lists/" //ADD LIST ID AT THE END OF THIS URL - REMOVED FOR REPO (MAILCHIMP DOMAIN MAY ALSO BE DIFFERENT FOR YOUR ACCOUNT)
  const options = {
    method: "POST",
    auth: "" //ADD API KEY HERE(REMOVED FOR REPO)
  }
  const request = https.request(url, options, function(response){
    response.on("data", function(data){
      var mcResponce = response.statusCode

      if (mcResponce == 200) {
        console.log("Success!")
        res.sendFile(__dirname + "/success.html");
      }
      else {
        console.log(mcResponce)
        res.sendFile(__dirname + "/failure.html");
      }

    })
  });


 request.write(jsonData);
 request.end();

})

app.post('/failure', function(req, res){
  res.redirect('/')
});




app.listen(process.env.PORT || 3000, function(res){
  console.log('App is listening on port:', port);

})



