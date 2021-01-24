//*** Dependencies ***//
//====================//
const express = require('express');
const mongoose = require('../models/db');
// const db = require('../models');


//*** Express Router ***//
//======================//
const router = express.Router()

//*** API Routes ***//
//==================//
router.get('/exercises', (req, res) => {
    res.json({ 'test': 'passed'});
});

router.get('/test', (req, res) => {
    res.json({ 'test': 'stats' });
});


module.exports = router;