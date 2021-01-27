let mongoose = require("mongoose");
let db = require("../models");
require('dotenv').config();

let workoutSeed = [
  {
    day: new Date(new Date().setDate(new Date().getDate() - 10)),
    exercises: [
      {
        type: "resistance",
        name: "Bicep Curl",
        duration: 20,
        weight: 100,
        reps: 10,
        sets: 4
      }
    ]
  },
  {
    day: new Date(new Date().setDate(new Date().getDate() - 9)),
    exercises: [
      {
        type: "resistance",
        name: "Lateral Pull",
        duration: 20,
        weight: 300,
        reps: 10,
        sets: 4
      }
    ]
  },
  {
    day: new Date(new Date().setDate(new Date().getDate() - 8)),
    exercises: [
      {
        type: "resistance",
        name: "Push Press",
        duration: 25,
        weight: 185,
        reps: 8,
        sets: 4
      }
    ]
  },
  {
    day: new Date(new Date().setDate(new Date().getDate() - 7)),
    exercises: [
      {
        type: "cardio",
        name: "Running",
        duration: 25,
        distance: 4
      }
    ]
  },
  {
    day: new Date(new Date().setDate(new Date().getDate() - 6)),
    exercises: [
      {
        type: "resistance",
        name: "Bench Press",
        duration: 20,
        weight: 285,
        reps: 10,
        sets: 4
      }
    ]
  },
  {
    day: new Date(new Date().setDate(new Date().getDate() - 5)),
    exercises: [
      {
        type: "resistance",
        name: "Bench Press",
        duration: 20,
        weight: 300,
        reps: 10,
        sets: 4
      }
    ]
  },
  {
    day: new Date(new Date().setDate(new Date().getDate() - 4)),
    exercises: [
      {
        type: "resistance",
        name: "Quad Press",
        duration: 30,
        weight: 300,
        reps: 10,
        sets: 4
      }
    ]
  },
  {
    day: new Date(new Date().setDate(new Date().getDate() - 3)),
    exercises: [
      {
        type: "resistance",
        name: "Bench Press",
        duration: 20,
        weight: 300,
        reps: 10,
        sets: 4
      }
    ]
  },
  {
    day: new Date(new Date().setDate(new Date().getDate() - 2)),
    exercises: [
      {
        type: "resistance",
        name: "Military Press",
        duration: 20,
        weight: 300,
        reps: 10,
        sets: 4
      }
    ]
  }
];

//Create new seed array that is just the data for the Workout model
const woSeed = workoutSeed.map(obj => ({ day: obj.day, exercises: []}));
//Create new seed array that is just the data for the Exercise model
const exSeed = workoutSeed.map(obj => obj.exercises ).flat();

//Seed function
const seed = async () => {
  try {
    //Delete exercise collection if exits and insert the Exercise seed data
    await db.Exercise.deleteMany({});
    await db.Exercise.collection.insertMany(exSeed);
    //Delete workout collection if exits and insert the Workout seed data
    await db.Workout.deleteMany({});
    await db.Workout.collection.insertMany(woSeed);

    //Find the newly created exercise data 
    const ex = await db.Exercise.find({});
    //Find the newly created workout data w/o the _id
    const wo = await db.Workout.find({}).select('exercises day -_id');

    //Loop and push the corresponding exercise obj _id to its respective workout exercise field
    for (let i = 0; i < ex.length; i++) {
      wo[i].exercises.push(ex[i]._id);
    }
    //Delete workout collection if exits and insert the new Workout seed data with the Exercise obj _id's
    await db.Workout.deleteMany({})
    data = await db.Workout.collection.insertMany(wo);
    //Log how many records seeded
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  } catch (err) { 
    console.error(err);
    process.exit(1);
  }
}
//Run seeder function
seed();
