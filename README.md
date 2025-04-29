# Game Management System

A web application for managing games with user authentication built with Node.js, Express, MongoDB, and Passport.js.

## Features

- User Authentication (Register, Login, Logout)
- Game Management (Create, Read, Update, Delete)
- Bootstrap for responsive UI and client-side validation
- MongoDB for data storage

## Setup Instructions

1. Install dependencies:
   ```
   npm install
   ```

2. Create a .env file with the following:
   ```
   MONGODB_URI=mongodb:
   SESSION_SECRET=your_session_secret_key
   PORT=3000
   ```

3. Make sure MongoDB is running on your system

4. Start the application:
   ```
   npm start
   ```
   
   For development with auto-restart:
   ```
   npm run dev
   ```

5. Access the application at `http:

## Schema Structure

### User Schema
- age: Number (required)
- phoneNumber: String (required, unique)
- gender: String
- isLegal: Boolean (required)
- password: String (required)
- date: Date (default: Date.now)

### Game Schema
- gameName: String (required, trimmed, cannot be changed once created)
- numberOfPlayer: Number (required)
- gameDuration: Number (required)
- platform: String (required)
- user: ObjectId (reference to User)
- date: Date (default: Date.now)

## Routes

- **Authentication Routes**:
  - GET /users/register - Display register form
  - POST /users/register - Register a new user
  - GET /users/login - Display login form
  - POST /users/login - Login user
  - GET /users/logout - Logout user

- **Game Routes**:
  - GET /games - Display all games
  - GET /games/new - Display form to add a new game
  - POST /games - Add a new game
  - GET /games/:id - Show a specific game
  - GET /games/:id/edit - Display form to edit a game
  - PUT /games/:id - Update a game
  - DELETE /games/:id - Delete a game

- **Other Routes**:
  - GET / - Welcome page
  - GET /dashboard - User dashboard
"# GAMEMANAGEMENTSYSTEM" 
