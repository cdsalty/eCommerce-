var express = require('express');
var router = express.Router();
const db = require('../database');

// /cart/getCart
router.post('/getCart',(req, res)=>{
    // res.json("test");
    const token = req.body.token;
    const getUserQuery = `SELECT id FROM users WHERE token = $1`
    db.query(getUserQuery, [token]).then((results)=>{
        if(results.length === 0){
            // this is a bad token, the user is confused or a liar
            res.json({
                msg: 'badToken'
            })
        }else{
            const uid = results[0].id
            const getCartTotals = `SELECT * FROM cart INNER JOIN games on games.id = cart.gid WHERE uid = $1`
        db.query(getCartTotals, [uid]).then((results)=> {
            const totals = `SELECT SUM(price) as totalPrice, count(price) as totalItems 
            FROM cart INNER JOIN games on games.id = cart.gid WHERE uid = $1`;
            db.query(totals, [uid]).then((totalNumbers)=>{
                const responseData = {
                    contents: results,
                    total: totalNumbers[0].totalprice,
                    items: totalNumbers[0].totalItems
                }
                res.json(responseData)
            })
        })
            

        }
    }).catch((error)=>{
        if(error){throw error}
    })
})


router.post('/updateCart', (req,res)=>{
    console.log(req.body)
    const token = req.body.token;
    const itemId = req.body.itemId;
    const getUserQuery = `SELECT id FROM users WHERE token = $1`
    db.query(getUserQuery, [token]).then((results)=>{
        if(results.length === 0){
            // this is a bad token, the user is confused or a liar
            res.json({
                msg: 'badToken'
            })
        }else{
            const uid = results[0].id
            
           
            const addToCartQuery = `INSERT INTO cart (uid,gid,date)
                VALUES ($1, $2, NOW())`
            db.query(addToCartQuery,[uid, itemId]).then(()=>{
                console.log("firstPromiseReturned")
                const getCartTotals = `Select * FROM cart WHERE uid = $1`;
                db.query(getCartTotals, [uid]).then((results)=>{
                    console.log(results)
                    res.json(results)
                }).catch((error)=>{
                    if(error){throw error};
                })
            }).catch((error)=>{
                if(error){throw error};
            })

        }
    }).catch((error)=>{
        if(error){throw error}
    })
})

module.exports = router;