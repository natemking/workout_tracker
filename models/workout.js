module.exports = (mongoose, Schema) => {
    const WorkoutSchema = new Schema({
        day: {type: Date, default: Date.now},
        exercises: [
            {
                type: Schema.Types.Object,
                ref: 'Exercise'
            }
        ]
    },
    { timestamps: true });

    const Workout = mongoose.model('Workout', WorkoutSchema);

    return Workout;
}