const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path')

const upload = multer({ dest: 'Data/uploads/' });

router.get('/', (req, res) =>{
    res.render('tree');
});

router.post('/', upload.single('datafile'), (req, res) =>{
    const filetype = req.body.phylotype;
    // const datafile = path.basename(req.body.datafile)
     fs.readFile(req.file.path, 'utf8', (err, content) => {
        if (err) return res.status(500).send('File read error');
        if (filetype === 'Newick') {
        // Send the Newick content to the tree viewer
        res.render('tree', {newickData: content});
        } else {
        res.send('Only Newick format is supported for drawing right now.');
        }
    })
});
module.exports = router;