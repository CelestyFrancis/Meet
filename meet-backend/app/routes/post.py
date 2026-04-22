from flask import Blueprint, request, jsonify
from flask_cors import cross_origin

from app.services.post_service import create_post, get_posts, get_user_posts, update_post, delete_post
from app.middleware.token import is_token_valid

post_bp = Blueprint('post', __name__)


def _auth():
    token = request.headers.get('Authorization')
    return is_token_valid(token) if token else None


@post_bp.route('/create', methods=['POST', 'OPTIONS'])
@cross_origin()
def create():
    payload = _auth()
    if not payload:
        return jsonify({'message': 'Unauthorized'}), 401
    data = request.get_json()
    create_post(data.get('title'), data.get('content'), data.get('authorId'))
    return jsonify({'message': 'Post created'}), 200


@post_bp.route('/get', methods=['GET', 'OPTIONS'])
@cross_origin()
def get():
    if not _auth():
        return jsonify({'message': 'Unauthorized'}), 401
    return jsonify({'message': 'OK', 'posts': get_posts()}), 200


@post_bp.route('/get_my_post', methods=['GET', 'OPTIONS'])
@cross_origin()
def get_my_post():
    payload = _auth()
    if not payload:
        return jsonify({'message': 'Unauthorized'}), 401
    return jsonify({'message': 'OK', 'posts': get_user_posts(payload['user_id'])}), 200


@post_bp.route('/edit/<int:post_id>', methods=['PUT', 'OPTIONS'])
@cross_origin()
def edit(post_id):
    payload = _auth()
    if not payload:
        return jsonify({'message': 'Unauthorized'}), 401
    data = request.get_json()
    ok = update_post(post_id, payload['user_id'], data.get('title'), data.get('content'))
    if ok:
        return jsonify({'message': 'Post updated'}), 200
    return jsonify({'message': 'Post not found or not yours'}), 404


@post_bp.route('/delete/<int:post_id>', methods=['DELETE', 'OPTIONS'])
@cross_origin()
def remove(post_id):
    payload = _auth()
    if not payload:
        return jsonify({'message': 'Unauthorized'}), 401
    ok = delete_post(post_id, payload['user_id'])
    if ok:
        return jsonify({'message': 'Post deleted'}), 200
    return jsonify({'message': 'Post not found or not yours'}), 404
