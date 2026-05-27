from flask import current_app, g
from pymongo import MongoClient
import os

def get_db():
    if 'db' not in g:
        mongo_uri = os.getenv('MONGO_URI')
        client = MongoClient(mongo_uri)
        g.db = client.get_default_database()
    return g.db
