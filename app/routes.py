from app import app
from flask import request
from werkzeug.utils import secure_filename
import os

@app.route('/')
def index():
    return "Welcome to Soundscape!"

@app.route('/upload-song', methods=['POST'])
def upload_song():
    if 'file' not in request.files:
        return 'No file part', 400
    file = request.files['file']
    if file.filename == '':
        return 'No selected file', 400
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        return 'File uploaded', 200

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in {'mp3', 'wav'}

@app.route('/add-song', methods=['POST'])
def add_song():
    # Extract song details from request
    # Save song details to database
    return 'Song added', 200

