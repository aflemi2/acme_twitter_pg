//30 lines of code
//sync and seed data and start server
//set up static routes
// define '/' route and require tweets router
const db = require('./db');
const express = require('express');
const app = express();
const nunjucks = require('nunjucks');
nunjucks.configure({ noCache: true });
const path = require('path');
const port = 3000 || process.env.PORT;

db.sync((err)=>{
  if(err) return console.log(err);
  db.getTweets((err, users)=> {
    if(err) return console.log(err);
    console.log(`there are ${users.length} users`);
    db.seed ((err)=> {
      if(err) return console.log(err);
      console.log('seed working.');
      db.getTweets((err, users)=> {
        if(err) return console.log(err);
        console.log(`there are ${users.length} users`);
        db.getTweet(2, (err, user)=> {
          if(err) return console.log(err);
          console.log(`user with an id of 2 is ${user.name}`);
        });
      });
    });
  });
});

app.set('view engine', 'html');
app.engine('html', nunjucks.render);

app.use('/vendor', express.static(path.join(__dirname, 'node_modules')
));

app.use((req, res, next)=> {
  res.locals.path = req.url;
  next();
});

app.get ('/', (req, res, next)=> {
 res.render('index', { title: 'Twitter' });
});

app.use('/tweets', require('./routes/tweets'));

app.get ('/tweets/:id', (req, res, next)=> {
  db.getTweet(req.params.id, (err, result)=> {
    if(err) return next (err);
    res.send(result);
  });
});

app.listen(port, ()=>{
  console.log(`listening on port ${port}`)
});

