from flask import Blueprint, request, jsonify
from flask_cors import cross_origin

from app.services.auth_service import login_user
from app.middleware.token import create_token

auth_bp = Blueprint('auth', __name__)


@auth_bp.route('/login', methods=['POST', 'OPTIONS'])
@cross_origin()
def login():
    data = request.get_json()
    user = login_user(data.get('email'), data.get('password'))
    if user:
        token = create_token(user[0])
        return jsonify({'message': 'Authorized', 'token': token, 'username': user[1], 'id': user[0]}), 200
    return jsonify({'message': 'Invalid email or password'}), 401
