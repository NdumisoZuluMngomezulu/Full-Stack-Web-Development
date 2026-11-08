const Database = require('better-sqlite3');

const db = new Database('todo.db');
db.pragma('foreign_keys = ON');

db.exec(
    `CREATE TABLE IF NOT EXISTS users (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    username        TEXT NOT NULL UNIQUE,
    password_hash   TEXT NOT NULL,
    role            TEXT NOT NULL CHECK (role IN ('supervisor', 'employee')));
    
    CREATE TABLE IF NOT EXISTS tasks (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    title           TEXT NOT NULL,
    description     TEXT DEFAULT '',
    completed       INTEGER NOT NULL DEFAULT 0,         -- 0 = pending, 1 = done
    rating          INTEGER CHECK (rating BETWEEN 1 AND 5),         -- NULL UNTIL rated
    created_by      INTEGER NOT NULL REFERENCES users(id),
    assigned_to     INTEGER NOT NULL REFERENCES users(id),
    created_at      TEXT NOT NOT NULL  DEFAULT CURRENT_TIMESTAMP
    );
    `
);

module.exports = db;