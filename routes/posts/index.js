const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');

const upload = multer({ dest: 'Data/uploads/' });

router.get('/', (req, res) =>{
    res.render('tree');
});

router.post('/', upload.single('datafile'), (req, res) =>{
    /*
    A router for the /posts route that listens to post request.
    Has extra functionallity because it needs to read out the file that is submitted.
    */
    const filetype = req.body.phylotype;
    const pastedText = req.body.newickText?.trim();
    const fileUploaded = req.file;
    // Another File validation check if the text is inserted in the text file.
    if (pastedText) {
        if (!pastedText.startsWith('(') || !pastedText.endsWith(';')) {
        return res.status(400).send('Invalid Newick string.');
        }
    if (filetype !== 'Newick') {
        return res.status(400).send('Pasted input only supported for Newick format.');
    }
        return res.render('tree', { newickData: pastedText });
    }
    // Reading the uploaded file if a file is submitted.
    if (fileUploaded) {
        fs.readFile(req.file.path, 'utf8', (err, content) => {
            if (err) return res.status(500).send('File read error');
            // If newick is selected returns newick to the tree.pug
            if (filetype === 'Newick') {
                res.render('tree', {newickData: content});
            } 
            // Convert file if fasta or text file type is selected. and returns output to tree.pug
            else {
            const newick = convertFastaOrText(content, filetype);
            if (!newick) return res.status(400).send('Unable to convert file content to Newick.');
            return res.render('tree', { newickData: newick });
        }
        })
      }
    });

function convertFastaOrText(content, filetype) {
    /*
    Input content: The file contents from the submitted file.
    Input filetype: The file type submitted by the user with the select (options) button.
    Function for converting .fasta and .txt files to Newick (Very basic).
    */
    let labels = [];
    
    // Conversion for fasta filetype
    if (filetype === 'Fasta') {
        const lines = content.split('\n');
        for (const line of lines) {
        if (line.startsWith('>')) {
            labels.push(line.slice(1).trim());
        }
        }
    } else if (filetype === 'Text') {
        labels = content.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    }
    // Conversion for text filetype
    if (labels.length === 0) return null;

    return `(${labels.join(',')});`;
}
module.exports = router;