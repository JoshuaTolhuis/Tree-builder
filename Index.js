const express = require('express');
const app = express();
const PORT = 3000;

const users = require('./routes/users');
const posts = require('./routes/posts');

app.use('/users', users);
app.use('/posts', posts);

app.get('/', (req,res) => {
    res.send("<h1> Welcome to the homepage! </h1>");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});