# 🍳 GourmetBook | Recipe Manager

> A premium, full-stack MERN application for organizing, creating, and retrieving your favorite recipes with a beautiful glassmorphism UI.

![Project Status](https://img.shields.io/badge/Status-Completed-brightgreen.svg)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)

## 🌐 Live Demo
*Link to Live Deployment: [Deploy Your App Here]*

## ✨ Features
- **Dynamic Search & Filtering:** Instantly filter recipes by category or search through titles, descriptions, and ingredients.
- **Comprehensive CRUD Operations:** Create, Read, Update, and Delete your recipes.
- **Interactive Checklists:** Easily check off ingredients as you prepare your dish!
- **Multi-Step Recipe Editor:** Dynamically add, edit, or remove ingredients and cooking instructions using our custom form editor.
- **Premium Glassmorphism Design:** Modern aesthetic featuring a dark gourmet theme, smooth micro-animations, and responsive CSS grids.

## 🛠️ Tech Stack
- **Frontend:** React, Vite, Vanilla CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Deployment-Ready:** Unified build structure designed to run the entire app from a single service (perfect for Render.com).

## 🚀 Getting Started Locally

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB running locally (or a cloud Atlas URI)

### Installation
1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd recipe-manager
   ```

2. **Install all dependencies:**
   ```bash
   npm run install-all
   ```

3. **Environment Setup:**
   Ensure `backend/.env` exists with the following structure:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/recipe-manager
   ```
   *(Note: Replace the `MONGO_URI` with your MongoDB Atlas string when deploying).*

4. **Seed Database (Optional):**
   ```bash
   cd backend
   node seeder.js
   cd ..
   ```

5. **Start the Application:**
   Run the backend and frontend dev servers (open two terminal tabs):
   ```bash
   # Terminal 1 - Start Backend
   npm start
   
   # Terminal 2 - Start Frontend
   cd frontend
   npm run dev
   ```
   Navigate to `http://localhost:5173` to view the app!

## 🌍 Deployment
This repository is configured for a unified deployment on platforms like Render.com:
1. Provide the Build Command: `npm run build`
2. Provide the Start Command: `npm start`
3. Set your `MONGO_URI` environment variable to your Atlas cluster string.
4. Set `NODE_ENV` to `production`.

Enjoy organizing your favorite dishes!
