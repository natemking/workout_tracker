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
        } catch (err) { err => console.error(err) }
    }).put( async (req, res) => {
        try {
            //Create a new exercise document
           const newEx = await db.Exercise.create({
                type: req.body.type,
                name: req.body.name,
                duration: req.body.duration,
                weight: req.body.weight,
                reps: req.body.reps,
                sets: req.body.sets,
                distance: req.body.distance
            });
            //Push the new exercise doc to the corresponding workout doc
            const data = await db.Workout.findByIdAndUpdate(req.params.id, 
                {$push: {exercises: newEx}});

            res.json(data);    
        } catch (err) { err => console.error(err) }
    })



module.exports = router;