from app import app
from flask import request, jsonify, send_from_directory, send_file
from flask_cors import CORS, cross_origin
from werkzeug.utils import secure_filename
import psycopg2
import os
import glob

CORS(app, resources={r'/*': {'origins': 'http://localhost:3000'}})

conn = psycopg2.connect(os.getenv('POSTGRES_URI'))

@app.route('/')
def index():
    return "Welcome to Ole!"

@app.route('/upload-song', methods=['POST'])
@cross_origin()
def add_song():
    '''
    first adds title and artist into db and gets the id
    then saves the cover image and song file with the id as the filename
    then updates the db record with the file paths
    '''

    try:
        # Extract song details from request
        title = request.form['title']
        artist = request.form['artist']

        # Insert song into the database without file paths
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO songs (title, artist) VALUES (%s, %s) RETURNING id",
            (title, artist)
        )
        song_id = cursor.fetchone()[0]
        conn.commit()

        cover_image = request.files['cover_image']
        song_file = request.files['audio_file']

        cover_image_filename = f"{song_id}_cover{os.path.splitext(cover_image.filename)[1]}"
        song_file_filename = f"{song_id}_song{os.path.splitext(song_file.filename)[1]}"

        # Save files with the new names
        cover_image.save(os.path.join('soundscape-frontend\src\Assets\covers', cover_image_filename))
        song_file.save(os.path.join('soundscape-frontend\src\Assets\music', song_file_filename))

        # Update the database record with file paths
        cursor.execute(
            "UPDATE songs SET cover_image_url = %s, audio_file_url = %s WHERE id = %s",
            (cover_image_filename, song_file_filename, song_id)
        )
        conn.commit()
        cursor.close()

        return jsonify({'message': 'Song added successfully', 'id': song_id}), 200

        
    except Exception as e:
        return str(e), 500



@app.route('/api/songs', methods=['GET'])
@cross_origin()
def get_songs():
    try:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM songs")
        songs = cursor.fetchall()
        cursor.close()

        songs_data = []
        for song in songs:
            songs_data.append({
                'id': song[0],
                'title': song[1],
                'artist': song[2],
                'image_uri': song[3],
                'audio_uri': song[4]
            })

        return jsonify(songs_data)

    except Exception as e:
        return str(e), 500

@app.route('/api/songs/<int:song_id>', methods=['DELETE'])
@cross_origin()
def delete_song(song_id):
    try:
        cursor = conn.cursor()
        cursor.execute("DELETE FROM songs WHERE id = %s", (song_id,))
        conn.commit()
        cursor.close()

        cover_files = glob.glob(os.path.join('soundscape-frontend\src\Assets\covers', f"{song_id}_cover.*"))
        song_files = glob.glob(os.path.join('soundscape-frontend\src\Assets\music', f"{song_id}_song.*"))

        for file in cover_files + song_files:
            os.remove(file)

        return jsonify({'message': 'Song deleted successfully'}), 200

    except Exception as e:
        return str(e), 500
    

@app.route('/api/media/covers/<int:song_id>')
@cross_origin()
def serve_cover_image(song_id):
    try:
        cursor = conn.cursor()
        cursor.execute("SELECT cover_image_url FROM songs WHERE id = %s", (song_id,))
        cover_image_filename = cursor.fetchone()[0]
        cursor.close()

        # Construct an absolute path
        app_root = os.path.dirname(os.path.abspath(__file__))
        cover_image_directory = os.path.join(app_root, '..', 'soundscape-frontend', 'src', 'Assets', 'covers')
        cover_image_path = os.path.join(cover_image_directory, cover_image_filename)

        return send_file(cover_image_path)
    except Exception as e:
        return str(e), 404


@app.route('/api/media/audio/<int:song_id>')
@cross_origin()
def serve_audio_file(song_id):
    try:
        cursor = conn.cursor()
        cursor.execute("SELECT audio_file_url FROM songs WHERE id = %s", (song_id,))
        audio_file_filename = cursor.fetchone()[0]
        cursor.close()

        # Construct an absolute path
        app_root = os.path.dirname(os.path.abspath(__file__))
        audio_file_directory = os.path.join(app_root, '..', 'soundscape-frontend', 'src', 'Assets', 'music')
        audio_file_path = os.path.join(audio_file_directory, audio_file_filename)

        return send_file(audio_file_path)
    except Exception as e:
        return str(e), 404


    
'''
@app.teardown_appcontext
def close_db(error):
    conn.close()
'''

