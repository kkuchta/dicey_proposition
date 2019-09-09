const BaseState = require('./base')

class Launching extends BaseState {
  getResponse() {
    this.attributes.state = 'starting';
    return this.response("Welcome to Dicy Proposition!  Say 'start' to start.");
  }
}
module.exports = Launching
