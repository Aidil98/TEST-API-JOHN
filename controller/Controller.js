const express = require('express');
const router = express.Router();
const Request = require("request");

exports.dologin = function(req, res) {
	global.nrp = req.body.nrp;
	global.password = req.body.pass;
	global.gate = req.body.gate;
	var link = "https://pbkk.azurewebsites.net/"
	request.post({
		url: 'https://pbkk.azurewebsites.net/',
		form: {username: global.nrp, pass: global.password, gate: global.gate},
		function(error, response, body) {
			result = JSON.parse(body);
			console.log(result)
			console.dir(result["message"]);
			if(result["message"] === "wrong user/pass") {
				return res.redirect('/');
			}
			else {
				req.session.nrp = req.body.nrp;
				return res.redirect('/')
			}
		}
	})
}