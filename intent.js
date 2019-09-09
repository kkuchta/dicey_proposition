class Intent {
  constructor(request) {
    this.request = request;
    this.attributes = request.session.attributes;
  }

  wrongIntentResponse(err) {
    console.log("wrongIntentResponse", err);
    return this.response(`Sorry, you can't do that right now. ${err}`);
  }

  response(text, shouldEndSession = false) {
    return {
      "version": "1.0",
      "sessionAttributes": this.attributes,
      "response": {
        "shouldEndSession": shouldEndSession,
        "outputSpeech": {
          "type": "PlainText",
          "text": text
        },
      }
    };
  }
}

module.exports = Intent;
