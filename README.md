# MovieEra – Full Stack Movie App

**React (your existing movie-era) + Spring Boot + MySQL**

## Features
- 🎬 Movie Library (search + popular movies from TMDB)
- 🔐 Login / Register
- ❤️ Save Favorite Movies (stored in MySQL)
- Movie Details page with Add/Remove Favorite

## Project Structure
```
MovieEraFull/
├── backend/     → Spring Boot (Auth + Favorites API)
└── frontend/    → React (your movie-era + new pages)
```

---

## How to Run (Step by Step)

### Step 1 – Install MySQL
- Make sure MySQL is installed and running on your computer.
- Default port: 3306
- Note your MySQL password (usually for user `root`)

### Step 2 – Start Backend
1. Open terminal
2. Go to backend folder:
   ```bash
   cd MovieEraFull/backend
   ```
3. Open file:  
   `src/main/resources/application.properties`
4. Change this line:
   ```
   spring.datasource.password=yourpassword
   ```
   to your real MySQL password.
5. Run the backend:
   ```bash
   mvn spring-boot:run
   ```
6. Wait until you see: `Started MovieEraApplication`
   → Backend is ready on http://localhost:8080

### Step 3 – Start Frontend
1. Open a **new** terminal
2. Go to frontend folder:
   ```bash
   cd MovieEraFull/frontend
   ```
3. Install packages (only first time):
   ```bash
   npm install
   ```
4. Start the app:
   ```bash
   npm run dev
   ```
5. Open browser: http://localhost:5173

---

## How to Use
1. Click **Login** → Register a new account (or login)
2. Go to **Library** → Search or browse popular movies
3. Click the 🤍 heart on any movie card to save it
4. Open any movie → click **Add to Favorites**
5. Go to **❤️ Favorites** page to see all saved movies

---

## Requirements
- Java 17 or higher
- Maven
- Node.js 18+
- MySQL 8

---

## Troubleshooting
- **Backend fails to start** → Check MySQL is running and password is correct
- **Frontend shows "Failed to load favorites"** → Make sure you are logged in and backend is running
- **CORS errors** → Backend must be on port 8080, frontend on 5173
