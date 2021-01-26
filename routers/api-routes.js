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
    .get( async (req, res) => {
        try {
            const data = await db.Workout.find({});
            res.json(data);
            console.log(data);
        } catch (err) { err => console.error(err) }
    }).post ( async (req, res) => {
        try {
            console.log(req.body);
        } catch (err) { err => console.error(err) }
    })



module.exports = router;