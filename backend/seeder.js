import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import Recipe from './models/Recipe.js';

dotenv.config();
connectDB();

const sampleRecipes = [
  {
    title: 'Classic Chocolate Chip Cookies',
    description: 'Crispy on the edges, chewy in the middle, and loaded with rich chocolate pools.',
    category: 'Dessert',
    prepTime: 15,
    cookTime: 10,
    servings: 24,
    imageUrl: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=800&q=80',
    ingredients: [
      { name: 'Unsalted butter (melted)', quantity: 1, unit: 'cup' },
      { name: 'Granulated sugar', quantity: 0.75, unit: 'cup' },
      { name: 'Brown sugar (packed)', quantity: 0.75, unit: 'cup' },
      { name: 'Vanilla extract', quantity: 2, unit: 'tsp' },
      { name: 'Eggs', quantity: 2, unit: 'pcs' },
      { name: 'All-purpose flour', quantity: 2.25, unit: 'cups' },
      { name: 'Baking soda', quantity: 1, unit: 'tsp' },
      { name: 'Salt', quantity: 0.5, unit: 'tsp' },
      { name: 'Semi-sweet chocolate chips', quantity: 2, unit: 'cups' }
    ],
    instructions: [
      'Preheat your oven to 375°F (190°C) and line a baking sheet with parchment paper.',
      'In a large bowl, whisk together the melted butter, granulated sugar, and brown sugar until smooth.',
      'Whisk in the vanilla extract and eggs one at a time until the mixture becomes pale and slightly thickened.',
      'In a separate bowl, sift together the flour, baking soda, and salt.',
      'Gradually fold the dry ingredients into the wet ingredients using a spatula until just combined (do not overmix).',
      'Gently fold in the chocolate chips.',
      'Drop rounded tablespoons of dough onto the prepared baking sheet, leaving about 2 inches of space between them.',
      'Bake for 9-11 minutes or until the edges are golden brown. The centers should still look soft.',
      'Let cool on the baking sheet for 5 minutes, then transfer to a wire rack to cool completely.'
    ]
  },
  {
    title: 'Spicy Thai Green Curry',
    description: 'An aromatic, creamy, and spicy green curry packed with fresh vegetables and chicken.',
    category: 'Dinner',
    prepTime: 20,
    cookTime: 15,
    servings: 4,
    imageUrl: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=800&q=80',
    ingredients: [
      { name: 'Thai green curry paste', quantity: 3, unit: 'tbsp' },
      { name: 'Coconut milk', quantity: 400, unit: 'ml' },
      { name: 'Chicken breast (sliced)', quantity: 500, unit: 'g' },
      { name: 'Bamboo shoots', quantity: 1, unit: 'cup' },
      { name: 'Red bell pepper (sliced)', quantity: 1, unit: 'pc' },
      { name: 'Fish sauce', quantity: 2, unit: 'tbsp' },
      { name: 'Palm sugar', quantity: 1, unit: 'tbsp' },
      { name: 'Thai basil leaves', quantity: 0.5, unit: 'cup' },
      { name: 'Kaffir lime leaves', quantity: 3, unit: 'pcs' },
      { name: 'Vegetable oil', quantity: 1, unit: 'tbsp' }
    ],
    instructions: [
      'Heat vegetable oil in a large wok or deep skillet over medium heat.',
      'Add the green curry paste and stir-fry for 1-2 minutes until fragrant.',
      'Pour in half of the coconut milk and stir to incorporate the paste. Simmer until oil begins to separate on top.',
      'Add the chicken slices and stir to coat. Cook for 3-4 minutes until chicken is no longer pink.',
      'Add the remaining coconut milk, bamboo shoots, red bell pepper, and kaffir lime leaves. Bring to a gentle boil.',
      'Simmer for 5-7 minutes until the vegetables are tender-crisp.',
      'Season with fish sauce and palm sugar. Adjust seasoning to taste.',
      'Turn off the heat and stir in the fresh Thai basil leaves. Serve hot with jasmine rice.'
    ]
  },
  {
    title: 'Avocado Toast with Poached Egg',
    description: 'Simple, fresh, and nutritious toast topped with seasoned avocado mash and a perfectly runny poached egg.',
    category: 'Breakfast',
    prepTime: 10,
    cookTime: 5,
    servings: 2,
    imageUrl: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80',
    ingredients: [
      { name: 'Ripe avocados', quantity: 2, unit: 'pcs' },
      { name: 'Thick sourdough bread slices', quantity: 2, unit: 'pcs' },
      { name: 'Large eggs', quantity: 2, unit: 'pcs' },
      { name: 'Lemon juice', quantity: 1, unit: 'tsp' },
      { name: 'Red pepper flakes', quantity: 0.5, unit: 'tsp' },
      { name: 'Salt and black pepper', quantity: 0.25, unit: 'tsp' },
      { name: 'Cherry tomatoes (halved)', quantity: 0.5, unit: 'cup' },
      { name: 'White vinegar (for poaching)', quantity: 1, unit: 'tbsp' }
    ],
    instructions: [
      'Toast the sourdough bread slices until golden and crisp.',
      'In a small bowl, mash the avocado flesh with lemon juice, salt, black pepper, and half of the red pepper flakes.',
      'Bring a pot of water to a gentle simmer. Add the white vinegar.',
      'Crack an egg into a small ramekin. Create a gentle whirlpool in the simmering water and slide the egg into the center.',
      'Poach the egg for 3-4 minutes until the white is set but the yolk is still soft. Remove with a slotted spoon.',
      'Spread the avocado mash evenly over the toasted sourdough slices.',
      'Top each toast with a poached egg, cherry tomatoes, and a pinch of red pepper flakes.',
      'Serve immediately while warm.'
    ]
  }
];

const seedData = async () => {
  try {
    await Recipe.deleteMany();
    console.log('Existing recipes removed...');
    
    await Recipe.insertMany(sampleRecipes);
    console.log('Sample recipes seeded successfully!');
    
    process.exit();
  } catch (error) {
    console.error(`Error seeding data: ${error.message}`);
    process.exit(1);
  }
};

seedData();
