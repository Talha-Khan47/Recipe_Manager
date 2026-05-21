import React from 'react';

const Navbar = ({ onAddRecipeClick }) => {
  return (
    <nav className="navbar glass-panel">
      <a href="/" className="nav-brand" onClick={(e) => e.preventDefault()}>
        <span className="nav-logo">🍳</span>
        <span className="nav-title">GourmetBook</span>
      </a>
      <button className="btn btn-primary" onClick={onAddRecipeClick}>
        <svg xmlns="http://www.w3.org/2000/svg" className="svg-icon" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
        </svg>
        New Recipe
      </button>
    </nav>
  );
};

export default Navbar;
