const express = require('express')
const app = express()
const port = 3000

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
function sessionEnd(req, res) {
  console.log("sessionEnd here");
  return {}
}

function intent(req) {
  console.log("intent here", req.body.request.intent.name);

  switch (req.body.request.intent.name) {
    case 'BeginIntent': return beginIntent(req);
    case 'RollIntent': return rollIntent(req);
    case 'AMAZON.FallbackIntent': return fallbackIntent(req);
  }
}

function fallbackIntent(req) {
  console.log("Fallback");
  debugger
  console.log(" ");
}

function wrongIntentResponse(err) {
  console.log("wrongIntentResponse", err);
  return {
    "version": "1.0",
    "sessionAttributes": {
      "state": ''
    },
    "response": {
      "shouldEndSession": true,
      "outputSpeech": {
        "type": "PlainText",
        "text": `Sorry, you can't do that yet (${err})`
      },
    }
  };
}

function beginIntent(req) {
  if (req.body.session.attributes.state != 'starting') {
    return wrongIntentResponse("Haven't launched yet");
  }

  const name = req.body.request.intent.slots.name.value
  return {
    "version": "1.0",
    "sessionAttributes": {
      "state": 'rolling'
    },
    "response": {
      "shouldEndSession": false,
      "outputSpeech": {
        "type": "PlainText",
        "text": `Hi ${name}.  Say 'roll' to start rollin'.`
      },
    }
  };
}
QUIPS = {
  1: "Stand further away, I don't want your bad luck to get on me",
  2: "An ok roll.  I guess",
  3: "An impressively average roll",
  4: "A nice, round, power of two",
  5: "Couldn't have rolled just a *little* higher?  I'm disappointed",
  6: "Don't let it go to your head"
}
MAX_ROLLS = 2;
function rollIntent(req) {
  if (req.body.session.attributes.state != 'rolling') {
    return wrongIntentResponse("Can't roll before starting.");
  }
  let rolls = req.body.session.attributes.rolls
  if (rolls == null) { rolls = [] }
  const newRoll = Math.floor(Math.random() * Math.floor(6)) + 1;
  rolls.push(newRoll);
  const remaining = MAX_ROLLS - rolls.length;

  const rollText = `You rolled a ${newRoll}.  ${QUIPS[newRoll]}.  ${remaining} rolls to go.`;

  if (remaining > 0) {
    return {
      "version": "1.0",
      "sessionAttributes": {
        "rolls": rolls,
        "state": 'rolling'
      },
      "response": {
        "shouldEndSession": false,
        "outputSpeech": {
          "type": "PlainText",
          "text": rollText
        },
      }
    };
  } else {
    const score = rolls.reduce((sum, i) => sum + i);
    return {
      "version": "1.0",
      "sessionAttributes": {
        "rolls": rolls,
        "state": 'doneRolling'
      },
      "response": {
        "shouldEndSession": false,
        "outputSpeech": {
          "type": "PlainText",
          "text": rollText + ` Your total score is ${score}.`
        },
      }
    };
  }
}

app.post('/', (req, res) => {
  // TODO: verify that this request actually came from alexa

  //console.log("body", req.body);
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

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
