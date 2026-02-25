const express = require('express');
const router = express.Router();
const multer = require('multer');
const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');
const Prediction = require('../models/Prediction');
const auth = require('../middleware/auth');
const path = require('path');

// Configure multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, '../uploads');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({ storage });

router.post('/predict', auth, upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No image uploaded' });
        }

        // Send to AI Microservice
        const formData = new FormData();
        formData.append('file', fs.createReadStream(req.file.path));

        const aiResponse = await axios.post('http://localhost:8000/predict', formData, {
            headers: {
                ...formData.getHeaders()
            }
        });

        const aiData = aiResponse.data;

        // Save prediction to DB
        const prediction = new Prediction({
            userId: req.user.id,
            imagePath: `/uploads/${req.file.filename}`,
            disease_name: aiData.disease_name,
            confidence_score: aiData.confidence_score,
            treatment_recommendation: aiData.treatment_recommendation,
            crop_health_percentage: aiData.crop_health_percentage
        });

        await prediction.save();

        res.json(prediction);
    } catch (err) {
        console.error('Prediction Error:', err.message);
        res.status(500).json({ message: 'Error processing prediction' });
    }
});

module.exports = router;
