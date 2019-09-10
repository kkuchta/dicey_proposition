const BaseState = require('./base')

// Waiting for the user to say 'Start' - either just after the launch message or
// just after a previous game (to restart).
class Starting extends BaseState {
  getResponse() {
    if (this.intent == 'BeginIntent') {
      // We're using a required slot with auto delegation to make alexa ask for
      // the user's name for us.  This actually turned out to be a bad move - I 
      // should just get the user's name manually (with a 'requestingName' step).
      // Unfortunately I'd have to tear apart the alexa console config a bit and
      // I'm not convinced I have time left to put it back together.
      //
      // So, sticking with auto delegation, which means we should always have a
      // name populated when BeginIntent happens.
      const name = this.request.request.intent.slots.name.value

      this.attributes.state = 'rolling'
      this.attributes.rolls = []
      return this.response(`Hi ${name}.  Say 'roll' to start rollin'.`)
    } else if (this.intent == 'DoneIntent') {
      // You can check out any time you like
      return this.finishUp()
    } else {
      return this.response("I'm sorry, I don't know that one.  Try saying 'start'.")
    }
  }
}
module.exports = Starting
