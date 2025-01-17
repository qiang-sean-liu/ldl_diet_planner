class ShoppingListOrganizer {
    constructor() {
        this.categories = {
            produce: [],
            proteins: [],
            grains: [],
            dairy: [],
            pantry: [],
            other: []
        };
    }

    categorizeIngredients(ingredients) {
        ingredients.forEach(ingredient => {
            if (this.isProtein(ingredient)) this.categories.proteins.push(ingredient);
            else if (this.isProduce(ingredient)) this.categories.produce.push(ingredient);
            else if (this.isGrain(ingredient)) this.categories.grains.push(ingredient);
            else if (this.isDairy(ingredient)) this.categories.dairy.push(ingredient);
            else if (this.isPantry(ingredient)) this.categories.pantry.push(ingredient);
            else this.categories.other.push(ingredient);
        });
    }

    generateOrganizedList() {
        let html = '<div class="shopping-list">';
        for (const [category, items] of Object.entries(this.categories)) {
            if (items.length > 0) {
                html += `
                    <div class="category">
                        <h4>${category.charAt(0).toUpperCase() + category.slice(1)}</h4>
                        ${items.map(item => `<div class="item">${item}</div>`).join('')}
                    </div>
                `;
            }
        }
        html += '</div>';
        return html;
    }

    // Helper methods to categorize ingredients
    isProtein(ingredient) {
        return ['chicken', 'fish', 'tofu', 'beans', 'lentils'].some(p => ingredient.toLowerCase().includes(p));
    }
    // ... similar methods for other categories ...
} 