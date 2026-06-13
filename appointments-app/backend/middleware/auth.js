const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    const token = req.header('x-auth-token');
    if(!token) return res.status(401).json({ msg: 'No token, auth denied'});

    try{
        const decoded = jwt.verify(token, process.env.JWET_SECRET);
        req.user = decoded;
        next();
    } catch (e){
        res.status(400).json({msg: 'Token not valid'});
    }
}

function doctorOnly(req, res, next) {
    if (req.user.role !== 'doctor') {
        return res.status(403).json({ msg: 'Access denied. Dotcors only.'});

    }
    next();
}

module.exports = { auth, doctorOnly};