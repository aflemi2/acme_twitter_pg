//40 lines of code

//database
// sync - function which creates tables
// seed - function which seeds data
// getTweets - function which queries for all tweets
// getTweet - function which queries for one tweet
const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL);


client.connect()

const SQL_SYNC = `
  DROP TABLE IF EXISTS users;
  CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    name varchar(255),
    tweet text NOT NULL DEFAULT 'tweet tweet tweet.'::text
  )
`;

const SQL_SEED = `
  INSERT INTO users(name, tweet) values ('foo', 'foo tweeting!');
  INSERT INTO users(name, tweet) values ('baz', 'bar tweeting!');
  INSERT INTO users(name, tweet) values ('bar', 'baz tweeting!');
`;

const sync = (cb)=> {
  client.query(SQL_SYNC, cb);
};

const seed = (cb)=> {
  client.query(SQL_SEED, cb);
};

const getTweets = (cb)=> {
  client.query('SELECT * from users', (err, result)=>{
    if (err) return cb(err);
    cb(null, result.rows);
  });
};

const getTweet = (id, cb)=> {
  client.query('SELECT * from users WHERE id = $1', [id], (err, result)=>{
    if (err) return cb(err);
    cb(null, result.rows.length ? result.rows[0] : null);
  });
};

module.exports = {
  sync,
  seed,
  getTweets,
  getTweet
};
