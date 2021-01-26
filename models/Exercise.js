module.exports = (mongoose, Schema) => {
    const exerciseSchema = new Schema({
            type: String,
            name: {type: String, trim: true},
            duration: Number,
            weight: Number,
            reps: Number,
            sets: Number,
            distance: Number
    },
    { timestamps: true });
    
    const Exercise = mongoose.model('Exercise', exerciseSchema);

    return Exercise;
}