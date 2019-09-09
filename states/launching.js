const BaseState = require('./base')

// State where the app is just launching after a user invoked us.  Should
// tranistion to starting.
class Launching extends BaseState {
  getResponse() {
    this.attributes.state = 'starting'
    return this.response("Welcome to Dicy Proposition!  Say 'start' to start.")
  }
}
module.exports = Launching
