const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');

const upload = multer({ dest: 'Data/uploads/' });

router.get('/', (req, res) =>{
    res.render('tree');
});

router.post('/', upload.single('datafile'), (req, res) =>{
    const filetype = req.body.phylotype;
    const pastedText = req.body.newickText?.trim();
    const fileUploaded = req.file;
    if (pastedText) {
        if (!pastedText.startsWith('(') || !pastedText.endsWith(';')) {
        return res.status(400).send('Invalid Newick string.');
        }
    if (filetype !== 'Newick') {
        return res.status(400).send('Pasted input only supported for Newick format.');
    }
        return res.render('tree', { newickData: pastedText });
  }
    if (fileUploaded) {
    // const datafile = path.basename(req.body.datafile)
        fs.readFile(req.file.path, 'utf8', (err, content) => {
            if (err) return res.status(500).send('File read error');
            if (filetype === 'Newick') {
            // Send the Newick content to the tree viewer
                res.render('tree', {newickData: content});
        } 
             else {
            res.send('Only Newick format is supported for drawing right now.');
        }
        })
      }
    });
module.exports = router;