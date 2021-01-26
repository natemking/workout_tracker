//*** Dependencies ***//
//====================//
const express = require('express');

//*** Express Router ***//
//======================//
const router = express.Router();

//*** Models connection ***//
//=========================//
const db = require('../models');

//***  Global Variables ***//
//=========================//
//Create an exercise doc w/ the Exercise model
const createEx = async (req) => {
    return await db.Exercise.create({
        type: req.body.type,
        name: req.body.name,
        duration: req.body.duration,
        weight: req.body.weight,
        reps: req.body.reps,
        sets: req.body.sets,
        distance: req.body.distance
    });
}

//*** API Routes ***//
//==================//
router.route('/workouts/:id?') 
    .get( async (req, res) => {
        try {
            const data = await db.Workout.find({});
            res.json(data);
        } catch (err) { err => console.error(err) }
    }).put( async (req, res) => {
        try {
            //Create a new exercise doc with user input
            const newEx = await createEx(req);
            //Push the new exercise doc to the corresponding workout doc
            const data = await db.Workout.findByIdAndUpdate(req.params.id, 
                {$push: {exercises: newEx}});

            res.json(data);    
        } catch (err) { err => console.error(err) }
    })



module.exports = router;