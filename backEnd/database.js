const config = require('./config');
const pgp = require('pg-promise')();
const db = pgp(config.pg);


module.exports = {
    query: (queryText, params)=>{
        return db.query(queryText, params);
    }
}