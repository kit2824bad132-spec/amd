const express = require('express');
const router = express.Router();
const Prediction = require('../models/Prediction');
const auth = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
    try {
        const history = await Prediction.find({ userId: req.user.id }).sort({ createdAt: -1 });
        res.json(history);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
