var express = require('express');
var app = express();
var request = require("request")
const methodOverride = require('method-override');
var session = require('express-session');
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
app.use(session({
	secret: 'hehe',
	saveUninitialized: true,
	resave: true
}));
// index page 
app.get('/', function(req, res) {
    res.render('index');
});

app.get('/login', function(req, res) {
    res.render('login');
});

app.get('/register', function(req, res) {
    res.render('register');
});

app.get('/gate', function(req, res) {
    res.render('gate');
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
	        res.render('users', {posts: posts})
	        //console.log(body) // Print the json response
	    }
	})
});

app.get('/users/:userid/del', function(req, res) {
	var url = "https://pbkk.azurewebsites.net/users/"
	var name = req.params.userid
	var comp = url.concat(name)
	console.log(comp)
	request.delete(comp, (error, response, body) => {
		if (error) {
			return console.dir(error);
		}
		console.log("Berhasil menghapus user");
		res.redirect('/');
	})
});

app.get('/users/:userid', function(req, res) {
	var url = "https://pbkk.azurewebsites.net/users/"
	var name = req.params.userid
	var comp = url.concat(name)
	console.log(comp)
	request.get({
		url: comp,
		json: true
	},function(error, response, body) {
		
		if (!error && response.statusCode === 200) {
			posts = body.user;
	        console.log(posts);
	        res.render('profile', {posts: posts})
		}
	})
});
app.get('/allgate', function(req, res) {
	var url = "https://pbkk.azurewebsites.net/gates"
	var posts = []
	request({
	    url: url,
	    json: true
	}, function (error, response, body) {

	    if (!error && response.statusCode === 200) {
	    	//console.log(body.gates)
	        /*
	        body.gates.forEach((item) => {
	        	Object.entries(item).forEach(([key, val]) => {
	        		console.log(`key-${key}-val-${JSON.stringify(val)}`);
	        	});
	        });*/
	        posts = body.gates;
	        console.log(posts);
	        res.render('allgate', {posts: posts})
	        //console.log(body) // Print the json response
	    }
	})
});

app.get('/allgate/:gateid/del', function(req, res) {
	var url = "https://pbkk.azurewebsites.net/gates/"
	var name = req.params.gateid
	var comp = url.concat(name)
	console.log(comp)
	request.delete(comp, (error, response, body) => {
		if (error) {
			return console.dir(error);
		}
		console.log("Berhasil menghapus Gate");
		res.redirect('/');
	})
});
app.listen(4000);
console.log('4000 is the magic port');

app.get('/allgate/:gateid', function(req, res) {
	var url = "https://pbkk.azurewebsites.net/gates/"
	var name = req.params.gateid
	var comp = url.concat(name)
	console.log(comp)
	request.get({
		url: comp,
		json: true
	},function(error, response, body) {
		
		if (!error && response.statusCode === 200) {
			posts = body.gate;
	        console.log(posts);
	        res.render('profilegate', {posts: posts})
		}
	})
});