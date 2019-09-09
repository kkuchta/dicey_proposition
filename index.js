const express = require('express')
const app = express()
const port = 3000
const BeginIntent = require('./beginIntent')
const RollIntent = require('./rollIntent')
const DoneIntent = require('./doneIntent')

app.use(express.json())

function launch(req) {
  console.log("launchRequest here");
  return {
    "version": "1.0",
    "sessionAttributes": {
      "state": "starting"
    },
    "response": {
      "shouldEndSession": false,
      "outputSpeech": {
        "type": "PlainText",
        "text": "Welcome to Dicy Proposition!  Say 'start' to start."
      },
    }
  };
}

function intent(req) {
  console.log("Got intent:", req.body.request.intent.name);

  let intentClass = null;
  switch (req.body.request.intent.name) {
    case 'BeginIntent': intentClass = BeginIntent; break;
    case 'RollIntent': intentClass = RollIntent; break;
    case 'DoneIntent': intentClass = DoneIntent; break;
    case 'AMAZON.FallbackIntent': console.log('err: fallback intent'); break;
  }

  const intent = new intentClass(req.body)
  debugger
  return intent.getResponse();
}

function sessionEnd(req, res) {
  console.log("Session end request");
  return {}
}

app.post('/', (req, res) => {
  // TODO: verify that this request actually came from alexa

  const requestType = req.body.request.type
  let response = {};
  switch (requestType) {
    case 'LaunchRequest': response = launch(req); break;
    case 'SessionEndedRequest': response = sessionEnd(req); break;
    case 'IntentRequest': response = intent(req); break;
    default: console.log('Unhandled request type: ', requestType); break;
  }
  res.send(response);
})

app.listen(port, () => console.log(`Dicey Proposition game up on ${port}!`))
