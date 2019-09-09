const BaseState = require('./base')

class Launching extends BaseState {
  getResponse() {
    if (this.intent == 'BeginIntent') {
      const name = this.request.request.intent.slots.name.value
      this.attributes.state = 'rolling'
      this.attributes.rolls = []
      return this.response(`Hi ${name}.  Say 'roll' to start rollin'.`)
    } else if (this.intent == 'DoneIntent') {
      return this.finishUp();
    } else {
      return this.response("I'm sorry, I don't know that one.  Try saying 'start'.")
    }
  }
}
module.exports = Launching
