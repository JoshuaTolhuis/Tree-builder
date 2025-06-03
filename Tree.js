const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Set up file upload
const upload = multer({ dest: 'uploads/' });

// Handle the form submission
app.post('/submit', upload.single('datafile'), (req, res) => {
  const format = req.body.phylotype;
  const filePath = req.file.path;

  fs.readFile(filePath, 'utf8', (err, content) => {
    if (err) {
      return res.status(500).send('Error reading uploaded file.');
    }

    // Process the file based on format
    console.log(`Format: ${format}`);
    console.log(`File content:\n${content}`);

    // Here you would convert and render a phylogenetic tree using an API
    // For now, just respond with raw content
    res.send(`
      <h2>Received ${format} file</h2>
      <pre>${content}</pre>
    `);
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});