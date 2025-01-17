class UserPreferences {
    constructor() {
        this.preferences = {
            vegetarian: false,
            calorieLimit: 2000,
            allergies: [],
            excludedIngredients: []
        };
    }

    updatePreferences(newPrefs) {
        this.preferences = { ...this.preferences, ...newPrefs };
        this.saveToLocalStorage();
    }

    saveToLocalStorage() {
        localStorage.setItem('userPreferences', JSON.stringify(this.preferences));
    }

    loadFromLocalStorage() {
        const saved = localStorage.getItem('userPreferences');
        if (saved) {
            this.preferences = JSON.parse(saved);
        }
    }
}

// Update MealPlanner class with new methods
class MealPlanner {
    // ... existing constructor ...

    filterRecipesByPreferences(recipes) {
        return recipes.filter(recipe => {
            const meetsCalorieLimit = recipe.calories <= this.userPrefs.preferences.calorieLimit / 3;
            const noExcludedIngredients = !recipe.ingredients.some(ing => 
                this.userPrefs.preferences.excludedIngredients.includes(ing));
            const meetsVegetarian = !this.userPrefs.preferences.vegetarian || 
                !recipe.ingredients.some(ing => ['chicken', 'fish', 'beef', 'salmon'].includes(ing));
            
            return meetsCalorieLimit && noExcludedIngredients && meetsVegetarian;
        });
    }

    getRandomRecipe(mealType) {
        const options = this.filterRecipesByPreferences(recipes[mealType]);
        return options[Math.floor(Math.random() * options.length)];
    }
}

