const Intent = require('./intent')

class BeginIntent extends Intent {
  getResponse() {
    const state = this.request.session.attributes.state;

    // Because we used a required 'slot', this doesn't work.  Need to rework the
    // name setup.
    //if (state != 'starting' && state != 'done') {
      //return this.wrongIntentResponse("We're already started!");
    //}

    const name = this.request.request.intent.slots.name.value
    this.attributes.state = 'rolling'
    this.attributes.rolls = []
    return this.response(`Hi ${name}.  Say 'roll' to start rollin'.`)
  }
}
module.exports = BeginIntent
