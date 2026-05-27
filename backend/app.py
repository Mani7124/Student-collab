from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
import os

from routes.auth import auth_bp
from routes.posts import posts_bp
from routes.profile import profile_bp
from utils.db import get_db

load_dotenv()

app = Flask(__name__)
CORS(app)

# Register blueprints
app.register_blueprint(auth_bp, url_prefix='/api/auth')
app.register_blueprint(posts_bp, url_prefix='/api/posts')
app.register_blueprint(profile_bp, url_prefix='/api/profile')

@app.route("/")
def home():
    return {"message": "Student Collaboration API is running."}

if __name__ == "__main__":
    app.run(debug=True)
