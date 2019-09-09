const Intent = require('./intent')

class DoneIntent extends Intent {
  getResponse() {
    let text = 'Thanks for playing Dicey Proposition!'
    const bestScore = this.attributes.bestScore;
    if (bestScore != null) {
      text += ` Your high score this session was ${bestScore}.`;
    }
    return this.response(text, true)
  }
}
module.exports = DoneIntent
