const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');
const { authenticate, requireRole } = require('../middleware/auth');

const router = express.Router();

function signToken(user) {
    return jwt.sign(
        { id: user.id, username: user.username, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '8h'}
    );
}

// POST /api/auth/login
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are invalid'});
    }

    const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username);

    if (!user || !bcrypt.compareSync(password, user.password_hash)) {
        return res.status(400).json({ error: 'Username and password are required'});
    }

    res.json({
        token: signToken(user),
        user: { id: user.id, username: user.username, role: user.role},
    });
});

// POST /api/auth/register (supervisors only, so employees can't create accounts)
router.post('/register', authenticate, requireRole('supervisor'), (req, res) => {
    const { username, password, role } = req.body;

    if (!username || !password || !['supervisor', 'employee'].includes(role)) {
        return res.status(400).json({ error: 'Username, password and role required'});
    }

    const exists = db.prepare('SELECT id FROM users WHERE username = ?').get(username);
    if (exists){
        return res.status(409).json({ error: 'Username already taken'});
    }

    const hash = bcrypt.hashSync(password, 10);
    const result = db
        .prepare('INSERT INTO users (username, password_hash, role) VALUES (?, ?, ?)')
        .run(username, hash, role);
    
    res.status(201).json({ id: result.lastInsertRowid, username, role});
});

// GET /api/auth/me (any logged in user; React will use this to store a session)
router.get('/me', authenticate, (req, res) => {
    res.json({ user: req.user});
});

// GET /api/auth/employees (supervisors need this list to assign tasks)
router.get('/employees', authenticate, requireRole('supervisor'), (req, res) => {
    const employees = db
        .prepare("SELECT id, username FROM users WHERE role = 'employee' ORDER BY username")
        .all();
    res.json(employees);
});

module.exports = router;