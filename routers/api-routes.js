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

//*** API Routes ***//
//==================//
router.route('/workouts/:id?') 
    .get( async (req, res) => {
        try {
            //Find all workouts and populate the relational exercises
            const data = await db.Workout.find({}).populate('exercises');

            // const sum = await db.Exercise.aggregate([
            //     {
            //         $group: {
            //             _id: '$test',
            //             totalDuration: {
            //                 $sum: '$duration'
            //             }
            //         }
            //     }
            // ])

            // const sum = db.Workout.aggregate([
            //     {
            //         $lookup: {
            //             from: 'Exercise',
            //             localField: '_id',
            //             foreignField:'duration',
            //             as: 'totalDuration'
            //         }
            //     }
            //])
            let lastWo = data[data.length - 1].exercises
            let test = data.map((day) => {
                return day.exercises
            })
            let totalDur = test.map((day) => {
                return (day[day.length - 1].name);
                
            })


    
            // let totalDur = lastWo.map((ex) => {
            //     return ex.duration
            // }).reduce((acc, cur) => {
            //     return acc + cur
            // })


            
            // console.log(totalDur);
            // Respond w/ JSON of the results
            res.json(data);
        } catch (err) { err => console.error(err) }
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
            //Push the new exercise doc to the corresponding workout doc
            const data = await db.Workout.findByIdAndUpdate(req.params.id, 
                { $push: { exercises: newEx._id }}, { new: true });
                
            // await db.Exercise.findByIdAndUpdate(newEx._id,
            //     { parentId: req.params.id });
                //Respond w/ JSON of results
            res.json(data);    
        } catch (err) { err => console.error(err) }
    });

module.exports = router;