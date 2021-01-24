// const workoutSchema = new mongoose.Schema({
//     day: Date,
//     exercises: [
//         {
//             type: String,
//             name: String,
//             duration: Number,
//             weight: Number,
//             reps: Number,
//             sets: Number
//         } 
//     ]
// });

// module.exports = mongoose.model('Workout', workoutSchema);


module.exports = (mongoose) => {
    const workoutSchema = new mongoose.Schema({
        day: Date,
        exercises: [
            {
                type: String,
                name: String,
                duration: Number,
                weight: Number,
                reps: Number,
                sets: Number
            }
        ]
    });

    const Workout = mongoose.model('Workout', workoutSchema);

    return Workout;
}