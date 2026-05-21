import React, { useState, useEffect } from 'react';

const RecipeModal = ({ recipe, onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Dinner');
  const [prepTime, setPrepTime] = useState(15);
  const [cookTime, setCookTime] = useState(15);
  const [servings, setServings] = useState(4);
  const [imageUrl, setImageUrl] = useState('');
  const [ingredients, setIngredients] = useState([{ name: '', quantity: 1, unit: 'pcs' }]);
  const [instructions, setInstructions] = useState(['']);
  const [error, setError] = useState('');

  // If a recipe is passed, we populate the fields for edit mode
  useEffect(() => {
    if (recipe) {
      setTitle(recipe.title || '');
      setDescription(recipe.description || '');
      setCategory(recipe.category || 'Dinner');
      setPrepTime(recipe.prepTime || 0);
      setCookTime(recipe.cookTime || 0);
      setServings(recipe.servings || 1);
      setImageUrl(recipe.imageUrl || '');
      setIngredients(recipe.ingredients.length > 0 ? recipe.ingredients.map(ing => ({ ...ing })) : [{ name: '', quantity: 1, unit: 'pcs' }]);
      setInstructions(recipe.instructions.length > 0 ? [...recipe.instructions] : ['']);
    }
  }, [recipe]);

  // Handle dynamic ingredients updates
  const handleIngredientChange = (index, field, value) => {
    const updatedIngredients = [...ingredients];
    if (field === 'quantity') {
      const parsedVal = parseFloat(value);
      updatedIngredients[index][field] = isNaN(parsedVal) ? '' : parsedVal;
    } else {
      updatedIngredients[index][field] = value;
    }
    setIngredients(updatedIngredients);
  };

  const addIngredient = () => {
    setIngredients([...ingredients, { name: '', quantity: 1, unit: 'pcs' }]);
  };

  const removeIngredient = (index) => {
    if (ingredients.length > 1) {
      setIngredients(ingredients.filter((_, idx) => idx !== index));
    }
  };

  // Handle dynamic instructions updates
  const handleInstructionChange = (index, value) => {
    const updatedInstructions = [...instructions];
    updatedInstructions[index] = value;
    setInstructions(updatedInstructions);
  };

  const addInstruction = () => {
    setInstructions([...instructions, '']);
  };

  const removeInstruction = (index) => {
    if (instructions.length > 1) {
      setInstructions(instructions.filter((_, idx) => idx !== index));
    }
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Basic Validations
    if (!title.trim() || !description.trim()) {
      setError('Title and Description are required.');
      return;
    }

    // Filter out incomplete ingredients and instructions
    const filteredIngredients = ingredients.filter(ing => ing.name.trim() !== '');
    const filteredInstructions = instructions.filter(step => step.trim() !== '');

    if (filteredIngredients.length === 0) {
      setError('Please add at least one ingredient.');
      return;
    }

    if (filteredInstructions.length === 0) {
      setError('Please add at least one instruction step.');
      return;
    }

    const savedRecipe = {
      title,
      description,
      category,
      prepTime: Number(prepTime),
      cookTime: Number(cookTime),
      servings: Number(servings),
      imageUrl,
      ingredients: filteredIngredients,
      instructions: filteredInstructions,
    };

    onSave(savedRecipe);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content glass-panel" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} title="Cancel">
          <svg xmlns="http://www.w3.org/2000/svg" className="svg-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <form onSubmit={handleSubmit} className="recipe-form-container">
          <h2 className="recipe-form-title">{recipe ? 'Edit Recipe' : 'Add New Recipe'}</h2>
          
          {error && (
            <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid var(--danger)', color: 'var(--danger)', padding: '10px 16px', borderRadius: 'var(--border-radius-sm)', marginBottom: '1.5rem', fontWeight: 500 }}>
              {error}
            </div>
          )}

          {/* Title */}
          <div className="form-group">
            <label className="form-label">Recipe Title</label>
            <input 
              type="text" 
              className="form-control" 
              placeholder="e.g. Homemade Pepperoni Pizza" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)}
              required 
            />
          </div>

          {/* Description */}
          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea 
              className="form-control" 
              placeholder="Give a short, tempting introduction of your dish..." 
              value={description} 
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          {/* Category, Prep, Cook Time, Servings */}
          <div className="form-row-multi">
            <div className="form-group">
              <label className="form-label">Category</label>
              <select 
                className="form-control" 
                value={category} 
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
                <option value="Dessert">Dessert</option>
                <option value="Snack">Snack</option>
                <option value="Beverage">Beverage</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Prep Time (mins)</label>
              <input 
                type="number" 
                className="form-control" 
                min="0" 
                value={prepTime} 
                onChange={(e) => setPrepTime(e.target.value)} 
              />
            </div>

            <div className="form-group">
              <label className="form-label">Cook Time (mins)</label>
              <input 
                type="number" 
                className="form-control" 
                min="0" 
                value={cookTime} 
                onChange={(e) => setCookTime(e.target.value)} 
              />
            </div>
          </div>

          <div className="form-row-multi">
            <div className="form-group">
              <label className="form-label">Servings</label>
              <input 
                type="number" 
                className="form-control" 
                min="1" 
                value={servings} 
                onChange={(e) => setServings(e.target.value)} 
              />
            </div>

            <div className="form-group" style={{ gridColumn: 'span 2' }}>
              <label className="form-label">Image URL</label>
              <input 
                type="url" 
                className="form-control" 
                placeholder="https://example.com/food-image.jpg" 
                value={imageUrl} 
                onChange={(e) => setImageUrl(e.target.value)} 
              />
            </div>
          </div>

          {/* Dynamic Ingredients Section */}
          <div style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
            <div className="form-list-header">
              <h3 className="form-list-title">Ingredients</h3>
              <button type="button" className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '0.85rem' }} onClick={addIngredient}>
                + Add Ingredient
              </button>
            </div>
            {ingredients.map((ing, idx) => (
              <div key={idx} className="list-item-inputs">
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Ingredient name (e.g. Flour)" 
                  value={ing.name} 
                  onChange={(e) => handleIngredientChange(idx, 'name', e.target.value)}
                />
                <input 
                  type="number" 
                  step="any"
                  min="0"
                  className="form-control" 
                  placeholder="Qty" 
                  value={ing.quantity} 
                  onChange={(e) => handleIngredientChange(idx, 'quantity', e.target.value)}
                />
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Unit (e.g. cups)" 
                  value={ing.unit} 
                  onChange={(e) => handleIngredientChange(idx, 'unit', e.target.value)}
                />
                <button 
                  type="button" 
                  className="btn-remove-item"
                  onClick={() => removeIngredient(idx)}
                  disabled={ingredients.length <= 1}
                  style={{ opacity: ingredients.length <= 1 ? 0.3 : 1 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="svg-icon" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            ))}
          </div>

          {/* Dynamic Instructions Section */}
          <div style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
            <div className="form-list-header">
              <h3 className="form-list-title">Cooking Instructions</h3>
              <button type="button" className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '0.85rem' }} onClick={addInstruction}>
                + Add Step
              </button>
            </div>
            {instructions.map((step, idx) => (
              <div key={idx} className="instruction-item-input">
                <textarea 
                  className="form-control" 
                  placeholder={`Step ${idx + 1}: Describe this cooking stage...`} 
                  value={step} 
                  onChange={(e) => handleInstructionChange(idx, e.target.value)}
                />
                <button 
                  type="button" 
                  className="btn-remove-item"
                  onClick={() => removeInstruction(idx)}
                  disabled={instructions.length <= 1}
                  style={{ opacity: instructions.length <= 1 ? 0.3 : 1, marginTop: '8px' }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="svg-icon" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {recipe ? 'Save Changes' : 'Create Recipe'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RecipeModal;
