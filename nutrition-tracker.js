class NutritionTracker {
    constructor() {
        this.dailyTotals = {
            calories: 0,
            protein: 0,
            fiber: 0,
            saturatedFat: 0
        };
    }

    calculateDailyNutrition(meals) {
        this.dailyTotals = {
            calories: meals.reduce((sum, meal) => sum + meal.calories, 0),
            protein: meals.reduce((sum, meal) => sum + meal.protein, 0),
            fiber: meals.reduce((sum, meal) => sum + (meal.fiber || 0), 0),
            saturatedFat: meals.reduce((sum, meal) => sum + (meal.saturatedFat || 0), 0)
        };
    }

    displayNutritionSummary() {
        return `
            <div class="nutrition-summary">
                <h3>Daily Nutrition</h3>
                <p>Calories: ${this.dailyTotals.calories}</p>
                <p>Protein: ${this.dailyTotals.protein}g</p>
                <p>Fiber: ${this.dailyTotals.fiber}g</p>
                <p>Saturated Fat: ${this.dailyTotals.saturatedFat}g</p>
            </div>
        `;
    }
} 