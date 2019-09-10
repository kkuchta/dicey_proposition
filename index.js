const express = require('express')
const app = express()
const port = 3000

const STATE_CLASSES = {
  launching: require('./states/launching'),
  starting: require('./states/starting'),
  rolling: require('./states/rolling'),
}

app.use(express.json())

app.post('/', (req, res) => {
  // TODO: verify that this request actually came from alexa

  const requestType = req.body.request.type
  let response = {}
  let stateString = null
  switch (requestType) {
    case 'LaunchRequest': stateString = 'launching'; break
    case 'IntentRequest': stateString = req.body.session.attributes.state; break
    case 'SessionEndedRequest': response = {}; break
    default: console.log('Unhandled request type: ', requestType); break
  }
  if (stateString != null) {
    console.log("State=", stateString)
    const state = new STATE_CLASSES[stateString](req.body)
    response = state.getResponse()
  }
  res.send(response)
})

app.listen(port, () => console.log(`Dicey Proposition game up on ${port}!`))
