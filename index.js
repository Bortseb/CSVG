const express = require('express')
const path = require('path')
const fs = require('fs')
const app = express()

// creates the path to the svg card
const cardPath = path.join(__dirname, 'card.svg')

// read in the svg file and convert the default Buffer type to a string type
const card = fs.readFileSync(cardPath).toString()

// set up a HTTP GET request at the '/draw-card' path
app.get('/draw-card', function(request, response) {
  // pull the arguments out from the query string (?name=Hello&type=Bye) using destructuring
  const { name, type } = request.query
  // use "chaining" to sequentially replace
  // all the 'source' variables, with the 'target' values
  const modifiedCard = card
    // the 'g' specifies "global", meaning "replace all occurences"
    .replace(new RegExp('Trading Card Game Monster', 'g'), name)
    .replace(new RegExp('Monster Type', 'g'), type)

  // set up the "header" to specify the content type to the client
  response.setHeader('Content-Type', 'image/svg+xml')

  // send the modified string back as the
  response.send(modifiedCard)
})

// listen on the 3000 networking port, meaning go to localhost:3000 to interact
app.listen(3000)
