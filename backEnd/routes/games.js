var express = require('express');
var router = express.Router();
const db = require('../database');

// games is already implied, 
// because this middleware is only applied at /games
router.get('/getHome', (req,res)=>{
    const selectQuery = `SELECT * FROM games 
    WHERE screenshot_url IS NOT null ORDER BY popularity desc limit 4;`
    db.query(selectQuery).then((results)=>{
        res.json(results);
    }).catch((error)=>{
        if(error){throw error};
    })
    // res.json("Games");
})


router.get('/:gameId', (req,res)=>{
    const gameId = req.params.gameId
    selectQuery = `SELECT * FROM games WHERE id = $1;`;
    db.query(selectQuery,[gameId]).then((results)=>{
        res.json(results)
    }).catch((error)=>{
        if(error){throw error}
    })
})

module.exports = router;