const Intent = require('./intent')

class DoneIntent extends Intent {
  getResponse() {
    return this.response('Thanks for playing Dicey Proposition!', true)
  }
}
module.exports = DoneIntent
