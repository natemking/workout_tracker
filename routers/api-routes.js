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
            //Find all workouts
            const data = await db.Workout.find({}).populate('exercises');
            //Respond w/ JSON of the results
            res.json(data);
        } catch (err) { err => console.error(err) }
    }).post( async (req, res) => {
        try {
            
            data = await db.Workout.create({ exercises: []});
            
            res.json(data);
        } catch (err) { err => console.error(err) }
    }).put( async (req, res) => {
        try {
            //Create a new exercise doc with user input
            const newEx = await createEx(req);
            //Push the new exercise doc to the corresponding workout doc
            const data = await db.Workout.findByIdAndUpdate(req.params.id, 
                { $push: { exercises: newEx._id }}, { new: true });
                //Respond w/ JSON of results
            res.json(data);    
        } catch (err) { err => console.error(err) }
    })



module.exports = router;