// Add this function to get ingredients for a specific meal
function getMealIngredients(mealName) {
    const mealIngredients = {
        // Breakfast meals
        'Oatmeal with berries and nuts': [
            ['Oats', 'Grains & Legumes'],
            ['Mixed berries', 'Berries'],
            ['Walnuts', 'Nuts & Seeds'],
            ['Ground flaxseeds', 'Nuts & Seeds'],
            ['Flaxseed oil', 'Healthy Oils'],
            ['Almond milk', 'Dairy & Alternatives']
        ],
        'Greek yogurt parfait with granola': [
            ['Greek yogurt', 'Dairy & Alternatives'],
            ['Granola', 'Grains & Legumes'],
            ['Mixed berries', 'Berries'],
            ['Chia seeds', 'Nuts & Seeds'],
            ['Almonds', 'Nuts & Seeds'],
            ['Honey', 'Pantry Items']
        ],
        'Whole grain toast with avocado': [
            ['Whole grain bread', 'Grains & Legumes'],
            ['Avocado', 'Fruits'],
            ['Cherry tomatoes', 'Vegetables'],
            ['Extra virgin olive oil', 'Healthy Oils'],
            ['Pumpkin seeds', 'Nuts & Seeds'],
            ['Baby spinach', 'Leafy Greens']
        ],

        // Lunch meals
        'Mediterranean Quinoa Bowl': [
            ['Quinoa', 'Grains & Legumes'],
            ['Cucumber', 'Vegetables'],
            ['Cherry tomatoes', 'Vegetables'],
            ['Red onion', 'Vegetables'],
            ['Chickpeas', 'Grains & Legumes'],
            ['Extra virgin olive oil', 'Healthy Oils'],
            ['Pine nuts', 'Nuts & Seeds']
        ],
        'Lentil and Vegetable Soup': [
            ['Lentils', 'Grains & Legumes'],
            ['Carrots', 'Vegetables'],
            ['Celery', 'Vegetables'],
            ['Onion', 'Vegetables'],
            ['Garlic', 'Vegetables'],
            ['Avocado oil', 'Healthy Oils'],
            ['Fresh thyme', 'Herbs & Seasonings'],
            ['Ground flaxseeds', 'Nuts & Seeds']
        ],
        'Grilled Chicken Salad': [
            ['Chicken breast', 'Proteins'],
            ['Mixed salad greens', 'Leafy Greens'],
            ['Cherry tomatoes', 'Vegetables'],
            ['Cucumber', 'Vegetables'],
            ['Avocado', 'Fruits'],
            ['Flaxseed oil', 'Healthy Oils'],
            ['Sunflower seeds', 'Nuts & Seeds'],
            ['Walnuts', 'Nuts & Seeds']
        ],

        // Dinner meals
        'Grilled Fish with Vegetables': [
            ['Salmon', 'Proteins'],
            ['Broccoli', 'Vegetables'],
            ['Asparagus', 'Vegetables'],
            ['Lemon', 'Fruits'],
            ['Extra virgin olive oil', 'Healthy Oils'],
            ['Fresh herbs', 'Herbs & Seasonings'],
            ['Pine nuts', 'Nuts & Seeds']
        ],
        'Tofu Stir-Fry with Brown Rice': [
            ['Tofu', 'Proteins'],
            ['Brown rice', 'Grains & Legumes'],
            ['Bell peppers', 'Vegetables'],
            ['Broccoli', 'Vegetables'],
            ['Carrots', 'Vegetables'],
            ['Avocado oil', 'Healthy Oils'],
            ['Sesame seeds', 'Nuts & Seeds'],
            ['Ginger root', 'Herbs & Seasonings'],
            ['Garlic', 'Vegetables']
        ],
        'Lean Turkey Meatballs with Zucchini Noodles': [
            ['Turkey breast', 'Proteins'],
            ['Zucchini', 'Vegetables'],
            ['Fresh basil', 'Herbs & Seasonings'],
            ['Garlic', 'Vegetables'],
            ['Cherry tomatoes', 'Vegetables'],
            ['Extra virgin olive oil', 'Healthy Oils'],
            ['Ground flaxseeds', 'Nuts & Seeds']
        ],
        'Baked Salmon with Sweet Potato': [
            ['Salmon', 'Proteins'],
            ['Sweet potato', 'Vegetables'],
            ['Brussels sprouts', 'Vegetables'],
            ['Avocado oil', 'Healthy Oils'],
            ['Fresh dill', 'Herbs & Seasonings'],
            ['Lemon', 'Fruits'],
            ['Almonds', 'Nuts & Seeds']
        ],

        // Chinese Breakfast
        'Congee with lean chicken and ginger': [
            ['Brown rice', 'Grains & Legumes'],
            ['Lean chicken breast', 'Proteins'],
            ['Ginger root', 'Herbs & Seasonings'],
            ['Green onions', 'Vegetables'],
            ['Wood ear mushrooms', 'Vegetables'],
            ['Sesame oil', 'Healthy Oils'],
            ['Pine nuts', 'Nuts & Seeds']
        ],
        'Whole grain steamed buns with vegetables': [
            ['Whole wheat flour', 'Grains & Legumes'],
            ['Spinach', 'Leafy Greens'],
            ['Mushrooms', 'Vegetables'],
            ['Carrots', 'Vegetables'],
            ['Sesame oil', 'Healthy Oils'],
            ['Chia seeds', 'Nuts & Seeds']
        ],
        'Soy milk with multigrain bread': [
            ['Unsweetened soy milk', 'Dairy & Alternatives'],
            ['Multigrain bread', 'Grains & Legumes'],
            ['Cucumber', 'Vegetables'],
            ['Walnuts', 'Nuts & Seeds'],
            ['Ground flaxseeds', 'Nuts & Seeds']
        ],
        'Black sesame oatmeal with nuts': [
            ['Oats', 'Grains & Legumes'],
            ['Black sesame', 'Nuts & Seeds'],
            ['Almonds', 'Nuts & Seeds'],
            ['Goji berries', 'Berries'],
            ['Soy milk', 'Dairy & Alternatives']
        ],

        // Chinese Lunch
        'Brown rice with steamed fish and bokchoy': [
            ['Brown rice', 'Grains & Legumes'],
            ['White fish', 'Proteins'],
            ['Bok choy', 'Leafy Greens'],
            ['Ginger root', 'Herbs & Seasonings'],
            ['Green onions', 'Vegetables'],
            ['Extra virgin olive oil', 'Healthy Oils'],
            ['Sesame seeds', 'Nuts & Seeds']
        ],
        'Tofu and mushroom noodle soup': [
            ['Whole grain noodles', 'Grains & Legumes'],
            ['Firm tofu', 'Proteins'],
            ['Shiitake mushrooms', 'Vegetables'],
            ['Baby spinach', 'Leafy Greens'],
            ['Garlic', 'Vegetables'],
            ['Sesame oil', 'Healthy Oils'],
            ['Pine nuts', 'Nuts & Seeds']
        ],
        'Chinese cabbage wrap with lean pork': [
            ['Lean pork', 'Proteins'],
            ['Napa cabbage', 'Leafy Greens'],
            ['Carrots', 'Vegetables'],
            ['Bean sprouts', 'Vegetables'],
            ['Avocado oil', 'Healthy Oils'],
            ['Pumpkin seeds', 'Nuts & Seeds']
        ],
        'Vegetable dumpling with clear soup': [
            ['Whole wheat wrapper', 'Grains & Legumes'],
            ['Tofu', 'Proteins'],
            ['Napa cabbage', 'Leafy Greens'],
            ['Mushrooms', 'Vegetables'],
            ['Carrots', 'Vegetables'],
            ['Extra virgin olive oil', 'Healthy Oils'],
            ['Sesame seeds', 'Nuts & Seeds']
        ],

        // Chinese Dinner
        'Steamed sea bass with ginger and scallion': [
            ['Sea bass', 'Proteins'],
            ['Ginger root', 'Herbs & Seasonings'],
            ['Green onions', 'Vegetables'],
            ['Bok choy', 'Leafy Greens'],
            ['Brown rice', 'Grains & Legumes'],
            ['Extra virgin olive oil', 'Healthy Oils'],
            ['Pine nuts', 'Nuts & Seeds']
        ],
        'Mapo tofu with brown rice': [
            ['Firm tofu', 'Proteins'],
            ['Brown rice', 'Grains & Legumes'],
            ['Mushrooms', 'Vegetables'],
            ['Green onions', 'Vegetables'],
            ['Garlic', 'Vegetables'],
            ['Avocado oil', 'Healthy Oils'],
            ['Sesame seeds', 'Nuts & Seeds']
        ],
        'Chinese broccoli with garlic sauce': [
            ['Chinese broccoli', 'Leafy Greens'],
            ['Brown rice', 'Grains & Legumes'],
            ['Garlic', 'Vegetables'],
            ['Ginger root', 'Herbs & Seasonings'],
            ['Extra virgin olive oil', 'Healthy Oils'],
            ['Almonds', 'Nuts & Seeds']
        ],
        'Lotus root soup with lean pork': [
            ['Lean pork', 'Proteins'],
            ['Lotus root', 'Vegetables'],
            ['Chinese yam', 'Vegetables'],
            ['Goji berries', 'Berries'],
            ['Red dates', 'Fruits'],
            ['Sesame oil', 'Healthy Oils'],
            ['Walnuts', 'Nuts & Seeds']
        ],

        'Black Bean Buddha Bowl': [
            ['Black beans', 'Proteins'],
            ['Brown rice', 'Grains & Legumes'],
            ['Sweet potato', 'Vegetables'],
            ['Kale', 'Leafy Greens'],
            ['Bell peppers', 'Vegetables'],
            ['Red onion', 'Vegetables'],
            ['Avocado', 'Fruits'],
            ['Cherry tomatoes', 'Vegetables'],
            ['Extra virgin olive oil', 'Healthy Oils'],
            ['Pumpkin seeds', 'Nuts & Seeds'],
            ['Fresh cilantro', 'Herbs & Seasonings'],
            ['Lime', 'Fruits']
        ],

        'Smoothie bowl with chia seeds': [
            ['Banana', 'Fruits'],
            ['Mixed berries', 'Berries'],
            ['Spinach', 'Leafy Greens'],
            ['Unsweetened almond milk', 'Dairy & Alternatives'],
            ['Chia seeds', 'Nuts & Seeds'],
            ['Ground flaxseeds', 'Nuts & Seeds'],
            ['Almonds', 'Nuts & Seeds'],
            ['Hemp seeds', 'Nuts & Seeds'],
            ['Pumpkin seeds', 'Nuts & Seeds'],
            ['Goji berries', 'Berries']
        ]
    };

    return mealIngredients[mealName] || [];
}

