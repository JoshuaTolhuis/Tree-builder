const express = require('express');
const router = express.Router();

router.get('/', (req, res) =>{
    res.send("<h1>This is all the users!</h1>")
});

router.get('/:username', (req, res) => {
    res.render('profile', { username: req.params.username });
});

module.exports = router;