import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import RecipeCard from './components/RecipeCard';
import RecipeModal from './components/RecipeModal';
import RecipeDetail from './components/RecipeDetail';
import './App.css';

const API_BASE_URL = 'http://localhost:5000/api/recipes';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Modals / Selection states
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState(null);
  
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const categories = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Snack', 'Beverage', 'Other'];

  // Fetch recipes
  const fetchRecipes = async () => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      let url = API_BASE_URL;
      const params = new URLSearchParams();
      if (searchQuery) params.append('search', searchQuery);
      if (selectedCategory && selectedCategory !== 'All') params.append('category', selectedCategory);
      
      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch recipes from server');
      }
      const data = await response.json();
      setRecipes(data);
    } catch (error) {
      console.error('Error fetching recipes:', error);
      setErrorMessage('Could not connect to the backend server. Please verify the server is running.');
    } finally {
      setIsLoading(false);
    }
  };

  // Trigger refetch when search or category changes
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchRecipes();
    }, 300); // 300ms debounce for search query typing

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, selectedCategory]);

  // Create or Update recipe
  const handleSaveRecipe = async (recipeData) => {
    try {
      let response;
      if (editingRecipe) {
        // Update
        response = await fetch(`${API_BASE_URL}/${editingRecipe._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(recipeData),
        });
      } else {
        // Create
        response = await fetch(API_BASE_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(recipeData),
        });
      }

      if (!response.ok) {
        throw new Error('Failed to save recipe');
      }

      await fetchRecipes();
      setIsFormOpen(false);
      setEditingRecipe(null);
    } catch (error) {
      console.error('Error saving recipe:', error);
      alert('Error saving recipe. Please check backend log.');
    }
  };

  // Delete recipe
  const handleDeleteRecipe = async (recipe) => {
    if (window.confirm(`Are you sure you want to delete "${recipe.title}"?`)) {
      try {
        const response = await fetch(`${API_BASE_URL}/${recipe._id}`, {
          method: 'DELETE',
        });
        
        if (!response.ok) {
          throw new Error('Failed to delete recipe');
        }

        // Close details if the deleted recipe was open
        if (selectedRecipe && selectedRecipe._id === recipe._id) {
          setSelectedRecipe(null);
        }

        await fetchRecipes();
      } catch (error) {
        console.error('Error deleting recipe:', error);
        alert('Error deleting recipe. Please try again.');
      }
    }
  };

  const handleEditClick = (recipe) => {
    setEditingRecipe(recipe);
    setIsFormOpen(true);
  };

  const handleAddClick = () => {
    setEditingRecipe(null);
    setIsFormOpen(true);
  };

  return (
    <div className="app-container">
      <Navbar onAddRecipeClick={handleAddClick} />

      {/* Hero Intro */}
      <header className="dashboard-header fade-in">
        <h1>Your Personal Recipe Manager</h1>
        <p className="dashboard-subtitle">Browse, create, and organize your favorite kitchen recipes efficiently.</p>
      </header>

      {/* Search and Filters */}
      <div className="controls-container glass-panel fade-in">
        <div className="search-box">
          <svg xmlns="http://www.w3.org/2000/svg" className="search-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input 
            type="text" 
            className="form-control search-input" 
            placeholder="Search recipes, ingredients, or keywords..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="categories-filter">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`category-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Loading / Error States */}
      {isLoading && (
        <div className="text-center" style={{ margin: '3rem 0', color: 'var(--accent-primary)' }}>
          <div style={{ display: 'inline-block', width: '40px', height: '40px', border: '4px solid rgba(245, 158, 11, 0.2)', borderTopColor: 'var(--accent-primary)', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
          <p style={{ marginTop: '1rem', fontWeight: 500 }}>Loading culinary delights...</p>
          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      )}

      {errorMessage && (
        <div className="glass-panel text-center fade-in" style={{ padding: '2rem', border: '1px solid var(--danger)', background: 'rgba(239, 68, 68, 0.1)', margin: '2rem 0' }}>
          <p style={{ color: 'var(--danger)', fontWeight: 600, fontSize: '1.1rem' }}>{errorMessage}</p>
          <button className="btn btn-secondary" style={{ marginTop: '1rem' }} onClick={fetchRecipes}>
            Retry Connection
          </button>
        </div>
      )}

      {/* Recipe Grid */}
      {!isLoading && !errorMessage && (
        <div className="recipes-grid">
          {recipes.length > 0 ? (
            recipes.map((recipe) => (
              <RecipeCard 
                key={recipe._id} 
                recipe={recipe} 
                onViewClick={setSelectedRecipe}
                onEditClick={handleEditClick}
                onDeleteClick={handleDeleteRecipe}
              />
            ))
          ) : (
            <div className="empty-state glass-panel fade-in">
              <div className="empty-state-icon">🍽️</div>
              <h3>No Recipes Found</h3>
              <p>Try refining your search keyword or selected category, or add a new recipe to get started!</p>
              <button className="btn btn-primary" style={{ marginTop: '1.5rem' }} onClick={handleAddClick}>
                Add Your First Recipe
              </button>
            </div>
          )}
        </div>
      )}

      {/* Recipe Details View Modal */}
      {selectedRecipe && (
        <RecipeDetail 
          recipe={selectedRecipe} 
          onClose={() => setSelectedRecipe(null)} 
        />
      )}

      {/* Recipe Add/Edit Form Modal */}
      {isFormOpen && (
        <RecipeModal 
          recipe={editingRecipe} 
          onClose={() => {
            setIsFormOpen(false);
            setEditingRecipe(null);
          }} 
          onSave={handleSaveRecipe}
        />
      )}
    </div>
  );
}

export default App;
