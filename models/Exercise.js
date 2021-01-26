module.exports = (mongoose, Schema) => {
    const ExerciseSchema = new Schema({
            type: String,
            name: {
                type: String, 
                trim: true
            },
            duration: Number,
            weight: Number,
            reps: Number,
            sets: Number,
            distance: Number
    },
    { timestamps: true });

    const Exercise = mongoose.model('Exercise', ExerciseSchema);

    return Exercise;
}