# app.py
from flask import Flask, request, jsonify # type: ignore
from flask_cors import CORS
from fetch_wallet_data import run_full_report

# Create the Flask application object.
app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})


# A POST route that accepts JSON payload and echoes back the data.
@app.route('/api/updateCreditScore', methods=['POST'])
def post_data():
    # Get the JSON payload sent from the client.
    payload = request.get_json()
    print(payload)

    # run_full_report()
    
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
