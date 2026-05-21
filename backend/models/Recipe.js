import mongoose from 'mongoose';

const ingredientSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  unit: {
    type: String,
    required: true,
  },
});

const recipeSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    ingredients: [ingredientSchema],
    instructions: {
      type: [String],
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Snack', 'Beverage', 'Other'],
      default: 'Other',
    },
    prepTime: {
      type: Number,
      required: true,
      default: 0,
    },
    cookTime: {
      type: Number,
      required: true,
      default: 0,
    },
    servings: {
      type: Number,
      required: true,
      default: 1,
    },
    imageUrl: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

// Add index for search capability
recipeSchema.index({ title: 'text', description: 'text', category: 'text' });

const Recipe = mongoose.model('Recipe', recipeSchema);

export default Recipe;
