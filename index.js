var express = require('express');
var app = express();
var request = require("request")
var bodyParser = require('body-parser');
const methodOverride = require('method-override');
var session = require('express-session');
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
app.use(session({
	secret: 'hehe',
	saveUninitialized: true,
	resave: true
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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

app.get('/berhasillogin', function (req, res, next) {
	res.render('berhasillogin');
})

app.post('/dologin', function(req, res, next){
  	var url = "https://pbkk.azurewebsites.net/login"
	console.log(url);  
  	console.log("cabeeee");  
	request({
		url: url,
		form: {username:req.body.nrp, pass:req.body.pass, gate:req.body.gate},
		method: 'POST',
		json: true
	}, function(error, response, body) {
		//result = JSON.parse(body);
		//console.dir(result["message"]);
		console.log(response.statusCode)
		if (!error && response.statusCode === 200) {
			console.log("login user berhasil")
			res.redirect('/users');
		}else{
			res.redirect('/users')		}
	})
});

app.post('/doregister', function(req, res, next){
  	var url = "https://pbkk.azurewebsites.net/users"
	console.log(url);  
  	console.log("cabeeee");  
	request({
		url: url,
		form: {nrp:req.body.nrp, password:req.body.password},
		method: 'POST',
		json: true
	}, function(error, response, body) {
		if (!error && response.statusCode === 200) {
			console.log("pembuatan akun berhasil")
			res.redirect('/users');
		}else{
			res.redirect("/users");
		}
	})
});

app.post('/docreategate', function(req, res, next){
  	var url = "https://pbkk.azurewebsites.net/gates"
	console.log(url);  
  	console.log("cabeeee");  
	request({
		url: url,
		form: {jam_buka:req.body.jam_buka, jam_tutup:req.body.jam_tutup},
		method: 'POST',
		json: true
	}, function(error, response, body) {
		if (!error && response.statusCode === 200) {
			console.log("pembuatan gate berhasil")
			res.redirect('/allgate');
		}else{
			res.redirect("/allgate");
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
		res.redirect('/berhasilhapus');
	})
});

app.get('/berhasilhapus', function(req, res) {
    res.render('berhasilhapus');
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
		res.redirect('/hapusgate');
	})
});
app.get('/hapusgate', function(req, res) {
    res.render('hapusgate');
});

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


app.listen(4000);
console.log('4000 is the magic port');
