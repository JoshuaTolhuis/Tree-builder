const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;

const posts = require('./routes/posts');

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use(express.static('./public'));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use('/posts', posts);

app.get('/', (req,res) => {
    res.render('home');
}); 

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});