// Modify generateWeeklyMealPlan to collect all meals
function generateWeeklyMealPlan() {
    const mealCalendar = document.getElementById('meal-calendar');
    const today = new Date();
    const weeklyMeals = [];
    
    mealCalendar.innerHTML = '';
    
    for (let i = 0; i < 7; i++) {
        const currentDate = new Date(today);
        currentDate.setDate(today.getDate() + i);
        
        const breakfast = getRandomMeal('breakfast');
        const lunch = getRandomMeal('lunch');
        const dinner = getRandomMeal('dinner');
        
        weeklyMeals.push(breakfast, lunch, dinner);
        
        const dayPlan = document.createElement('div');
        dayPlan.className = 'day-plan';
        
        const dateString = currentDate.toLocaleDateString('en-US', { 
            weekday: 'long', 
            month: 'long', 
            day: 'numeric' 
        });
        
        dayPlan.innerHTML = `
            <h3>${dateString}</h3>
            <div class="meals">
                <div class="meal">
                    <div class="meal-header">
                        <h4>Breakfast</h4>
                        <button class="refresh-meal" data-day="${i}" data-type="breakfast">
                            ↻
                        </button>
                    </div>
                    <p>${breakfast}</p>
                    <ul>
                        ${getMealIngredients(breakfast).map(([item, category]) => 
                            `<li>${item}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="meal">
                    <div class="meal-header">
                        <h4>Lunch</h4>
                        <button class="refresh-meal" data-day="${i}" data-type="lunch">
                            ↻
                        </button>
                    </div>
                    <p>${lunch}</p>
                    <ul>
                        ${getMealIngredients(lunch).map(([item, category]) => 
                            `<li>${item}</li>`).join('')}
                    </ul>
                </div>

                <div class="meal">
                    <div class="meal-header">
                        <h4>Dinner</h4>
                        <button class="refresh-meal" data-day="${i}" data-type="dinner">
                            ↻
                        </button>
                    </div>
                    <p>${dinner}</p>
                    <ul>
                        ${getMealIngredients(dinner).map(([item, category]) => 
                            `<li>${item}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;
        
        mealCalendar.appendChild(dayPlan);
    }
    
    // Add event listeners for refresh buttons
    document.querySelectorAll('.refresh-meal').forEach(button => {
        button.addEventListener('click', function() {
            const day = parseInt(this.dataset.day);
            const mealType = this.dataset.type;
            const newMeal = getRandomMeal(mealType);
            
            // Update the meal display
            const mealContainer = this.closest('.meal');
            mealContainer.querySelector('p').textContent = newMeal;
            
            // Update the ingredients list
            const ingredientsList = getMealIngredients(newMeal)
                .map(([item, category]) => `<li>${item}</li>`)
                .join('');
            mealContainer.querySelector('ul').innerHTML = ingredientsList;
            
            // Update weeklyMeals array for shopping list
            const mealIndex = day * 3 + ['breakfast', 'lunch', 'dinner'].indexOf(mealType);
            weeklyMeals[mealIndex] = newMeal;
            
            // Regenerate shopping list
            generateShoppingList(weeklyMeals);
        });
    });
    
    generateShoppingList(weeklyMeals);
}

// Update generateShoppingList to use the weekly meals
function generateShoppingList(weeklyMeals) {
    const shoppingItems = document.getElementById('shopping-items');
    
    // Define categories in the order we want them displayed
    const categoryOrder = [
        'Leafy Greens',
        'Vegetables',
        'Fruits',
        'Berries',
        'Grains & Legumes',
        'Proteins',
        'Dairy & Alternatives',
        'Nuts & Seeds',
        'Herbs & Seasonings',
        'Healthy Oils',
        'Pantry Items'
    ];
    
    const categories = categoryOrder.reduce((acc, category) => {
        acc[category] = new Set();
        return acc;
    }, {});

    // Collect ingredients from all meals
    weeklyMeals.forEach(meal => {
        const ingredients = getMealIngredients(meal);
        ingredients.forEach(([item, category]) => {
            categories[category].add(item);
        });
    });

    // Find the maximum number of items in any category
    const maxItems = Math.max(...Object.values(categories)
        .map(items => items.size));

    // Generate HTML table for shopping list
    const tableHTML = `
        <table class="shopping-table">
            <thead>
                <tr>
                    ${categoryOrder
                        .filter(category => categories[category].size > 0)
                        .map(category => `
                            <th scope="col">${category}</th>
                        `).join('')}
                </tr>
            </thead>
            <tbody>
                ${[...Array(maxItems)].map((_, rowIndex) => `
                    <tr>
                        ${categoryOrder
                            .filter(category => categories[category].size > 0)
                            .map(category => {
                                const items = Array.from(categories[category]).sort();
                                return `<td>${items[rowIndex] || ''}</td>`;
                            }).join('')}
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;

    shoppingItems.innerHTML = tableHTML;
}

// Helper function to get random meal for each type
function getRandomMeal(mealType) {
    const meals = {
        breakfast: [
            // Western options
            'Oatmeal with berries and nuts',
            'Greek yogurt parfait with granola',
            'Whole grain toast with avocado',
            'Smoothie bowl with chia seeds',
            // Chinese options
            'Congee with lean chicken and ginger',
            'Whole grain steamed buns with vegetables',
            'Soy milk with multigrain bread',
            'Black sesame oatmeal with nuts'
        ],
        lunch: [
            // Western options
            'Mediterranean Quinoa Bowl',
            'Lentil and Vegetable Soup',
            'Grilled Chicken Salad',
            'Black Bean Buddha Bowl',
            // Chinese options
            'Brown rice with steamed fish and bokchoy',
            'Tofu and mushroom noodle soup',
            'Chinese cabbage wrap with lean pork',
            'Vegetable dumpling with clear soup'
        ],
        dinner: [
            // Western options
            'Grilled Fish with Vegetables',
            'Tofu Stir-Fry with Brown Rice',
            'Lean Turkey Meatballs with Zucchini Noodles',
            'Baked Salmon with Sweet Potato',
            // Chinese options
            'Steamed sea bass with ginger and scallion',
            'Mapo tofu with brown rice',
            'Chinese broccoli with garlic sauce',
            'Lotus root soup with lean pork'
        ]
    };
    
    const options = meals[mealType];
    return options[Math.floor(Math.random() * options.length)];
}

// Helper function to generate ingredients based on meal type
function generateIngredients(mealType) {
    const ingredients = {
        breakfast: [
            '1 cup whole grain base',
            '1 cup fresh fruits',
            'Healthy fats options:',
            '- 1 tbsp ground flaxseed + 1 tsp flaxseed oil',
            '- 1/4 avocado + 1 tbsp pumpkin seeds',
            '- 1 tbsp each: walnuts and chia seeds',
            '1 cup plant-based milk'
        ],
        lunch: [
            'Whole grain or legume base',
            'Mixed vegetables',
            'Lean protein source',
            'Healthy fats options:',
            '- 2 tbsp extra virgin olive oil + pine nuts',
            '- 1/2 avocado + sunflower seeds',
            '- 1 tbsp flaxseed oil + walnuts'
        ],
        dinner: [
            '6 oz protein source',
            '2 cups vegetables',
            '1 cup whole grain side',
            'Healthy fats options:',
            '- 2 tbsp extra virgin olive oil + almonds',
            '- 2 tbsp avocado oil + sesame seeds',
            '- 1/2 avocado + pumpkin seeds',
            'Herbs and seasonings'
        ]
    };
    
    return ingredients[mealType]
        .map(item => `<li>${item}</li>`)
        .join('');
}

// Call this when the page loads
document.addEventListener('DOMContentLoaded', generateWeeklyMealPlan); 