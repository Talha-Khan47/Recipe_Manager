import React from 'react';

const RecipeCard = ({ recipe, onViewClick, onEditClick, onDeleteClick }) => {
  const totalTime = recipe.prepTime + recipe.cookTime;
  
  // Use a fallback image if imageUrl is empty
  const imageSrc = recipe.imageUrl || 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&w=800&q=80';

  return (
    <div className="recipe-card glass-panel fade-in" onClick={() => onViewClick(recipe)}>
      <div className="recipe-card-image-wrapper">
        <img 
          src={imageSrc} 
          alt={recipe.title} 
          className="recipe-card-img" 
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&w=800&q=80';
          }}
        />
        <div className="recipe-card-category">{recipe.category}</div>
      </div>
      
      <div className="recipe-card-content">
        <h3 className="recipe-card-title">{recipe.title}</h3>
        <p className="recipe-card-desc">{recipe.description}</p>
        
        <div className="recipe-card-meta">
          <div className="recipe-card-meta-item">
            <svg xmlns="http://www.w3.org/2000/svg" className="svg-icon" viewBox="0 0 20 20" fill="currentColor" style={{color: 'var(--accent-primary)'}}>
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            <span>{totalTime} mins</span>
          </div>
          
          <div className="recipe-card-meta-item">
            <svg xmlns="http://www.w3.org/2000/svg" className="svg-icon" viewBox="0 0 20 20" fill="currentColor" style={{color: 'var(--accent-primary)'}}>
              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
            </svg>
            <span>{recipe.servings} serving{recipe.servings > 1 ? 's' : ''}</span>
          </div>
        </div>

        <div className="recipe-card-actions">
          <button 
            className="btn btn-secondary btn-icon" 
            title="Edit Recipe"
            onClick={(e) => {
              e.stopPropagation();
              onEditClick(recipe);
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="svg-icon" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
          </button>
          
          <button 
            className="btn btn-danger btn-icon" 
            title="Delete Recipe"
            onClick={(e) => {
              e.stopPropagation();
              onDeleteClick(recipe);
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="svg-icon" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
