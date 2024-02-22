# app/__init__.py
from flask import Flask
from flask_cors import CORS
from app.routes.auth import auth_bp

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})
app.register_blueprint(auth_bp, url_prefix='/auth')

