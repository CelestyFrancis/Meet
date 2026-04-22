from flask import Flask
from flask_cors import CORS

from app.routes.auth import auth_bp
from app.routes.post import post_bp
from app.routes.friend import friend_bp
from app.routes.notification import notification_bp

app = Flask(__name__)
app.config.from_pyfile('config.py')

CORS(app, origins='http://localhost:3000')

app.register_blueprint(auth_bp, url_prefix='/auth')
app.register_blueprint(post_bp, url_prefix='/post')
app.register_blueprint(friend_bp, url_prefix='/friend')
app.register_blueprint(notification_bp, url_prefix='/notification')
