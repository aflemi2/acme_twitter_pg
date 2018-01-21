const express = require('express');
const nunjucks = require('nunjucks');
const app = express();

const people = [{name: 'Full'}, {name: 'Stacker'}, {name: 'Son'}];


app.use(function (req, res, next) {
  console.log(req.method, req.originalUrl)
  next()
})

var locals = {
    title: 'An Example',
    people: [
        { name: 'Gandalf'},
        { name: 'Frodo' },
        { name: 'Hermione'}
    ]
};
nunjucks.configure('views', {noCache: true});
nunjucks.render('index.html', locals, function (err, output) {
    console.log(output);
});

app.set('view engine', 'html'); // have res.render work with html files
app.engine('html', nunjucks.render); // when giving html files to res.render, tell it to use nunjucks
nunjucks.configure('views'); // point nunjucks to the proper directory for templates


app.get('/', (req, res) => res.render( 'index', {title: 'Hall of Fame', apples: locals['people']} ));

app.listen(3000, ()=> console.log('server listening'))


// Alans change looks good

//changed for git test -zi

