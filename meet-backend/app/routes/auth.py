from flask import Blueprint, request, jsonify
from app.services.auth_service import login_user
from flask_cors import cross_origin
from app.middleware.token import create_token


auth_bp = Blueprint('auth', __name__)


@auth_bp.route('/login', methods=['POST', 'OPTIONS'])
@cross_origin()
def login():
    data = request.get_json()
    user_email = data.get('email')
    password = data.get('password')

    user = login_user(user_email, password)

    if user:
        token = create_token(user[1])
        return jsonify({'message': 'User is Authorized', 'token': token, 'username': user[1], 'id': user[0]}), 200

    return jsonify({'message': 'Invalid username or password'}), 401
