from flask import Blueprint, request, jsonify
from flask_cors import cross_origin

from app.middleware.token import is_token_valid
from app.services.friend_service import (
    send_request, accept_request, decline_request, unfriend,
    get_friends, get_received_requests, get_sent_requests
)

friend_bp = Blueprint('friend', __name__)


def _auth():
    token = request.headers.get('Authorization')
    return is_token_valid(token) if token else None


@friend_bp.route('/request/<int:to_id>', methods=['POST', 'OPTIONS'])
@cross_origin()
def request_friend(to_id):
    payload = _auth()
    if not payload:
        return jsonify({'message': 'Unauthorized'}), 401
    send_request(payload['user_id'], to_id)
    return jsonify({'message': 'Request sent'}), 200


@friend_bp.route('/accept/<int:from_id>', methods=['PUT', 'OPTIONS'])
@cross_origin()
def accept(from_id):
    payload = _auth()
    if not payload:
        return jsonify({'message': 'Unauthorized'}), 401
    accept_request(payload['user_id'], from_id)
    return jsonify({'message': 'Friend accepted'}), 200


@friend_bp.route('/decline/<int:from_id>', methods=['DELETE', 'OPTIONS'])
@cross_origin()
def decline(from_id):
    payload = _auth()
    if not payload:
        return jsonify({'message': 'Unauthorized'}), 401
    decline_request(payload['user_id'], from_id)
    return jsonify({'message': 'Request declined'}), 200


@friend_bp.route('/unfriend/<int:other_id>', methods=['DELETE', 'OPTIONS'])
@cross_origin()
def remove_friend(other_id):
    payload = _auth()
    if not payload:
        return jsonify({'message': 'Unauthorized'}), 401
    unfriend(payload['user_id'], other_id)
    return jsonify({'message': 'Unfriended'}), 200


@friend_bp.route('/list', methods=['GET', 'OPTIONS'])
@cross_origin()
def list_friends():
    payload = _auth()
    if not payload:
        return jsonify({'message': 'Unauthorized'}), 401
    uid = payload['user_id']
    return jsonify({
        'friends': get_friends(uid),
        'sentRequests': get_sent_requests(uid),
        'receivedRequests': get_received_requests(uid),
    }), 200
