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
        fs.readFile(req.file.path, 'utf8', (err, content) => {
            if (err) return res.status(500).send('File read error');
            if (filetype === 'Newick') {
                res.render('tree', {newickData: content});
            } 
            else {
            const newick = convertToNewickFromFastaOrText(content, filetype);
            if (!newick) return res.status(400).send('Unable to convert file content to Newick.');
            return res.render('tree', { newickData: newick });
        }
        })
      }
    });

function convertToNewickFromFastaOrText(content, filetype) {
  let labels = [];

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

  if (labels.length === 0) return null;

  return `(${labels.join(',')});`;
}
module.exports = router;