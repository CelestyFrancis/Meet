from flask import Blueprint, request, jsonify
from app.services.auth_service import login_user
from flask_cors import cross_origin

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/login', methods=['POST','OPTIONS'])
@cross_origin()
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    user = login_user(username, password)
    if user:
        return jsonify({'message': 'User is Authorized'}), 200

    return jsonify({'message': 'Invalid username or password'}), 401
