const bcrypt = require('bcryptjs');
const db = require('./db');

const users = [
  { username: 'boss',  password: 'password123', role: 'supervisor' },
  { username: 'alice', password: 'password123', role: 'employee' },
  { username: 'bob',   password: 'password123', role: 'employee' },
];

const insert = db.prepare(
    'INSERT OR IGNORE INTO users (username, password_hash, role) VALUES (?, ?, ?)'
);

for (const u of users) {
    insert.run(u.username, bcrypt.hashSync(u.password, 10), u.role);
}

console.log('Seeded users:', db.prepare('SELECT id, username, role FROM users').all());