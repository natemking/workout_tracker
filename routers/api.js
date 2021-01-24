//*** Dependencies ***//
//====================//
const express = require('express');

//*** Express Router ***//
//======================//
const router = express.Router();

//*** Models connection ***//
//=========================//
const db = require('../models');

//*** API Routes ***//
//==================//
router.route('/workouts/:id?') 
    .get((req, res) => {
    res.json({ 'test': 'passed'});
    })



module.exports = router;