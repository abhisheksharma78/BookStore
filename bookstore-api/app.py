from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
import datetime
from flask_migrate import Migrate
import os

app = Flask(__name__)
app.config.from_object('config.Config')
CORS(app)

db = SQLAlchemy(app)
migrate = Migrate(app, db)
jwt = JWTManager(app)

from models import User, Book

@app.route('/users/register', methods=['POST'])
def register_user():
    data = request.get_json()
    hashed_password = generate_password_hash(data['password'], method='pbkdf2:sha256')
    new_user = User(username=data['username'], password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'User registered successfully!'}), 201

@app.route('/users/login', methods=['POST'])
def login_user():
    data = request.get_json()
    username = data.get('username')
    print("username", username)
    password = data.get('password')
    user = User.query.filter_by(username=username).first()
    
    if user and check_password_hash(user.password, password):
        access_token = create_access_token(identity={'username': user.username})
        return jsonify(access_token=access_token), 200
    else:
        return jsonify({'message': 'Invalid username or password'}), 401

@app.route('/books', methods=['GET'])
def get_books():
    books = Book.query.all()
    return jsonify([book.to_dict() for book in books]), 200

@app.route('/books', methods=['POST'])
def add_book():
    data = request.get_json()
    try:
        new_book = Book(
            title=data['title'],
            author=data['author'],
            isbn=data['isbn'],
            pages=data['pages'],
            cover=data.get('cover', '')
        )
        db.session.add(new_book)
        db.session.commit()
        return jsonify({'message': 'Book added successfully!'}), 201
    except Exception as e:
        print(f'Error: {e}')
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)

migrate = Migrate(app,db)