# NutriParse

NutriParse is a web application that allows users to input ingredient lists and receive detailed nutritional analysis using the Edamam Nutrition Analysis API.  The application provides a user-friendly interface for creating and managing recipes, analyzing nutritional content, and storing user queries and results.

## Features

- **User Registration/Login**: Users can create accounts and log in to access personalized features.
- **Ingredient Input**: Users can input a list of ingredients for analysis.
- **Nutritional Analysis**: The application analyzes the input ingredients and provides detailed nutritional information.
- **History**: Users can view their past queries and results.
- **Responsive design**: The application is designed to work on desktop device.

## Technologies

- **Backend**: Python, Flask, SQLAlchemy, PostgreSQL
- **Frontend**: HTML, CSS, JavaScript, Axios
- **API**: Edamam Nutrition Analysis API
- **Database**: PostgreSQL

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/junmarchese/capstone1-NutriParse.git
   cd capstone1-NutriParse

2. **Set up a virtual environment:
    ```
    python3 -m venv venv
    source venv/bin/activate

3. **Install dependencies:
    ```
    pip install -r requirements.txt

4. **Set up environment variables:
    Create a `.env` file in the root directory and add your API credentials:

    ```
    DATABASE_URL=your_database_url
    SECRET_KEY=your_secret_key
    EDAMAM_APP_ID=your_edamam_app_id
    EDAMAM_APP_KEY=your_edamam_app_key

5. **Run the application:
    ```
    flask run



### Usage

1. Register/Login: Create an account or login to access the application.
2. Input Ingredients: Enter each ingredient separated by a new line in the provided textarea and click "Analyze" to get nutritional information.
3. View Results: The application will display a summary and detailed nutritional facts tables.
4. History: Access your previous queries and results from the history section.


### API Reference
The application uses the Edamam Nutrition Analysis API to analyze ingredient lists. The API requires an `app_id` and `app_key` for authentication.
    Endpoint: `https://api.edamam.com/api/nutrition-details`
    Method: POST
    Parameters:
        `app_id`: Your application ID
        `app_key`: Your application key
        `title`: Recipe title
        `ingr`: Array of ingredient strings


### Contributing
Contributions are welcome! Please fork the repository and submit a pull request with your changes.

### License
Licensing information attributed to respective owners.

### Acknowledgements
Thanks to Edamam for providing the Nutrition Analysis API.  
Inspired by the health need for accurate nutritional information for recipes.
