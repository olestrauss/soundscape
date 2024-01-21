from app import app
from flask import request, jsonify
from flask_cors import CORS, cross_origin
from werkzeug.utils import secure_filename
import psycopg2
import os

CORS(app, resources={r'/api/*': {'origins': 'http://localhost:3000'}})

conn = psycopg2.connect(os.getenv('POSTGRES_URI'))

@app.route('/')
def index():
    return "Welcome to Ole!"

@app.route('/upload-song', methods=['POST'])
def add_song():
    try:
        # Extract song details from request
        title = request.form['title']
        artist = request.form['artist']
        cover_image_url = request.form['cover_image_url']

        # Insert song into the database
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO songs (title, artist, cover_image_url) VALUES (%s, %s, %s)",
            (title, artist, cover_image_url)
        )
        conn.commit()
        cursor.close()

        return 'Song added', 200

    except Exception as e:
        return str(e), 500


@app.route('/api/songs', methods=['GET'])
@cross_origin()
def get_songs():
    try:
        cursor = conn.cursor()
        cursor.execute("SELECT id, title, artist, cover_image_url FROM songs")
        songs = cursor.fetchall()
        cursor.close()

        songs_data = []
        for song in songs:
            songs_data.append({
                'id': song[0],
                'title': song[1],
                'artist': song[2],
                'cover_image_url': song[3]
            })

        return jsonify(songs_data)

    except Exception as e:
        return str(e), 500
    
'''
@app.teardown_appcontext
def close_db(error):
    conn.close()
'''


