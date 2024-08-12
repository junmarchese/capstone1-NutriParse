import unittest
from flask_testing import TestCase
from app import app

class TestApp(TestCase):

    def create_app(self):
        app.config['TESTING'] = True
        return app
    
    def test_analyze_endpoint(self):
        response = self.client.post('/analyze', json={'ingredients': "1 cup rice\n10 oz black beans"})
        self.assertEqual(response.status_code, 200)
        self.assertIn('success', response.json['status'])

if __name__ == '__main__':
    unittest.main()

