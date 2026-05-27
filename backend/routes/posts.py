from flask import Blueprint, request, jsonify
from utils.db import get_db
from bson import ObjectId

posts_bp = Blueprint('posts', __name__)

@posts_bp.route('/', methods=['GET'])
def get_posts():
    db = get_db()
    posts = list(db.posts.find())
    for post in posts:
        post['_id'] = str(post['_id'])
    return jsonify(posts)

@posts_bp.route('/', methods=['POST'])
def create_post():
    data = request.json
    db = get_db()
    post = {
        'title': data['title'],
        'description': data.get('description', ''),
        'created_by': data.get('created_by', ''),
        'registrations': []
    }
    result = db.posts.insert_one(post)
    post['_id'] = str(result.inserted_id)
    return jsonify(post), 201

@posts_bp.route('/<post_id>/register', methods=['POST'])
def register_for_post(post_id):
    data = request.json
    db = get_db()
    user_email = data.get('email')
    post = db.posts.find_one({'_id': ObjectId(post_id)})
    if not post:
        return jsonify({'error': 'Post not found'}), 404
    if user_email in post.get('registrations', []):
        return jsonify({'error': 'Already registered'}), 400
    db.posts.update_one({'_id': ObjectId(post_id)}, {'$push': {'registrations': user_email}})
    return jsonify({'message': 'Registered successfully'})
