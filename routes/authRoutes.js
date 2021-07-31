const express = require('express')

const router = express.Router()

router.post('/signup',(req,res)=>{
    console.log(req.body.email)
    res.send('Post request received')
});

module.exports = router