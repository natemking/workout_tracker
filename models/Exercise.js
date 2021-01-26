module.exports = (mongoose, Schema) => {
    const exerciseSchema = new Schema({
            type: String,
            name: String,
            duration: Number,
            weight: Number,
            reps: Number,
            sets: Number,
            distance: Number
    })

    const Exercise = mongoose.model('Exercise', exerciseSchema);

    return Exercise;
}