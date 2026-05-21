import React, { useState } from 'react';

const RecipeDetail = ({ recipe, onClose }) => {
  // Local state to keep track of checked ingredients for prep work
  const [checkedIngredients, setCheckedIngredients] = useState({});

  const handleToggleIngredient = (index) => {
    setCheckedIngredients((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const imageSrc = recipe.imageUrl || 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&w=800&q=80';

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content glass-panel" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} title="Close">
          <svg xmlns="http://www.w3.org/2000/svg" className="svg-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <img 
          src={imageSrc} 
          alt={recipe.title} 
          className="recipe-detail-header-img"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&w=800&q=80';
          }}
        />

        <div className="recipe-detail-body">
          <div className="recipe-detail-title-row">
            <div>
              <h2 className="recipe-detail-title">{recipe.title}</h2>
              <span className="recipe-detail-category">{recipe.category}</span>
            </div>
          </div>

          <p className="recipe-detail-description">{recipe.description}</p>

          <div className="recipe-detail-quick-stats">
            <div className="stat-box">
              <span className="stat-label">Prep Time</span>
              <span className="stat-value">{recipe.prepTime}m</span>
            </div>
            <div className="stat-box">
              <span className="stat-label">Cook Time</span>
              <span className="stat-value">{recipe.cookTime}m</span>
            </div>
            <div className="stat-box">
              <span className="stat-label">Servings</span>
              <span className="stat-value">{recipe.servings}</span>
            </div>
          </div>

          <div className="recipe-detail-grid">
            {/* Ingredients column */}
            <div>
              <h3 className="recipe-detail-section-title">
                <svg xmlns="http://www.w3.org/2000/svg" className="svg-icon" viewBox="0 0 20 20" fill="currentColor" style={{color: 'var(--accent-primary)'}}>
                  <path fillRule="evenodd" d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm4 4.828l.707-.707a1 1 0 011.414 1.414l-2.12 2.121a1 1 0 01-1.415 0L5.465 8.536a1 1 0 111.414-1.414L7.586 7.83l1.414-.002z" clipRule="evenodd" />
                </svg>
                Ingredients
              </h3>
              <ul className="ingredients-list">
                {recipe.ingredients.map((ing, idx) => (
                  <li 
                    key={idx} 
                    className={`ingredient-item ${checkedIngredients[idx] ? 'checked' : ''}`}
                    onClick={() => handleToggleIngredient(idx)}
                  >
                    <input 
                      type="checkbox" 
                      checked={!!checkedIngredients[idx]} 
                      onChange={() => {}} // Controlled by the list item click
                    />
                    <span className="ingredient-name">
                      <span className="ingredient-quantity-unit">
                        {ing.quantity} {ing.unit}
                      </span>{' '}
                      {ing.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Preparation column */}
            <div>
              <h3 className="recipe-detail-section-title">
                <svg xmlns="http://www.w3.org/2000/svg" className="svg-icon" viewBox="0 0 20 20" fill="currentColor" style={{color: 'var(--accent-primary)'}}>
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                </svg>
                Instructions
              </h3>
              <div className="cooking-steps">
                {recipe.instructions.map((step, idx) => (
                  <div key={idx} className="step-card">
                    <span className="step-number">{idx + 1}</span>
                    <p className="step-text">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
