class State {
  constructor(request) {
    this.request = request
    this.attributes = request.session.attributes;
    if (this.attributes == null) {
      this.attributes = {}
    }
    if (request.request.intent != null) {
      this.intent = request.request.intent.name;
    }
  }

  finishUp() {
    let text = 'Thanks for playing Dicey Proposition!'
    const bestScore = this.attributes.bestScore;
    if (bestScore != null) {
      text += ` Your high score this session was ${bestScore}.`;
    }
    return this.response(text, true)
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
module.exports = State
