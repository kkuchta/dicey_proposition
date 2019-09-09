const BaseState = require('./base')

const QUIPS = {
  1: "Stand further away, I don't want your bad luck to get on me",
  2: "An ok roll.  I guess",
  3: "An impressively average roll",
  4: "A nice, round, power of two",
  5: "Couldn't have rolled just a *little* higher?  I'm disappointed",
  6: "Don't let it go to your head"
}
const MAX_ROLLS = 2;

class Rolling extends BaseState{
  getResponse() {
    if (this.intent == 'RollIntent') {

      let rolls = this.attributes.rolls
      if (rolls == null) { rolls = [] }

      const newRoll = Math.floor(Math.random() * Math.floor(6)) + 1;
      rolls.push(newRoll);

      this.attributes.rolls = rolls;

      const remaining = MAX_ROLLS - rolls.length;
      const rollText = `You rolled a ${newRoll}.  ${QUIPS[newRoll]}.`

      // TODO: split into 2 states, maybe.
      if (remaining > 0) {
        this.attributes.state = 'rolling';
        return this.response(rollText + ` ${remaining} rolls to go.`);

      } else {
        this.attributes.state = 'starting';
        const score = rolls.reduce((sum, i) => sum + i);

        let finalText = rollText + ` Your total score is ${score}.`
        if (this.attributes.bestScore > score) {
          finalText += `You didn't beat your best score of ${this.attributes.bestScore}.`
        } else {
          finalText += ` This is your best score yet.`
          this.attributes.bestScore = score;
        }

        finalText += " Say 'restart' to start over, or 'end' to finish."
        return this.response(finalText);
      }

    } else if (this.intent == 'DoneIntent') {
      return this.finishUp();
    } else {
      return this.response("I'm sorry, I don't know that one.  Try saying 'roll'.")
    }
  }
}

module.exports = Rolling
