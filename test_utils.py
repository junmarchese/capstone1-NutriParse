import unittest
from utils import calculate_total_calories

class TestUtils(unittest.TestCase):

    def test_calculate_total_calories(self):
        ingredients = [
            {'calories': 100},
            {'calories': 200},
            {'calories': 300}
        ]
        result = calculate_total_calories(ingredients)
        self.assertEqual(result, 600)

if __name__ == '__main__':
    unittest.discover('.', pattern='test*.py')
