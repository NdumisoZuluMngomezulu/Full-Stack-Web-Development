const jwt = require('jsonwebtoken');

//verify token and attach it to user request
function authenticate(req, res, next) {
    const header = req.headers.authorization || '';
    const [scheme, token] = header.split(' ');

    if (scheme !== 'Bearer' || !token) {
        return res.status(401).json({ error: 'Missing or malformed token'});
    }

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next()
    } catch (err) {
        return res.status(403).json({ error: 'You do not have permission'});
    }
}

function requireRole(...roles) {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ error: 'You do not have permission'});
        }
        next();
    };
}

module.exports = { authenticate, requireRole};