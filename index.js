var express = require('express');
var app = express();

app.set('view engine', 'ejs');

// index page 
app.get('/', function(req, res) {
    res.render('pages/index');
});

app.listen(4000);
console.log('4000 is the magic port');