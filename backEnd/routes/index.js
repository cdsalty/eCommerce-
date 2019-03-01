var express = require('express');
var router = express.Router();
const db = require('../database');
const passport = require('passport');
const bcrypt = require('bcrypt-nodejs');
const randToken = require('rand-token');

/* GET home page. */
router.get('/auth/github', passport.authenticate('github'));

router.get('/auth/github/callback', passport.authenticate('github'), (req, res) => {
  const selectQuery = `SELECT * FROM users WHERE username = $1`;
  const pgPromise = db.query(selectQuery, [req.user.username]);
  pgPromise.then((data) => {
    if (data.length === 0) {
      const insertQuery = `INSERT INTO users(id, username, token) VALUES ($1, $2, $3);`
      const pgPromise = db.query(insertQuery, [req.user.id, req.user.username, req.user.node_id])
      pgPromise.then((data2) => {
        res.json(data2)
      })
    } else {
      res.json(data)
    }
  })
  // console.log(req)
  // res.json(req.user);
})

router.post('/register', (req, res) => {
  // bcrypt
  // check if username exists
  // if not, insert username and password
  // -create token
  // if so, let react know

  const checkUsernameQuery = `SELECT * FROM users WHERE username = $1`;
  db.query(checkUsernameQuery, [req.body.userName]).then((results) => {
    // console.log(req.body.username)
    // console.log(results)
    if (results.length === 0) {
      // user does not exist, lets add them
      const token = randToken.uid(50);
      // use bcrypt.hashSync to make their password awesome
      const hash = bcrypt.hashSync(req.body.password)
      const insertQuery = `INSERT INTO users (username, password, token) VALUES ($1, $2,$3)`;
      db.query(insertQuery, [req.body.userName, hash, token]).then(() => {
        res.json({ 
          msg: 'userAdded',
          token, 
          userName: req.body.userName,
        });
      })
    } else {
      // user exists 
      res.json({ msg: 'userExists' })
    }
  }).catch((error) => {
    if (error) { throw error; }
  })

  // res.json(req.body);
})


router.post('/login', (req, res)=>{
  const userName = req.body.userName
  const password = req.body.password
  const selectQuery = `SELECT * FROM users WHERE username = $1`;
  db.query(selectQuery, [userName]).then((results)=>{
    if(results.length === 0){
      // not in our database
      res.json({
        msg: 'userNotFound'
      })
    }else{
      const checkHash = bcrypt.compareSync(password, results[0].password)
      if(checkHash){
        // correct password, login them in
        // create a new token
        const token = randToken.uid(50);
        // update the db with the new token
        const updateTokenQuery = `UPDATE users SET token = $1
          WHERE username = $2`;
        db.query(updateTokenQuery, [token, userName]).catch((error)=>{
          if(error){throw error};
        });
        res.json({
          msg: 'userLoggedIn',
          token,
          userName
        })
      }else {
        // bogus password
        res.json({
          msg: 'badPassword'
        })
      }
    }
  }).catch((error)=>{
    if(error){throw error}
  })
})


module.exports = router;
