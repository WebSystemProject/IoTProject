const express = require('express')
const subscripotion = require('./subscription')
const app = express()
const port = 80

app.get('/', (req, res) => {
  res.send('Jai Mahakal !')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})