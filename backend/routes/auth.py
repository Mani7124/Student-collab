from flask import Blueprint, request, jsonify, session
from werkzeug.security import generate_password_hash, check_password_hash
from utils.db import get_db
import os

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/signup', methods=['POST'])
def signup():
    data = request.json
    db = get_db()
    if db.users.find_one({'email': data['email']}):
        return jsonify({'error': 'Email already registered'}), 400
    hashed_pw = generate_password_hash(data['password'])
    user = {
        'email': data['email'],
        'password': hashed_pw,
        'name': data.get('name', ''),
        'role': data.get('role', 'student')
    }
    db.users.insert_one(user)
    return jsonify({'message': 'User registered successfully'})

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    db = get_db()
    user = db.users.find_one({'email': data['email']})
    if not user or not check_password_hash(user['password'], data['password']):
        return jsonify({'error': 'Invalid credentials'}), 401
    # For demo: return user info (no JWT/session for now)
    return jsonify({'message': 'Login successful', 'user': {'email': user['email'], 'name': user.get('name', ''), 'role': user.get('role', '')}})
