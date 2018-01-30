//18 lines of code
const app = require('express').Router();
module.exports = app;

const db = require('../db')


app.get('/', (req,res,next)=>{
  db.getTweets((err,tweets)=>{
    if(err) return next(err);
    res.render('tweets', { title: 'Tweets', tweets:tweets });
  });
});

app.get('/:id', (req, res, next)=>{
  const person = db.getTweets(req.params.id);
  res.render('person', { title: `${person.name}'s tweet page`, person });
});
