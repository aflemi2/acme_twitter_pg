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
  CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    name foo
  )
`;

const sync = (cb)=> {
  client.query(SQL_SYNC, cb);
};

module.exports = {
  sync
};
