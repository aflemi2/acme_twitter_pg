const express = require('express');
const app = express();


app.use(function (req, res, next) {
  console.log(req.method, req.originalUrl)
  next()
})

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(3000, ()=> console.log('server listening'))

//changed for git test -zi