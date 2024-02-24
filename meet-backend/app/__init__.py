# app/__init__.py
from flask import Flask
from flask_cors import CORS
from app.routes.auth import auth_bp
from app.routes.post import post_bp

import psycopg2

app = Flask(__name__)
conn = psycopg2.connect(
    host="localhost",
    database="Meet",
    user="postgres",
    password="celesty"
)
app.config.from_pyfile('config.py')

CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})
app.register_blueprint(auth_bp, url_prefix='/auth')
app.register_blueprint(post_bp, url_prefix='/post')


