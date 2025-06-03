const express = require('express');
const router = express.Router();

router.get('/', (req, res) =>{
    res.render('tree');
});

router.post('/', (req, res) =>{
    res.render('tree')
});
module.exports = router;