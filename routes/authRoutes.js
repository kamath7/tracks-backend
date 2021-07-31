const express = require('express')

const router = express.Router()

router.post('/signup',(req,res)=>{
    res.send('Post request received')
});

module.exports = router