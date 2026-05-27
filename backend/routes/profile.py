from flask import Blueprint, request, jsonify
from utils.db import get_db

profile_bp = Blueprint('profile', __name__)

@profile_bp.route('/', methods=['GET'])
def get_profile():
    email = request.args.get('email')
    db = get_db()
    user = db.users.find_one({'email': email}, {'password': 0})
    if not user:
        return jsonify({'error': 'User not found'}), 404
    user['_id'] = str(user['_id'])
    return jsonify(user)

@profile_bp.route('/', methods=['PUT'])
def update_profile():
    data = request.json
    email = data.get('email')
    db = get_db()
    update_fields = {k: v for k, v in data.items() if k != 'email' and k != 'password'}
    result = db.users.update_one({'email': email}, {'$set': update_fields})
    if result.matched_count == 0:
        return jsonify({'error': 'User not found'}), 404
    return jsonify({'message': 'Profile updated'})
