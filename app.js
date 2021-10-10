
const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const { Client, Intents } = require('discord.js12');
const { token } = require('./public/JS/config.json');



const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log(`${client.user.tag}`);
});

// Login to Discord with your client's token
client.login(token);
console.log(client);

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

app.get("/staff", function(req, res) {
  const options = {dynamic: true};
  const admins = ['532991839238750243', '561251425359757314', '740959665613176872', '303713050387808256'];
  const organizers = ['540009186558345241', '264016165469290497', '688104072154579030', '417592460844466176'];
  const developers = ['866934562826354698'];

  var adminInfo = [];
  var developerInfo = [];
  var organizerInfo = [];
  var c = 0;
  function incrementCount() {
    c++;
    if (c == 9) {
       load();
    }
  }
  admins.forEach(function(adminId) {
    client.users.fetch(adminId).then((user) => {
      var url = user.avatarURL(options);
      
      adminInfo.push({name: user.username, avatar: url});
      incrementCount()
    }).catch(console.error);
  });

  organizers.forEach(function(orgId) {
    client.users.fetch(orgId).then((user) => {
      var url = user.avatarURL(options);
      organizerInfo.push({name: user.username, avatar: url});
      incrementCount()
    }).catch(console.error);
  });

  developers.forEach(function(devId) {
    client.users.fetch(devId).then((user) => {
      var url = user.avatarURL(options);
      developerInfo.push({name: user.username, avatar: url});
      incrementCount();
    }).catch(console.error);
  });

  function load () {
    res.render('staff', {admins: adminInfo, organizers: organizerInfo, developers: developerInfo});
  }
  
})

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

app.get("/getUser", function(req, res) {

  const options = {dynamic: true};

  
    client.users.fetch('866934562826354698').then((user) => {
      console.log(user);
    }).catch(console.error);


  
  

  // client.users.fetch('866934562826354698').then((user) => {
  //   console.log(user.avatarURL(options));
  // }).catch(console.error);

  // client.users.fetch('700248400179888172').then((user) => {
  //   client.users.cache.get('700248400179888172').send('Hello bro! Sahil here').then((user) => {
  //     console.log("DM sent successfully");
  //   }).catch(console.error);
  // }).catch(console.error);

  

});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});