from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)  # Allows your HTML file to call this server

def get_db():
    conn = sqlite3.connect('database.db')
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    with get_db() as db:
        db.execute('''
            CREATE TABLE IF NOT EXISTS movies (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                rating INTEGER NOT NULL
            )
        ''')
init_db()

@app.route('/movies', methods=['GET'])
def get_movies():
    with get_db() as db:
        movies = db.execute('SELECT * FROM movies').fetchall()
    return jsonify([dict(m) for m in movies])

@app.route('/movies', methods=['POST'])
def add_movie():
    data = request.get_json()
    with get_db() as db:
        db.execute('INSERT INTO movies (title, rating) VALUES (?, ?)',
                   (data['title'], data['rating']))
        db.commit()
    return {'status': 'ok'}, 201

if __name__ == '__main__':
    app.run(debug=True)