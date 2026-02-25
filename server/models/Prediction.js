const mongoose = require('mongoose');

const predictionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    imagePath: { type: String, required: true },
    disease_name: { type: String, required: true },
    confidence_score: { type: String, required: true },
    treatment_recommendation: { type: String, required: true },
    crop_health_percentage: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Prediction', predictionSchema);
