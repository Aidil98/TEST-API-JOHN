const express = require('express');
const router = express.Router();

// DEKLARASI CONTROLLER
const Controller = require('../controller/Controller');

router.post('/dologin', Controller.dologin);