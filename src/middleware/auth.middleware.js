const jwt = require("jsonwebtoken");

const Patient = require("../models/patients");

const isLogin = async (req, res, next) => {
    const token = req.cookies.jwt;

    const encryptionKey = process.env.SECRET_KEY || 'medicsbaysecretkey12';

    if (!jwt) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    return jwt.verify(token, encryptionKey, (err, decoded) => {

        if (err) {
            console.log(err);

            return res.status(401).json({ message: 'Unauthorized' });
        }

        // Deprecated : for backward compatibility
        req.user = decoded;
        req.token = token;

        // New : for future use
        res.locals.user = decoded;
        next();
    })

};

const isAuthenticated = async (req, res, next) => {
    const token = req.cookies.jwt;

    res.locals.isAuthenticated = token ? true : false;

    next();

};

module.exports = {
    isLogin,
    isAuthenticated
};