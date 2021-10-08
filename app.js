
const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

//TODO

app.get("/", function(req, res) {
  res.sendFile(__dirname + '/public/html/index.html');
});

app.get("/release-blog", function(req, res) {
  res.sendFile(__dirname + "/public/html/release-blog.html");
});

app.get("/mod-application", function(req, res) {
  res.sendFile(__dirname + "/public/html/mod-application.html");
});


app.get("/feedback-form", function(req, res) {
  res.sendFile(__dirname + "/public/html/feedback.html");
});


app.post("/mod-application", function(req, res) {
  // console.log(req.body.username);
  // console.log(req.body.hfRank);
  // console.log(req.body.timezone);
  // console.log(req.body.game);
  // console.log(req.body.description);
  const output = `
    <p>You have a new mod application</p>
    <h3>Application Details</h3>
    <ul>  
      <li>Discord Username: ${req.body.username}</li>
      <li>HF Rank: ${req.body.hfRank}</li>
      <li>Timezone: ${req.body.timezone}</li>
      <li>Game: ${req.body.game}</li>
      <li>Description: ${req.body.description}</li>
    </ul>
  `;

   // create reusable transporter object using the default SMTP transport
   let transporter = nodemailer.createTransport({
    host: 'theforcearcadium.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'esports@theforcearcadium.com', // generated ethereal user
        pass: 'forcearcadium'  // generated ethereal password
    },
    tls:{
      rejectUnauthorized:false
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
      from: '"Force Arcadium" <esports@theforcearcadium.com>', // sender address
      to: 'forcearcadium@outlook.com, forcearcadium@gmail.com', // list of receivers
      subject: 'Mod Application', // Subject line
      text: 'Hello world?', // plain text body
      html: output // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);   
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

      res.redirect("/");
  });
});

app.post("/feedback-form", function(req, res) {
  const output = `
    <p>You received a feedback.</p>
    <h3>Feedback Details</h3>
    <ul>  
      <b><li>Discord Username:</li></b> ${req.body.username}
      <b><li>Games you prefer to play in the Arcadium?</li></b> ${req.body.games}
      <b><li>Do you like the way schedules are made for the Arcadium?</li></b> ${req.body.scheduleRadio}
      <b><li>Should we increase the number of events held per day?</li></b> ${req.body.numOfEventsRadio}
      <b><li>Provide us a feedback about your overall experience in the Force Arcadium:</li></b> ${req.body.genFeedback}
      <b><li>What do you think about Force Arcadium's website?</li></b> ${req.body.websiteFeedback}
    </ul>
  `;

   // create reusable transporter object using the default SMTP transport
   let transporter = nodemailer.createTransport({
    host: 'theforcearcadium.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'esports@theforcearcadium.com', // generated ethereal user
        pass: 'forcearcadium'  // generated ethereal password
    },
    tls:{
      rejectUnauthorized:false
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
      from: '"Force Arcadium" <esports@theforcearcadium.com>', // sender address
      to: 'forcearcadium@outlook.com, forcearcadium@gmail.com, pavle.roomba@gmail.com', // list of receivers
      subject: 'Feedback', // Subject line
      text: 'Hello world?', // plain text body
      html: output // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);   
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

      res.redirect("/");
  });
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});