from flask import Blueprint, request, jsonify
from flask_cors import cross_origin

from app.middleware.token import is_token_valid
from app.services.notification_service import (
    get_notifications, mark_read, mark_all_read, clear_all
)

notification_bp = Blueprint('notification', __name__)


def _auth():
    token = request.headers.get('Authorization')
    return is_token_valid(token) if token else None


@notification_bp.route('/list', methods=['GET', 'OPTIONS'])
@cross_origin()
def list_notifications():
    payload = _auth()
    if not payload:
        return jsonify({'message': 'Unauthorized'}), 401
    return jsonify({'notifications': get_notifications(payload['user_id'])}), 200


@notification_bp.route('/read/<int:notif_id>', methods=['PUT', 'OPTIONS'])
@cross_origin()
def read_one(notif_id):
    payload = _auth()
    if not payload:
        return jsonify({'message': 'Unauthorized'}), 401
    mark_read(payload['user_id'], notif_id)
    return jsonify({'message': 'Marked as read'}), 200


@notification_bp.route('/read-all', methods=['PUT', 'OPTIONS'])
@cross_origin()
def read_all():
    payload = _auth()
    if not payload:
        return jsonify({'message': 'Unauthorized'}), 401
    mark_all_read(payload['user_id'])
    return jsonify({'message': 'All marked as read'}), 200


@notification_bp.route('/clear', methods=['DELETE', 'OPTIONS'])
@cross_origin()
def clear():
    payload = _auth()
    if not payload:
        return jsonify({'message': 'Unauthorized'}), 401
    clear_all(payload['user_id'])
    return jsonify({'message': 'Cleared'}), 200
