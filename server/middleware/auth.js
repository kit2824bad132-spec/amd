const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

    try {
        const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET || 'your_jwt_secret');
        req.user = decoded.user;
        next();
    } catch (ex) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};
