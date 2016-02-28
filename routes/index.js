var express = require('express');
var router = express.Router();
var accountSid = 'AC74d3f913d8417e3da6fe763e7119db38';
var authToken = "3efc44c6e1aa92a223d77e6445bcf5ed";
var client = require('twilio')(accountSid, authToken);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// post to the api, which tells the twilio api to input those digits
router.get('/callAndInput/:numbers', function(req,res,next){
  // Download the Node helper library from twilio.com/docs/node/install
// These vars are your accountSid and authToken from twilio.com/user/account
  var waitForFiveSeconds = "wwwwwwwwww";
  var digitString = '';
  console.log(req.params.numbers);
  var digits = req.params.numbers.split('');
  digits.forEach(function(digit){
    // always wait 5 seconds before hitting the next digitt
    digitString += (waitForFiveSeconds + digit);
  });
  console.log("DAT STRING: " + digitString);
  client.calls.create({
    url: "http://twimlbin.com/4563711fd1af1cd6c75b8e4fe41e987b",
    to: "+14804943646",
    from: "+12028499415",
    sendDigits: digitString
  }, function(err, call) {
    process.stdout.write(call.sid);
  });
});


router.get('/returnCall/:number', function(req,res,next){
  // Download the Node helper library from twilio.com/docs/node/install
// These vars are your accountSid and authToken from twilio.com/user/account
  client.calls.create({
    url: "http://twimlbin.com/4563711fd1af1cd6c75b8e4fe41e987b",
    to: "+1" + req.params.number,
    from: "+14804943646"
  }, function(err, call) {
    process.stdout.write(call.sid);
  });
});

// get the api to add person to the conference call

module.exports = router;
