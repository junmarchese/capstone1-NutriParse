def calculate_total_calories(ingredients):
    return sum(ingredient['calories'] for ingredient in ingredients)
