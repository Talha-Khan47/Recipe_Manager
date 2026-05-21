import express from 'express';
import Recipe from '../models/Recipe.js';

const router = express.Router();

// @desc    Get all recipes (with search & category filtering)
// @route   GET /api/recipes
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { search, category } = req.query;
    let query = {};

    if (category && category !== 'All') {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { 'ingredients.name': { $regex: search, $options: 'i' } }
      ];
    }

    const recipes = await Recipe.find(query).sort({ createdAt: -1 });
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Get recipe by ID
// @route   GET /api/recipes/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (recipe) {
      res.json(recipe);
    } else {
      res.status(404).json({ message: 'Recipe not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Create new recipe
// @route   POST /api/recipes
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { title, description, ingredients, instructions, category, prepTime, cookTime, servings, imageUrl } = req.body;

    const newRecipe = new Recipe({
      title,
      description,
      ingredients,
      instructions,
      category,
      prepTime,
      cookTime,
      servings,
      imageUrl,
    });

    const createdRecipe = await newRecipe.save();
    res.status(201).json(createdRecipe);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Update recipe by ID
// @route   PUT /api/recipes/:id
// @access  Public
router.put('/:id', async (req, res) => {
  try {
    const { title, description, ingredients, instructions, category, prepTime, cookTime, servings, imageUrl } = req.body;

    const recipe = await Recipe.findById(req.params.id);

    if (recipe) {
      recipe.title = title || recipe.title;
      recipe.description = description || recipe.description;
      recipe.ingredients = ingredients || recipe.ingredients;
      recipe.instructions = instructions || recipe.instructions;
      recipe.category = category || recipe.category;
      recipe.prepTime = prepTime !== undefined ? prepTime : recipe.prepTime;
      recipe.cookTime = cookTime !== undefined ? cookTime : recipe.cookTime;
      recipe.servings = servings !== undefined ? servings : recipe.servings;
      recipe.imageUrl = imageUrl !== undefined ? imageUrl : recipe.imageUrl;

      const updatedRecipe = await recipe.save();
      res.json(updatedRecipe);
    } else {
      res.status(404).json({ message: 'Recipe not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Delete recipe by ID
// @route   DELETE /api/recipes/:id
// @access  Public
router.delete('/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (recipe) {
      await recipe.deleteOne();
      res.json({ message: 'Recipe removed successfully' });
    } else {
      res.status(404).json({ message: 'Recipe not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
