const mongoConnect = require('./db');
const express = require('express');
var cors = require('cors')
mongoConnect();

const app = express()
app.use(cors())
const port = 9000
// available Routes
app.use(express.json())

app.use('/api/auth',require('./routes/auth'))
app.use('/api/note',require('./routes/note'))


// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})