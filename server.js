//30 lines of code
//sync and seed data and start server
//set up static routes
// define '/' route and require tweets router
const db = require('./db');
const express = require('express');
const app = express();
const nunjucks = require('nunjucks');
nunjucks.configure({ noCache: true });
const port = 3000 || process.env.PORT;

db.sync((err)=>{
  if(err) return console.log(err);
  console.log('table created.');
});

app.set('view engine', 'html');
app.engine('html', nunjucks.render);

 app.get ('/', (req, res, next)=> {
 res.render('index', { title: 'Twitter' });
});

  app.get ('/tweets', (req, res, next)=> {
 res.render('tweets', { title: 'Tweet Bank' });
});

app.listen(port, ()=>{
  console.log(`listening on port ${port}`)
});

