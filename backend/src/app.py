# app.py
from flask import Flask, request, jsonify

# Create the Flask application object.
app = Flask(__name__)

# A simple GET route that returns a welcome message.
@app.route('/', methods=['GET'])
def home():
    return "Welcome to the Flask backend!"

# A GET route that returns some JSON data.


# A POST route that accepts JSON payload and echoes back the data.
@app.route('/api/updateCreditScore', methods=['POST'])
def post_data():
    # Get the JSON payload sent from the client.
    payload = request.get_json()
    
    # Here, you might process the payload or store it.
    # For now, we're just echoing it back.
    response = {
        "received": payload,
        "status": "data processed"
    }
    # Return the JSON response with a 201 (created) status code.
    return jsonify(response), 201

# Run the app on port 5000 (or any port you choose).
if __name__ == "__main__":
    app.run(port=5000, debug=True)
