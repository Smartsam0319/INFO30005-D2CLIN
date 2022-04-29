const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var RecordSchema = new Schema({
    patient: {
        type: String,
        required: true
    },
    bloodGlucoseLevel: {
        type: Number,
    },
    weight: {
        type: String,
    },
    dosesInsulinTaken: {
        type: Number,
    },
    exercise: {
        type: String,
    },
    message: {
        type: String,
    }
    
}, { timestamps: true })

module.exports = mongoose.model("Record", RecordSchema);
