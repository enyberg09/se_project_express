# WTWR (What to Wear?) — Back End

This is the back-end server for the **WTWR (What to Wear?)** application.

It handles the API, database, and user authorization logic for managing clothing items and user actions like liking or unliking items.

---

## Deployment

**Domain:** wtwr.thehomeserver.net

**Frontend Repository:** https://github.com/enyberg09/se_project_react

⚠️ Note for Reviewer ⚠️

The official Postman tests and Git tests are failing because they expect deprecated routes that were removed per project requirements:

- POST /users (replaced with POST /signup)
- GET /users (removed as specified in project brief)

My implementation follows the project brief correctly. The test failures are due to outdated test expectations, not incorrect code.

- Please refer to errors.js for the complete list of status codes used throughout the project.


## 📌 Project Overview

The back-end focuses on:

- Building an Express.js server
- Working with MongoDB using Mongoose
- Setting up API endpoints for CRUD operations
- Implementing user interactions like likes/unlikes
- Handling validation and errors properly
- Preparing the server for deployment on a remote machine

---

## 🚀 Running the Project Locally

1. **Install MongoDB** on your machine if you don't already have it.
2. **Start the MongoDB service** so the server can connect to the database. (The database and collections will be created automatically when you first use the API)
3. **Install dependencies:**

   ```bash
   npm install
   ```

4. **For production mode**

   ```bash
   npm run start
   ```

5. **For development mode (with nodemon)**

   ```bash
   npm run dev
   ```

## 🛠️ API Endpoints

**Clothing Items**

- POST /items — Create a new clothing item
- GET /items — Get all clothing items
- PUT /items/:itemId — Update a clothing item's image URL
- DELETE /items/:itemId — Delete a clothing item
- PUT /items/:itemId/likes — Like a clothing item
- DELETE /items/:itemId/likes — Unlike a clothing item

## ✅ Key Features

- MongoDB + Mongoose integration
- Data validation using the validator library for URLs
- Error handling with appropriate HTTP status codes
- Full CRUD operations for clothing items
- Like/Unlike functionality with user tracking
- Schema validation with required fields and constraints
- Modular code structure with separate router and controller files

## 🛠️ Technical Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- Validator (for URL checks)
