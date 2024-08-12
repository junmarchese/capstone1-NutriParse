document.addEventListener('DOMContentLoaded', function() {
    const analyzeBtn = document.getElementById('analyze');
    const newRecipeBtn = document.getElementById('new-recipe');
    const ingrTextarea = document.getElementById('ingredients');
    const resultsDiv = document.getElementById('results');
    const resultsDiv2 = document.getElementById('results2');

    
    analyzeBtn.addEventListener('click', function() {
        
        const ingredients = ingrTextarea.value.split('\n').filter(ingredient => ingredient.trim() !== '');
        console.log('Sending ingredients:', ingredients);

        axios.post('/analyze', {
            ingredients: ingredients
        })
        .then(function(response) {
            displayResults(response.data, ingredients);
            newRecipeBtn.style.display = "inline-block";
        })
        .catch(function(error) {
            let errorMsg = 'Error analyzing ingredients. Please try again.';
            if (error.response && error.response.data && error.response.data.error) {
                errorMsg = error.response.data.error;
            }
            resultsDiv.innerHTML = '<p class="text-error">${errorMsg}</p>';
            console.error('Error:', error);
        });
    });


    newRecipeBtn.addEventListener('click', function() {
        ingrTextarea.value = '';
        resultsDiv.innerHTML = '';
        resultsDiv2.innerHTML = '';
        newRecipeBtn.style.display = 'none';
    });


    function displayResults(data, ingredients) {
        let html = '<h2>Analysis Results:</h2>';

        // Summary table
        let summaryHtml = '<div class="summary-table">';
        summaryHtml += '<table>';
        summaryHtml += '<tr><th>Qty</th><th>Unit</th><th>Food</th><th>Calories</th><th>Weight</th></tr>';

        ingredients.forEach((ingredient, index) => {
            const parsedIngr = data.ingredients[index].parsed[0];
            summaryHtml += `<tr>
                <td>${parsedIngr.quantity}</td>
                <td>${parsedIngr.measure}</td>
                <td>${parsedIngr.food}</td>
                <td>${parsedIngr.nutrients.ENERC_KCAL.quantity.toFixed(1)} kcal</td>
                <td>${parsedIngr.weight.toFixed(1)} g</td>
            </tr>`;
        });

        summaryHtml += '</table></div>';


        // Nutrition Facts table
        let nutriFactsHtml = '<div class="nutri-facts-table">';
        nutriFactsHtml += '<table>';
        nutriFactsHtml += '<tr><th colspan="2"><h2>Nutrition Facts</h2></th></tr>';
        nutriFactsHtml += '<tr><th colspan="2">Amount Per Serving</th></tr>';
        nutriFactsHtml += `<tr><td
        colspan="2" 
        class="calories" ${data.calories.indent ? ' class="indent"' : ''}>
        <div class="space-between">
        <strong>Calories</strong>
        
        <span>
        ${Math.round(data.calories)}
        </span>
        </div>
        </td></tr>`;
        nutriFactsHtml += '<tr><td colspan="2"  class="small-info"><strong>% Daily Value*</strong></td></tr>';



        // Main nutrients
        const mainNutrients = [
            { key: 'FAT', label: 'Total Fat ' },
            { key: 'FASAT', label: 'Saturated Fat ', indent: true },
            { key: 'FATRN', label: 'Trans Fat ', indent: true, noDV: true },
            { key: 'CHOLE', label: 'Cholesterol ' },
            { key: 'NA', label: 'Sodium ' },
            { key: 'CHOCDF', label: 'Total Carbohydrate ' },
            { key: 'FIBTG', label: 'Dietary Fiber ', indent: true },
            { key: 'SUGAR', label: 'Total Sugars ', indent: true, noDV: true },
            { key: 'PROCNT', label: 'Protein ' }
        ];

        mainNutrients.forEach(nutrient => {
            if (data.totalNutrients[nutrient.key]) {
                const n = data.totalNutrients[nutrient.key];
                const dv = data.totalDaily[nutrient.key];
                let line = '<tr>';
                line += `<td${nutrient.indent ? ' class="indent"' : ''}><strong>${nutrient.label}</strong>${n.quantity.toFixed(1)}${n.unit}</td>`; 
                if (!nutrient.noDV && dv) {
                    line += `<td><strong>${Math.round(dv.quantity)}%</strong></td>`;
                } else {
                    line += '<td></td>';
                }
                line += '</tr>';
                nutriFactsHtml += line;
            }
        });


        // Vitamins and minerals
        const microNutrients = [
            { key: 'VITD', label: 'Vitamin D ' },
            { key: 'CA', label: 'Calcium ' },
            { key: 'FE', label: 'Iron' },
            { key: 'K', label: 'Potassium' }
        ];

        microNutrients.forEach(nutrient => {
        if (data.totalNutrients[nutrient.key]) {
            const n = data.totalNutrients[nutrient.key];
            const dv = data.totalDaily[nutrient.key];
            let microNuLine = '<tr>';
            microNuLine += `<td>${nutrient.indent ? ' class="indent"' : ''}<strong>${nutrient.label}</strong>${n.quantity.toFixed(1)}${n.unit}</td>`;
            if (!nutrient.noDV && dv) {
                microNuLine += `<td><strong>${Math.round(dv.quantity)}%</strong></td>`;
            } else {
                microNuLine += '<td></td>';
            }
            microNuLine += '</tr>';
            nutriFactsHtml += microNuLine;
        }
    });

        nutriFactsHtml += '<tr><td colspan="2"><p class="footnote">* Percent Daily Values are based on a 2000 calorie diet.</p></td></tr>';
        nutriFactsHtml += '</table></div>';


        resultsDiv.innerHTML = `<div class="tables-container">${nutriFactsHtml}</div>`;


        resultsDiv2.innerHTML = `<div class="tables-container">${summaryHtml}</div>`;

        document.querySelector(".right").style.display = "block";
        }
});


