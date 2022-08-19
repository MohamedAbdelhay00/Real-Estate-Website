
const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(express.json());

app.get("/", function(req,res){
  res.sendFile(__dirname + "/views/home.html");
});

app.get("/exploration", function(req,res){
  res.sendFile(__dirname + "/public/exploration.html");
});

app.get("/apartment", function(req, res){
  res.sendFile(__dirname + "/public/apartment.html");
});

// Sending Mail:

app.get("/contact-form", function(req, res){
  res.sendFile(__dirname + "/public/contact-form.html");
});

app.post("/", function(req, res){
  console.log(req.body);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "zoooro013@gmail.com",
      pass: "urlhtyjknvkrocch"
    }
  });

  const mailOptions = {
    from: "zoooro013@gmail.com",
    to: req.body.email,
    subject: "Message from " + (req.body.email) + " " + (req.body.subject),
    text: req.body.message
  }

  transporter.sendMail(mailOptions, function(error, info){
    if(error){
      console.log(error);
      res.send("error");
    } else{
      console.log("Email sent");
      res.send("success");
    }
  });

});

app.listen(PORT, function(req, res){
  console.log("Server has started on port 3000");
});
