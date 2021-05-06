// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

//Timestamp Microservices Request
app.get("/timestamp", function (req, res) {
  res.sendFile(__dirname + '/views/timestamp.html');
});

//Request Header Parser request
app.get("/requestHeaderParser", function (req, res) {
  res.sendFile(__dirname + '/views/requestHeaderParser.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

//empty date paramater to return current time in json
app.get("/api/timestamp", (req, res) => {
  var now = new Date();

  res.json({
    "unix": now.getTime(),
    "utc": now.toUTCString()
  });
});


//valid date requests to return unix & utc keys
app.get("/api/timestamp/:date_string", (req, res) => {
  let dateString = req.params.date_string;

  if(parseInt(dateString) > 10000){
    let unixTime = new Date(parseInt(dateString));
    res.json({
      "unix": unixTime.getTime(),
      "utc": unixTime.toUTCString()
    });

  }

  let parsedInValue = new Date(dateString);

  if(parsedInValue == "Invalid Date"){
    res.json({"error": "Invalid Date"});
  }else{
    res.json({
      "unix": parsedInValue.getTime(),
      "utc": parsedInValue.toUTCString()
    });
  };
});


app.get("/api/whoami", (req, res) => {
  res.json({
    //value: Object.keys(req),
    "ipaddress": req.ip,
    "language": req.headers["accept-language"],
    "software": req.headers["user-agent"],
    //"req-headers": req.headers
  });
});


// listen for requests :)
var listener = app.listen(port, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
