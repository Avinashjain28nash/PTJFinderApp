import requests
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS  # Import CORS
from werkzeug.security import generate_password_hash, check_password_hash


app = Flask(__name__)

# Configure the MySQL database URI
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:root%40123@localhost:3306/parttime_jobs'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize SQLAlchemy
db = SQLAlchemy(app)

# Enable CORS for the Flask app
CORS(app)  # This allows your React app to make requests to this Flask backend

# Define your models
class Job(db.Model):
    __tablename__ = 'jobs'  # Table name in the database
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    location = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=True)
    salary = db.Column(db.Float, nullable=True)

    def __repr__(self):
        return f'<Job {self.title}>'

# Create database tables
with app.app_context():
    db.create_all()

    # --------------------------------------------------


# Define the User model
class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    mobile = db.Column(db.String(15), nullable=False)
    password_hash = db.Column(db.String(200), nullable=False)

# Add the register route
@app.route('/register', methods=['POST'])
def register():
    data = request.json
    hashed_password = generate_password_hash(data['password'], method='pbkdf2:sha256')
    new_user = User(
        name=data['name'],
        email=data['email'],
        mobile=data['mobile'],
        password_hash=hashed_password
    )
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "User registered successfully!"}), 201

# Add the login route
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    user = User.query.filter_by(email=data['email']).first()
    if user and check_password_hash(user.password_hash, data['password']):
        # Here, you would set a session or token
        return jsonify({"message": "Login successful!"})
    else:
        return jsonify({"message": "Invalid credentials"}), 401


# Define a route to fetch jobs
@app.route('/api/jobs', methods=['GET'])
def get_jobs():
    jobs = Job.query.all()
    jobs_list = [{"id": job.id, "title": job.title, "location": job.location, "description": job.description, "salary": job.salary} for job in jobs]
    return jsonify(jobs_list)

# Define a route to add a new job (optional)
@app.route('/api/jobs', methods=['POST'])
def add_job():
    data = request.json
    new_job = Job(
        title=data['title'],
        location=data['location'],
        description=data.get('description'),
        salary=data.get('salary')
    )
    db.session.add(new_job)
    db.session.commit()
    return jsonify({"message": "Job added successfully!"}), 201

# Replace with your actual API key from OpenCage
OPENCAGE_API_KEY = 'ed9b49a086c548ae82a75e31e5b0ceba'

@app.route('/location', methods=['POST'])
def get_location():
    data = request.json
    latitude = data.get('latitude')
    longitude = data.get('longitude')

    # Call OpenCage API for reverse geocoding
    response = requests.get(
        f'https://api.opencagedata.com/geocode/v1/json?q={latitude}+{longitude}&key={OPENCAGE_API_KEY}'
    )
    
    if response.status_code == 200:
        results = response.json()
        if results['results']:
            location_name = results['results'][0]['formatted']
            
            # Extract the city name from the location string
            # Split the location string by commas and get the city part
            location_parts = location_name.split(',')
            if len(location_parts) > 1:
                city = location_parts[3].strip().split(' ')[0]  # Extract the city name (Bengaluru)
            else:
                city = 'City not found'
            
            return jsonify({
                "status": "success",
                "latitude": latitude,
                "longitude": longitude,
                "location": location_name,  # Return the full location
                "city": city  # Return only the city name
            })
        else:
            return jsonify({
                "status": "error",
                "message": "Location not found"
            }), 404
    else:
        return jsonify({
            "status": "error",
            "message": "Unable to fetch location name"
        }), 500

# Define a simple home route
@app.route('/')
def home():
    return "Welcome to the Part-time Job Finder Application!"

if __name__ == '__main__':
    app.run(debug=True)
