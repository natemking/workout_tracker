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
//Create an exercise doc w/ the Exercise model and the users input
const createEx = async (req, param) => {
    return await db.Exercise.create({
        type: req.body.type,
        name: req.body.name,
        duration: req.body.duration,
        weight: req.body.weight,
        reps: req.body.reps,
        sets: req.body.sets,
        distance: req.body.distance,
        parentId: param
    });
}
//Find all workouts and populate the relational exercises
const findAndPop = db.Workout.find({}).populate('exercises');

//*** API Routes ***//
//==================//
router.route('/workouts/:id?') 
    .get( async (req, res) => {
        //Range route for the charting data to appear with one week of data
        if (req.params.id  === 'range') {
            try {
                //Find all & pop then sort in descending & limit to the last 7 docs
                const data = await findAndPop.sort({day: -1}).limit(7);
                //Respond w/ a JSON of results in reverse order
                res.json(data.reverse())
            } catch (err) { err => console.error(err) }
        } else {
            //All other route params 
            try {
                //Find all & populate
                const data = await findAndPop;
                // Respond w/ JSON of the results
                res.json(data);
            } catch (err) { err => console.error(err) }
        }
    }).post( async (req, res) => {
        try {
            //Create a new workout
            data = await db.Workout.create(req.body);
            //Respond w/ JSON on the results
            res.json(data);
        } catch (err) { err => console.error(err) }
    }).put( async (req, res) => {
        try {
            //Create a new exercise doc with user input
            const newEx = await createEx(req, req.params.id);
            //Get the data for the current workout
            const query = await db.Workout.findById(req.params.id)
             //Push the new exercise doc to the corresponding workout doc and sum the exercise duration w/ the workouts totalDuration
            const data = await db.Workout.findByIdAndUpdate(req.params.id, 
                { $push: { exercises: newEx._id }, $set: {totalDuration: query.totalDuration + newEx.duration}}, { new: true });
            //Respond w/ JSON of the results
            res.json(data);    
        } catch (err) { err => console.error(err) }
    });

module.exports = router;