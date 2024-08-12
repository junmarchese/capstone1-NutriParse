from flask import Flask, render_template, request, jsonify
import requests
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)

# Edamam API credentials
APP_ID = os.getenv('EDAMAM_APP_ID')
APP_KEY = os.getenv('EDAMAM_APP_KEY')

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/analyze', methods=['POST'])
def analyze():
    ingredients = request.json['ingredients']

    # Edamam API endpoint
    url = "https://api.edamam.com/api/nutrition-details"

    headers = {
        "Content-Type": "application/json"
    }

    data = {
        "title": "Recipe Analysis",
        "ingr": ingredients
    }

    params = {
        "app_id": APP_ID,
        "app_key": APP_KEY
    }

    try:

        response = requests.post(url, headers=headers, json=data, params=params)
        response.raise_for_status()
        
        if response.status_code == 200:
            result = response.json()
            result['status'] = 'success'
            return jsonify(result)
        else: 
            print(f"Failed to analyze ingredients: {response.text}")
            return jsonify({"error": "Failed to analyze ingredients: {response.text}"}), 400
    
    except requests.exceptions.RequestException as e:
        app.logger.error(f"API request failed: {str(e)}")
        app.logger.error(f"Response content: {response.text}")
        return jsonify({"error": f"Failed to analyze ingredients: {str(e)}"}), 400


if __name__ == '__main__':
    app.run(debug=True)


