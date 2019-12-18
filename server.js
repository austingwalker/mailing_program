const express = require("express");
const bodyParser = require("body-parser");
const hbs = require('nodemailer-express-handlebars');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3001;

// Define middleware here
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}


app.post("/api/email", function(req, res) {
  const emails = req.body.email.join(", ")
  console.log(emails)
  const output = `
    <h1 style="color:red">Email Worked</h1>
  `
  async function main() {

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'austinwalker.homenow@gmail.com', // generated ethereal user
      pass: 'Aw12345*' // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  transporter.use("compile",hbs({
    viewEngine:{
       partialsDir: 'views',
       defaultLayout:""
   },
      viewPath:"./views/",
      extName:".handlebars"
    }));
  
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Austin Walker" <austinwalker.homenow@gmail.com', // sender address
    to: emails, // list of receivers
    subject: "HomeNow Interview Coding Challenge", // Subject line
    // html: emailHTML, // html body
    template: 'index',
    attachments: [
      {
      filename: 'DogandCat.jpg',
      path: './images/DogandCat.jpg',
      cid: 'dogandcat'
      },
      {
        filename: 'Dog.jpg',
        path: './images/Dog.jpg',
        cid: 'dog'
      },
      {
        filename: 'Cat.jpg',
        path: './images/Cat.jpg',
        cid: 'cat'
      },
      {
        filename: 'Turtle.jpg',
        path: './images/Turtle.png',
        cid: 'turtle'
      }
  ]

  });
  
  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}
main().catch(console.error)
const sucessful = {
  success: "Succesful!"
}
res.json(sucessful) 
});

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
