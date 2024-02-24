from flask import Blueprint, request, jsonify
from app.services.post_service import create_post, get_posts
from flask_cors import cross_origin
from app.middleware.token import is_token_valid


post_bp = Blueprint('post', __name__)


@post_bp.route('/create', methods=['POST','OPTIONS'])
@cross_origin()
def create():
    data = request.get_json()
    user_token = request.headers['Authorization']
    check_token = is_token_valid(user_token)
    if check_token:
        isCreated = create_post(data.get('title'), data.get('content'), data.get('author'))
        if isCreated:
            return jsonify({'message': 'Post successfully created'}), 200
        return jsonify({'message': 'Error while adding'}), 404
    return jsonify({'message': 'TnAuthorized Access'}), 401


@post_bp.route('/get', methods=['GET','OPTIONS'])
@cross_origin()
def get():
    user_token = request.headers['Authorization']
    check_token = is_token_valid(user_token)
    if check_token:
        posts = get_posts()
        if posts:
            return jsonify({'message': 'Post successfully created', 'posts': posts}), 200
        return jsonify({'message': 'Error while fetching'}), 404
    return jsonify({'message': 'UnAuthorized Access'}), 401