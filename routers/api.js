//*** Dependencies ***//
//====================//
const express = require('express');
const path = require('path');

//*** Express Router ***//
//======================//
const router = express.Router()

//*** Model connection ***//
//========================//
const mongoose = require('../models/dbconn');
const db = require(path.join(__dirname, '../models'));

//*** API Routes ***//
//==================//
router.route('/workouts/:id?') 
    .get((req, res) => {
    res.json({ 'test': 'passed'});
    })



module.exports = router;