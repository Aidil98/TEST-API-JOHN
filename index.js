var express = require('express');
var app = express();
var request = require("request")
app.set('view engine', 'ejs');

// index page 
app.get('/', function(req, res) {
    res.render('pages/index');
});

app.get('/login', function(req, res) {
    res.render('pages/login');
});
app.get('/register', function(req, res) {
    res.render('pages/register');
});

app.get('/gate', function(req, res) {
    res.render('pages/gate');
});

app.get('/users', function(req, res) {
	var url = "https://pbkk.azurewebsites.net/users"
	var posts = []
	request({
	    url: url,
	    json: true
	}, function (error, response, body) {

	    if (!error && response.statusCode === 200) {
	    	//console.log(body.users)
	        /*
	        body.users.forEach((item) => {
	        	Object.entries(item).forEach(([key, val]) => {
	        		console.log(`key-${key}-val-${JSON.stringify(val)}`);
	        	});
	        });*/
	        posts = body.users;
	        console.log(posts);
	        res.render('pages/users', {posts: posts})
	        //console.log(body) // Print the json response
	    }
	})
});

app.listen(4000);
console.log('4000 is the magic port');