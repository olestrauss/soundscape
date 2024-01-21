from dotenv import load_dotenv
import os
load_dotenv()

class Config:
    SQLALCHEMY_DATABASE_URI = os.environ.get('POSTGRES_URI')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    UPLOAD_FOLDER = os.environ.get('UPLOAD_FOLDER')
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16MB limit
